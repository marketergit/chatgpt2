import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()  # Load .env variables

app = Flask(__name__)
CORS(app)

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

@app.route('/api/chat', methods=['POST'])
def chat():
    user_input = request.json.get("message", "")
    print(f"Received message: {user_input}")  # Add this line to log input

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": user_input}
        ],
        "model": "llama3-70b-8192"
    }

    try:
        response = requests.post("https://api.groq.com/openai/v1/chat/completions", headers=headers, json=data)
        response.raise_for_status()
        message = response.json()["choices"][0]["message"]["content"]
        print(f"Response from Groq API: {message}")  # Log the Groq response
        return jsonify({"response": message})
    except requests.exceptions.RequestException as e:
        print(f"Error from Groq API: {e}")  # Log error details
        return jsonify({"response": "Error from Groq API"}), 500
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

