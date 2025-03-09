import serial
import threading
import time
import requests
from flask import Flask, jsonify
from flask_cors import CORS

# === CONFIGURATION ===
SERIAL_PORT = "COM9"  # Change this based on your system
BAUD_RATE = 9600
ATM_ID = "ATM001"  # This is the ATM this bridge is connected to
BACKEND_URL = "https://quackthon2025.onrender.com/api/atm/pending/" + ATM_ID  # Backend URL

# === INITIALIZE ===
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)

# === HANDLE SERIAL MESSAGES FROM ARDUINO ===
def read_serial():
    while True:
        if ser.in_waiting > 0:
            line = ser.readline().decode('utf-8').strip()
            print(f"[Arduino] {line}")
            if line == "withdraw_complete" or line == "deposit_complete":
                print("[Bridge] Transaction complete.")

# === CHECK FOR TRANSACTIONS EVERY 5 SECONDS ===
def check_transactions():
    while True:
        try:
            response = requests.get(BACKEND_URL)
            transactions = response.json().get("transactions", [])

            if transactions:
                for transaction in transactions:
                    action = transaction["action"]
                    amount = transaction["amount"]
                    print(f"[Bridge] Processing {action} of ${amount}")

                    if action == "withdraw":
                        ser.write(f"withdraw:{amount}\n".encode())
                    elif action == "deposit":
                        ser.write(f"deposit:{amount}\n".encode())

        except Exception as e:
            print(f"[Error] Could not fetch transactions: {e}")

        time.sleep(5)  # Wait 5 seconds before checking again

# === START THREADS ===
if __name__ == "__main__":
    serial_thread = threading.Thread(target=read_serial, daemon=True)
    serial_thread.start()

    poll_thread = threading.Thread(target=check_transactions, daemon=True)
    poll_thread.start()

    app.run(port=4000, debug=True)
