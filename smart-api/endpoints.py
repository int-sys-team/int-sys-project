from flask import Flask
from flask_restful import Api
from flasgger import Swagger
from llm.resources import PropertyFetcher, DescriptionGenerator, PropertyComparison
from price.resources import PriceRegressor
from similar.resources import SimilarProperties
from db.resources import Property
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow all origins

api = Api(app)
swagger = Swagger(app)

# LLM API
api.add_resource(PropertyFetcher, '/llm/properties')
api.add_resource(DescriptionGenerator, '/llm/description')
api.add_resource(PropertyComparison, '/llm/compare')

# Price Prediction API
api.add_resource(PriceRegressor, '/price')

# Similar Property API
api.add_resource(SimilarProperties, '/similar')

# Database API
api.add_resource(Property, '/db/properties')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
