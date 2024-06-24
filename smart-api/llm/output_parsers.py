from langchain.schema.output_parser import BaseOutputParser
import json


OPERATOR_MAPPING={
    '$eq:': '"$eq":',
    '$gt:': '"$gt":',
    '$gte:': '"$gte":',
    '$in:': '"$in":',
    '$lt:': '"$lt":',
    '$lte:': '"$lte":',
    '$ne:': '"$ne":',
}

ERROR_MESSAGE = {"error": "OLLAMA returned an error"}
UNSUPPORTED_OPERATORS = ['$sort']

class DescriptionParser(BaseOutputParser):
    def __init__(self):
        super().__init__()

    def parse(self, output):
        output = output.split('\n', 1)[-1].replace('\n', '').replace('"', '')
        return output


class PropertyQueryParser(BaseOutputParser):
    def __init__(self):
        super().__init__()

    def parse(self, output):
        start = output.find('{')
        end = output.rfind('}')
        if start == -1 or end == -1:
            return ERROR_MESSAGE

        output = output[start:end+1]

        try:
            query = json.loads(output)
            for op in UNSUPPORTED_OPERATORS:
                query.pop(op, None)
            # Example adjustment: Ensure numeric values are correctly interpreted
            if "numOfBathrooms" in query and isinstance(query["numOfBathrooms"], str):
                query["numOfBathrooms"] = int(query["numOfBathrooms"])
            print("Generated MongoDB Query:", query)  # Log the query for debugging
            return query
        except json.JSONDecodeError:
            return ERROR_MESSAGE
        except Exception as e:
            return {"error": str(e)}
