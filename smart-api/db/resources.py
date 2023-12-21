from flask import request
from flask_restful import Resource
import database as db
from llm.chains import description_generator, property_fetcher


class Property(Resource):

    def get(self):
        """
        Generates a description of the real estate property based on its data.

        ---
        parameters:
          - name: page
            in: query
            required: true
            description: The page number.
            type: integer
          - name: count
            in: query
            required: true
            description: The number of properties per page.
            type: integer

        responses:
          201:
            properties: The list of properties.
        """
        data: dict = {
            "page": int(request.args.get("page",1)),
            "count": int(request.args.get("count",10))
        }
        if not data:
            return {"error": "Request body cannot be empty."}, 400
        
        try:
            result = db.client['realestate']['properties'].find().skip(data.get("page")*data.get("count")).limit(data.get("count"))
            properties = [doc for doc in result]
            for property in properties:
                property['_id'] = str(property['_id'])
            return {"properties": properties}, 200
        except Exception as e:
            return {
                "error": "Could not fetch properties.",
                "details": str(e)
            }, 500


