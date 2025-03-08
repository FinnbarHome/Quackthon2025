#include <Arduino.h>

const int withdrawLED = 9;  // Simulates cash being dispensed
const int depositLED = 10;   // Simulates cash being deposited

void setup() {
    Serial.begin(9600);
    pinMode(withdrawLED, OUTPUT);
    pinMode(depositLED, OUTPUT);
}

void loop() {
    if (Serial.available() > 0) {
        String command = Serial.readStringUntil('\n');
        command.trim();

        if (command.startsWith("withdraw:")) {
            int amount = command.substring(9).toInt();
            Serial.print("Processing withdrawal of $");
            Serial.println(amount);
            
            digitalWrite(withdrawLED, HIGH);
            delay(2000);  // Simulating cash dispense
            digitalWrite(withdrawLED, LOW);
            
            Serial.println("withdraw_complete");
        }
        else if (command.startsWith("deposit:")) {
            int amount = command.substring(8).toInt();
            Serial.print("Processing deposit of $");
            Serial.println(amount);
            
            digitalWrite(depositLED, HIGH);
            delay(2000);  // Simulating deposit
            digitalWrite(depositLED, LOW);
            
            Serial.println("deposit_complete");
        }
        else {
            Serial.println("Invalid command");
        }
    }
}
