import joblib
import pandas as pd
import numpy as np

# TODO Get relative to this file?
price_model = joblib.load('./price/model.pkl')

param_order = price_model.feature_names_in_

def predict_price(data:dict)->float:
    """
    Predicts the price of the real estate property based on its data.
    """
    # Convert dict to dataframe, reorder columns
    converted = pd.DataFrame(data, index=[0])[param_order]
    price = float(price_model.predict(converted)[0])
    return price

