#include <Arduino.h>

const int withdrawLED = 9;  
const int depositLED = 10;  

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
            digitalWrite(withdrawLED, HIGH);
            delay(2000);  
            digitalWrite(withdrawLED, LOW);
            Serial.println("withdraw_complete");
        }
        else if (command.startsWith("deposit:")) {
            digitalWrite(depositLED, HIGH);
            delay(2000);  
            digitalWrite(depositLED, LOW);
            Serial.println("deposit_complete");
        }
    }
}
