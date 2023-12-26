import pandas as pd
import numpy as np
from database import find_properties
from bson.objectid import ObjectId
from bson import json_util

from sklearn.preprocessing import StandardScaler
from sklearn.compose import make_column_transformer, make_column_selector
from sklearn.pipeline import make_pipeline
from sklearn.cluster import KMeans
from sklearn.base import BaseEstimator, TransformerMixin

PARAM_ORDER = [
    'zipcode', 'latitude', 'longitude', 'garageSpaces', 'hasAssociation',
    'hasCooling', 'hasGarage', 'hasHeating', 'hasSpa', 'hasView',
    'parkingSpaces', 'yearBuilt', 'numOfPhotos', 'accessibility',
    'numOfAppliances', 'numOfParkingFeatures', 'patioporch', 'security',
    'waterfront', 'lotSizeSqFt', 'livingAreaSqFt', 'numOfBathrooms',
    'numOfBedrooms', 'numOfStories', 'price'
]

RESULT_COUNT = 10

class Prioritizer(BaseEstimator, TransformerMixin):
    def __init__(self, columns=None, modifier=10):
        self.columns = columns
        self.modifier = modifier

    def fit(self, X, y=None):
        return self

    def transform(self, X, y=None):
        X[self.columns] *= self.modifier
        return X

def wrap_model(model, priority_columns=['price'], modifier=10):
    pipeline = make_pipeline(StandardScaler().set_output(transform='pandas'),
                             Prioritizer(priority_columns, modifier),
                             model)
    return pipeline

# TEMPORARY: Compute numOfSchools until db gets synced
def computeMissing(data):
    data['numOfSchools'] = data.filter(regex='Schools').sum(axis=1)
    return data

def score_properties(data, target_index):
    """
    Runs K-means with different cluster sizes.
    Each time a property is in the same group as the target one it gets a point.
    Returns pandas Series with the scores.
    """
    score = pd.Series(0, index=range(len(data)), name='score')
    for clusters in [3,5,10,15]:
        kmeans = wrap_model(KMeans(n_clusters=clusters, n_init="auto"),
                            priority_columns=['zipcode', 'price'],
                            modifier=10).fit(data)
        labels = kmeans.predict(data)
        target_label = labels[target_index]
        score[labels == target_label] += 1
    return score

def similar_properties(id:str):
    """
    Returns the top n similar properties to the given one.
    """
    # Load all properties
    # TODO: Only look at 100 nearby properties?
    data = pd.DataFrame(find_properties({}, limit=0))
    # Temporarily compute missing fields
    data_converted = computeMissing(data)
    # Filter out unused parameters
    data_converted = data[PARAM_ORDER]
    # Get target property
    target_index = data_converted[data['_id'] == ObjectId(id)].index
    # Property not found
    if target_index.shape == (0,):
        return []
    # Unpack
    target_index = target_index[0]
    # Get scores
    score = score_properties(data_converted, target_index)
    data = data.join(score)
    # Remove target property from results
    data = data.drop(target_index)
    # Return top n similar properties
    top = data.nlargest(RESULT_COUNT, 'score')
    # Convert ObjectIds to str so encoding works
    top['_id'] = top['_id'].astype(str)
    return top.to_dict(orient='records')

