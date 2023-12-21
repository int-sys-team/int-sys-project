
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://realestate:pLVraRhPe0I65SEO@cluster0.fp3mz6h.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

def test_connection():
    try:
        client.admin.command('ping')
        print("Connection to MongoDB:\t\tOK")
    except Exception as e:
        print(e)

def add_property(property):
    try:
        collection=client['realestate']['properties']
        result = collection.insert_one(property)
        return result.inserted_id
    except Exception as e:
        print(e)

def find_properties(query, limit=10):
    try:
        collection=client['realestate']['properties']
        result = collection.find(query).limit(limit)
        return result
    except Exception as e:
        print(e)

def update_property(property):
    try:
        collection=client['realestate']['properties']
        result = collection.update_one({"_id": property["_id"]}, {"$set": property})
        return result
    except Exception as e:
        print(e)

test_connection()

if __name__ == '__main__':
    print([doc for doc in find_properties({'room_count': {'$lt': 3}, 'type': {
        '$eq': 'apartment'}, 'price': {'$lte': 200000}})])
