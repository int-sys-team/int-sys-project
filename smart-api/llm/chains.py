from langchain_cohere import ChatCohere
from langchain.chat_models import ChatOllama
from llm.prompt_templates import description_generator_prompt, property_fetcher_prompt, get_comparison_prompt_template
from llm.output_parsers import DescriptionParser, PropertyQueryParser
import dotenv



dotenv.load_dotenv()

#cohere_api_key = 'c9tVKlSKo1rS7uNt9IohDmiKhveELCqsMXBJRV4N'  # Add your API key
ollama = ChatCohere() # its needs to be cohere_api_key

description_generator = description_generator_prompt | ollama | DescriptionParser()
property_fetcher = property_fetcher_prompt | ollama | PropertyQueryParser()


class PropertyComparisonChat():
    def __init__(self, option1, option2, messages):
        self.option1 = option1
        self.option2 = option2
        self.messages = messages
        print(self.messages)
        self.prompt = get_comparison_prompt_template(
            self.option1, self.option2, self.messages)
        # self.chain=prompt|ollama

    def invoke(self):
        response = (self.prompt | ollama).invoke({})
        print(response)
        return response

    def stream(self):
        for chunk in ollama.stream(self.prompt.format()):
            print(chunk)
            yield chunk.content
        yield "###DONE###"


class DescriptionGeneratorStream():
    def __init__(self, data):
        self.data = data

    def stream(self):
        start_streaming = False
        for chunk in ollama.stream(description_generator_prompt.format(data=self.data)):
            print(chunk)
            if '\n' in chunk.content:
                start_streaming = True
            if start_streaming and not ('"' in chunk.content or '\n' in chunk.content):
                yield chunk.content
        yield "###DONE###"