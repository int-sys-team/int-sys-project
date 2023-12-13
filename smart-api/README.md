# 🧠 Smart API
## 🤖 How to run
```sh
cd smart-api
python endpoints.py
```
Swagger UI available at: http://127.0.0.1:5000/apidocs

## 🦙 Ollama 
|     |       |
|------|-------|
| PORT | **11434** |
| MODEL|**llama2**|

Running Llama2 locally via Ollama in a Docker container:
```sh
docker pull ollama/ollama
docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
docker exec -it ollama ollama run llama2
```
_The API will(should) crash if a Llama2 model isn't running._