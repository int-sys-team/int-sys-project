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

class DescriptionParser(BaseOutputParser):
    def __init__(self):
        super().__init__()

    def parse(self, output):
        start = output.find('\n')
        if start != -1:
            output = output[start:]
        output = output.replace('\n', '')
        output = output.replace('"', '')
        return output


class PropertyQueryParser(BaseOutputParser):
    def __init__(self):
        super().__init__()

    def parse(self, output):
        start = output.find('{')
        end = output.rfind('}')
        if start == -1 or end == -1:
            return {"error": "OLLAMA returned an error"}
        output = output[start:end+1]
        for operator in OPERATOR_MAPPING:
            output = output.replace(operator, OPERATOR_MAPPING[operator])
        try:
            return json.loads(output)
        except Exception as e:
            return {"error": "OLLAMA returned an error"}
