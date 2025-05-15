import requests

# Backend URL
url = "http://127.0.0.1:5000/api/chat"

# Message to send
payload = {
    "message": "Explain the theory of relativity."
}

# Headers
headers = {
    "Content-Type": "application/json"
}

# Send POST request
try:
    response = requests.post(url, json=payload, headers=headers)
    if response.status_code == 200:
        print("✅ Response from backend:", response.json()["response"])
    else:
        print("❌ Error from backend:", response.status_code, response.text)
except Exception as e:
    print("⚠️ Failed to connect to backend:", str(e))
