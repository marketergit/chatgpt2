from flask import Flask, request, jsonify
import sys  # <-- Import this at the top

app = Flask(__name__)

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_input = data.get("message", "")

    # Safe print
    print(f"Received message: {user_input}", file=sys.stdout)

    response = {
        "response": f"You said: {user_input}"
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
