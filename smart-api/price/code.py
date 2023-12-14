import joblib
import pandas as pd
import numpy as np

# TODO Get relative to this file?
price_model = joblib.load('./price/model.pkl')

# TODO Maybe ship this with the model?
param_order = [
    'zipcode', 'latitude', 'longitude', 'garageSpaces', 'hasAssociation',
    'hasCooling', 'hasGarage', 'hasHeating', 'hasSpa', 'hasView',
    'homeType', 'parkingSpaces', 'yearBuilt', 'numOfPhotos',
    'accessibility', 'numOfAppliances', 'numOfParkingFeatures',
    'patioporch', 'security', 'waterfront', 'windowfeatures', 'community',
    'lotSizeSqFt', 'livingAreaSqFt', 'numOfPrimarySchools',
    'numOfElementarySchools', 'numOfMiddleSchools', 'numOfHighSchools',
    'avgSchoolDistance', 'avgSchoolRating', 'avgSchoolSize',
    'MedianStudentsPerTeacher', 'numOfBathrooms', 'numOfBedrooms',
    'numOfStories'
]

def predict_price(data:dict)->float:
    """
    Predicts the price of the real estate property based on its data.
    """
    # Convert dict to dataframe, reorder columns
    converted = pd.DataFrame(data, index=[0])[param_order]
    price = float(price_model.predict(converted)[0])
    return price

