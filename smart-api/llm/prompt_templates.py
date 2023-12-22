from langchain.prompts import HumanMessagePromptTemplate, ChatPromptTemplate,AIMessagePromptTemplate
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

def get_comparison_prompt_template(option1:str, option2:str, messages:list=[]):
    return ChatPromptTemplate.from_messages(
        [
            SystemMessage(
                content=
                '''You are a helpful, funny real estate agent and your job is to help your client find the best property. You will be given two properties in JSON format and your job is to compare them and talk to your client and recommend the better option. Keep it three sentences long and use emojis.'''
            ),
            SystemMessage(
                content=
                f'''Property 1:\n\n{option1}'''
            ),
            SystemMessage(
                content=
                f'''Property 2:\n\n{option2}'''
            ),
            *[HumanMessagePromptTemplate.from_template(message['content']) 
                if message['sender'] == 'client' 
                else AIMessagePromptTemplate.from_template(message['content'])
              for message in messages]
        ]
    )