import os
from flask import Flask, request, jsonify
import requests
from dotenv import load_dotenv

# Load .env variables
load_dotenv()
BOT_TOKEN = os.getenv("BOT_TOKEN")
ADMIN_CHAT_ID = os.getenv("ADMIN_CHAT_ID")

# Path to project root
PROJECT_ROOT = os.path.dirname(os.path.dirname(__file__))  # server/.. = project/

# Tell Flask:
#   - static_folder: where CSS, JS, images are
#   - static_url_path: what URL path maps to static_folder
app = Flask(
    __name__,
    static_folder=PROJECT_ROOT,
    static_url_path="/"
)

# Serve the main HTML
@app.route("/")
def index():
    return app.send_static_file("html/gamerequest.html")  # path relative to PROJECT_ROOT

# Endpoint to handle form
@app.route("/save_request", methods=["POST"])
def save_request():
    data = request.json
    text = (
        f"🎮 New Game Request!\n"
        f"Name: {data.get('name')}\n"
        f"Email: {data.get('email')}\n"
        f"Game: {data.get('game')}\n"
        f"Platform: {data.get('platform')}\n"
        f"Message: {data.get('message')}"
    )
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    payload = {"chat_id": ADMIN_CHAT_ID, "text": text}
    r = requests.post(url, data=payload)
    return jsonify({"status": "ok" if r.ok else "error"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
