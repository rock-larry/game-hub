from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
import requests

# Load secrets
load_dotenv()

BOT_TOKEN = os.getenv("BOT_TOKEN")
ADMIN_CHAT_ID = os.getenv("ADMIN_CHAT_ID")

app = Flask(__name__, static_folder="../web", static_url_path="/")

# Serve your HTML files
@app.route("/")
def index():
    return app.send_static_file("gamerequest.html")

# Endpoint to receive form submissions
@app.route("/send_request", methods=["POST"])
def send_request():
    data = request.json
    text = f"New Game Request:\nName: {data['name']}\nEmail: {data['email']}\nGame: {data['game']}\nPlatform: {data['platform']}\nMessage: {data['message']}"
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    payload = {"chat_id": ADMIN_CHAT_ID, "text": text}
    r = requests.post(url, data=payload)
    if r.ok:
        return jsonify({"status": "ok"})
    else:
        return jsonify({"status": "error"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
