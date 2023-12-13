from langchain.chat_models import ChatOllama
from llm.prompt_templates import description_generator_prompt, property_fetcher_prompt
from llm.output_parsers import DescriptionParser, PropertyQueryParser


OLLAMA_BASE_URL = 'http://localhost:11434'
OLLAMA_MODEL_NAME = 'llama2'

ollama = ChatOllama(base_url=OLLAMA_BASE_URL, model_name=OLLAMA_MODEL_NAME)

description_generator=description_generator_prompt|ollama|DescriptionParser()
property_fetcher=property_fetcher_prompt|ollama|PropertyQueryParser()

