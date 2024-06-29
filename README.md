# 🏘️ Intelligent Systems Student Project

🌐 **Live Demo**: [https://ai-nekretnine.azurewebsites.net/](https://ai-nekretnine.azurewebsites.net/)

# Austin-Estates: AI-based Real Estate  ![AI](https://img.shields.io/badge/AI-00B9F1?style=for-the-badge&logo=artificial-intelligence&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![.Net](https://img.shields.io/badge/.NET-5C2D91?style=for-the-badge&logo=.net&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) 

Welcome to our AI-based Real Estate project! This project is part of the Intelligent Systems course and aims to leverage AI technologies.

## 🎯 Features

- AI-powered property value estimation
- Intelligent property recommendations
- Interactive map-based property search
- Natural language property search
  - Smart searching based on human-like descriptions of desired home features
- Generating sale description based on property characteristics

## 🧑‍💻 Team Members
* Katarina Maksimović, 1599
* Matija Špeletić, 1672
* Aleksa Milić, 1610
* Vuk Grujić, 1693

## 📦 Tech Stack
- **Frontend:** React
- **Backend:** .NET
- **API Service:** Flask (Local AI or LLM API)

## 🤖 How to Run Locally with a Local LLM

### Prerequisites
- Node.js
- .NET SDK
- Python 3.10+
- Flask

### Navigating
1. Navigate to the `Austin-Estates` directory:
    ```bash
    cd Austin-Estates
    ```
2. Start the frontend:
    ```bash
    cd vite-project
    npm install
    npm run dev
    ```
3. Start the backend:
    ```bash
    cd Austin-EstatesAPI
    dotnet restore
    dotnet watch run
    ```
4. Navigate to the `smart-api` directory:
   ```bash
   cd ../smart-api
   ```
  
5. Set up and activate a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```
  
6. Install dependencies and run the service:
    ```bash
    pip install -r requirements.txt
    flask run
    ```


## 🤖 How to Run Locally with Local LLM

1. Clone the repository at the specific commit:
    ```bash
    git clone https://github.com/int-sys-team/int-sys-project.git
    cd int-sys-project
    git checkout 09f340638307316e73d02e4128564e4fe5d5cadc
    ```

2. Start the frontend:
    ```bash
    cd Austin-Estates/vite-project
    npm install
    npm run dev
    ```

3. Start the backend:
    ```bash
    cd ../Austin-EstatesAPI
    dotnet restore
    dotnet watch run
    ```

4. Navigate to the `smart_api` directory and follow the instructions in the [smart-api README](https://github.com/int-sys-team/int-sys-project/tree/main/smart-api#readme).


Now you have the frontend, backend, and smart API running locally. The project should be accessible through your web browser.




## 🔧 Project Structure

* Austin-Estates
    * Austin-EstatesAPI
        * Controllers
        * CustomExceptions
        * Models
        * Properties
        * Services
        * EstatesAPI.csproj
        * EstatesAPI.sln
        * Program.cs
        * Startup.cs
        * appsettings.Development.json
        * appsettings.json
    * vite-project
        * public
        * src
            * components
            * pages
            * services
    * notebooks
        * Image_price_prediction.ipynb
        * austin-house-preprocessing.ipynb
        * recommendation-prototype.ipynb
        * sklearn-model-search.ipynb
        * austinHousingData.csv
    * smart-api
        * wsgi.py
        * endpoints.py
        * db
        * llm
        * price
        * similar
    * README.md

 ## 🏁 Conclusion

Our approach integrates several key components:

1. **Frontend (React)**: A responsive and interactive user interface built with modern web technologies.

2. **Backend (.NET)**: A robust server-side application handling business logic and data management.

3. **LLM Service (Flask)**:
   - Local AI: Leveraging on-premises AI capabilities for enhanced performance and data privacy.
   - LLM API: Integrating with cloud-based language models for scalability and advanced features.

This architecture reflects industry standards by separating concerns, allowing for scalability, and incorporating cutting-edge AI technologies.
