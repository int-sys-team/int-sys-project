from flask import Flask
from flask_restful import Api
from flasgger import Swagger
from llm.resources import PropertyFetcher, DescriptionGenerator
from price.resources import PriceRegressor

app = Flask(__name__)
api = Api(app)
swagger = Swagger(app)

# LLM API
api.add_resource(PropertyFetcher, '/llm/properties')
api.add_resource(DescriptionGenerator, '/llm/description')

# Price Prediction API
api.add_resource(PriceRegressor, '/price')

if __name__ == '__main__':
    app.run(debug=True)

# Open: http://127.0.0.1:5000/apidocs
