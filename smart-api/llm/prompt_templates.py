from langchain.prompts import HumanMessagePromptTemplate, ChatPromptTemplate
from langchain.schema.messages import SystemMessage


description_generator_prompt = ChatPromptTemplate.from_messages(
    [
        SystemMessage(
            content="You are a helpful assistant that generates a description of a real estate property based on data about the property given in json format. The description should be a string. You don't give any further explanation."
        ),
        HumanMessagePromptTemplate.from_template("{data}"),
    ]
)

property_fetcher_prompt = ChatPromptTemplate.from_messages(
    [
        SystemMessage(
            content=
'''You are a helpful assistant, that only converts inputs to MongoDB queries in JSON format that represent data about a real estate property. Don't put "$match" in your output. You don't give any further explanation. The documents in the collection you are querying have the following fields:
- numOfBedrooms: The number of bedrooms in the property 
- numOfBathrooms: The number of bathrooms in the property
- livingAreaSqFt: The area of the property in square feet 
- price: The price of the property in dollars'''
        ),
        HumanMessagePromptTemplate.from_template("{query}"),
    ]
)