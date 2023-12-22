from langchain.chat_models import ChatOllama
from llm.prompt_templates import description_generator_prompt, property_fetcher_prompt, get_comparison_prompt_template
from llm.output_parsers import DescriptionParser, PropertyQueryParser


OLLAMA_BASE_URL = 'http://localhost:11434'
OLLAMA_MODEL_NAME = 'llama2'

ollama = ChatOllama(base_url=OLLAMA_BASE_URL, model_name=OLLAMA_MODEL_NAME)

description_generator=description_generator_prompt|ollama|DescriptionParser()
property_fetcher=property_fetcher_prompt|ollama|PropertyQueryParser()

class PropertyComparisonChat():
    def __init__(self, option1, option2, messages):
        self.option1 = option1
        self.option2 = option2
        self.messages = messages
        self.prompt = get_comparison_prompt_template(self.option1, self.option2, self.messages)
        #self.chain=prompt|ollama
        

    def invoke(self):
        response = (self.prompt|ollama).invoke({})
        print(response)
        return response
    
    def stream(self):
        for chunk in ollama.stream(self.prompt.format()):
            print(chunk)
            yield chunk.content
        yield "###DONE###"