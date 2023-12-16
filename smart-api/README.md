# 🧠 Smart API
## 🤖 How to run
### Prerequisites
Ensure you have Python 3.x and pip installed on your system.

#### On Linux (and macOS?):
```sh
# Create and activate the virtual environment
python3 -m venv venv 
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the Smart API
python3 endpoints.py
```

#### On Windows:
```sh
# Create and activate the virtual environment
python -m venv venv 
.\venv\Scripts\activate

# Install dependencies
python -m pip install -r requirements.txt

# Run the Smart API
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
_The API will (should) not crash if a Llama2 model isn't running._
