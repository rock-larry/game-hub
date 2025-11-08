import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import requests

# ----------------------------
# Load secrets from .env
# ----------------------------
load_dotenv()
BOT_TOKEN = os.getenv("BOT_TOKEN")
ADMIN_CHAT_ID = os.getenv("ADMIN_CHAT_ID")

# ----------------------------
# Path to the web folder
# ----------------------------
WEB_FOLDER = os.path.join(os.path.dirname(__file__), "..", "web")

# ----------------------------
# Create the Flask app
# ----------------------------
app = Flask(__name__, static_folder=WEB_FOLDER, static_url_path="/")

# ----------------------------
# Serve your main HTML page
# ----------------------------
@app.route("/")
def index():
    return app.send_static_file("gamerequest.html")

# ----------------------------
# Endpoint to handle form submissions
# ----------------------------
@app.route("/send_request", methods=["POST"])
def send_request():
    data = request.json

    text = (
        f"🎯 New Game Request:\n"
        f"Name: {data['name']}\n"
        f"Email: {data['email']}\n"
        f"Game: {data['game']}\n"
        f"Platform: {data['platform']}\n"
        f"Message: {data['message']}"
    )

    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    payload = {"chat_id": ADMIN_CHAT_ID, "text": text}

    r = requests.post(url, data=payload)
    if r.ok:
        return jsonify({"status": "ok"})
    else:
        return jsonify({"status": "error"}), 500

# ----------------------------
# Run the app
# ----------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
