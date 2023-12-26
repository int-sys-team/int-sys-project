from flask import request
from flask_restful import Resource
from similar.code import similar_properties

class SimilarProperties(Resource):
    def post(self):
        """
        Returns a list of similar properties for the one provided.

        ---
        parameters:
          - name: body
            in: body
            required: true
            description: Data about the real estate object.
            schema:
              type: object
              required:
                - id
              properties:
                id:
                  type: string
                  description: Id of the target property.
        responses:
          200:
            description: Array of similar properties.
        """
        data: dict = request.get_json()
        if not data:
            return {"error": "Request body cannot be empty."}, 400
        if "id" not in data:
            return {"error": "Request body must contain id"}, 400
        try:
            response = similar_properties(data.get("id"))
            return {"houses": response}, 200
        except Exception as e:
            return {
                "error": "SimilarProperties failed.",
                "description": "This is a default description.",
                "details": str(e)
            }, 500


