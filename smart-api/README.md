# Smart API
## Pokretanje
```sh
cd smart-api
python endpoints.py
```
Swagger UI dostupan na: http://127.0.0.1:5000/apidocs

## Ollama 
|     |       |
|------|-------|
| PORT | **11434** |
| MODEL|**llama2**|

Lokalno pokretanje Llama2 modela preko Ollame u Docker-u:
```sh
docker pull ollama/ollama
docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
docker exec -it ollama ollama run llama2
```
_API ne crash-uje i kada Ollama nije pokrenuta._