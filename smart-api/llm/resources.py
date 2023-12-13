from flask import request
from flask_restful import Resource
import database as db
from llm.chains import description_generator, property_fetcher


class DescriptionGenerator(Resource):

    def post(self):
        """
        Generates a description of the real estate property based on its data.

        ---
        parameters:
          - name: body
            in: body
            required: true
            description: Data about the real estate object.
            schema:
              type: object
              required:
                - data
              properties:
                data:
                  type: string
                  description: The data about the property.

        responses:
          201:
            description: The generated description.
        """
        data: dict = request.get_json()
        if not data:
            return {"error": "Request body cannot be empty."}, 400
        if "data" not in data:
            return {"error": "Request body must contain data"}, 400
        try:
            response = description_generator.invoke(
                {"data": data.get("data")}
            )
            return {"description": response}, 200
        except Exception as e:
            return {
                "error": "Description generator failed.",
                "description": "This is a default description.",
                "details": str(e)
            }, 200


class PropertyFetcher(Resource):

    def post(self):
        """
        Gets a list of properties based on a natural language query.

        ---
        parameters:
          - name: body
            in: body
            required: true
            description: The input to the LLM.
            schema:
              type: object
              required:
                - query
              properties:
                query:
                  type: string
                  description: The query in natural language.

        responses:
          201:
            description: The list of properties.
        """
        message: dict = request.get_json()
        if not message:
            return {"error": "Message cannot be empty"}, 400
        if "query" not in message:
            return {"error": "Message must contain a query"}, 400

        try:
            db_query = property_fetcher.invoke(
                {"query": message.get("query")}
            )
            print(db_query)

            db_result = db.find_properties(db_query)
            if not db_result:
                return {"error": "Database returned an error"}, 500
            properties = [doc for doc in db_result]
            for property in properties:
                property['_id'] = str(property['_id'])

            return {"properties": properties}, 200
        except Exception as e:
            return {
                "error": "Property fetcher failed.",
                "properties": [],
                "details": str(e)
            }, 200
