import os
from flask import Flask, request, jsonify
import requests
from dotenv import load_dotenv

# -----------------------
# Load secrets from .env
# -----------------------
load_dotenv()
BOT_TOKEN = os.getenv("BOT_TOKEN")
ADMIN_CHAT_ID = os.getenv("ADMIN_CHAT_ID")

# -----------------------
# Path to HTML/CSS/JS folder
# -----------------------
HTML_FOLDER = os.path.join(os.path.dirname(__file__), "..", "html")

# -----------------------
# Create Flask app
# -----------------------
app = Flask(__name__, static_folder=HTML_FOLDER, static_url_path="/")

# -----------------------
# Serve homepage
# -----------------------
@app.route("/")
def index():
    return app.send_static_file("gamerequest.html")

# -----------------------
# Endpoint to save form submissions
# -----------------------
@app.route("/save_request", methods=["POST"])
def save_request():
    data = request.json
    if not data:
        return jsonify({"status": "error", "message": "No data received"}), 400

    # Format Telegram message
    text = (
        f"🎮 New Game Request!\n"
        f"Name: {data.get('name')}\n"
        f"Email: {data.get('email')}\n"
        f"Game: {data.get('game')}\n"
        f"Platform: {data.get('platform')}\n"
        f"Message: {data.get('message')}"
    )

    # Send message via Telegram bot
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    payload = {"chat_id": ADMIN_CHAT_ID, "text": text}

    try:
        r = requests.post(url, data=payload)
        if r.ok:
            return jsonify({"status": "ok"})
        else:
            return jsonify({"status": "error", "message": "Telegram API failed"}), 500
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# -----------------------
# Run the app
# -----------------------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
