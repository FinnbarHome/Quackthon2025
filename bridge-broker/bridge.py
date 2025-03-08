import serial
import threading
import json
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

# === CONFIGURATION ===
SERIAL_PORT = "COM9"  # Change based on your system (Windows: "COMX", Linux/macOS: "/dev/ttyUSBX")
BAUD_RATE = 9600
WEBAPP_URL = "http://localhost:6000/api/atm/update"  # Web App Endpoint

# === INITIALIZE ===
app = Flask(__name__)
CORS(app)
ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)

# === HANDLE SERIAL MESSAGES FROM ARDUINO ==
def read_serial():
    while True:
        if ser.in_waiting > 0:
            line = ser.readline().decode('utf-8').strip()
            print(f"[Arduino] {line}")
            if line == "withdraw_complete" or line == "deposit_complete":
                notify_webapp(line)

# === SEND UPDATES TO WEB APP ===
def notify_webapp(message):
    try:
        response = requests.post(WEBAPP_URL, json={"status": message})
        print(f"[Web App] Response: {response.status_code}")
    except Exception as e:
        print(f"[Error] Could not notify Web App: {e}")

# === FLASK ROUTES ===
@app.route("/send", methods=["POST"])
def send_to_arduino():
    try:
        data = request.json
        action = data.get("action")
        amount = data.get("amount")

        if not action or not amount:
            return jsonify({"error": "Invalid request"}), 400

        if action == "withdraw":
            command = f"withdraw:{amount}\n"
        elif action == "deposit":
            command = f"deposit:{amount}\n"
        else:
            return jsonify({"error": "Invalid action"}), 400

        ser.write(command.encode())
        return jsonify({"message": "Command sent to Arduino"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    serial_thread = threading.Thread(target=read_serial, daemon=True)
    serial_thread.start()
    app.run(port=4000, debug=True)
