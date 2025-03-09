#include <Arduino.h>
#include <LiquidCrystal.h>

// LCD Configuration
LiquidCrystal lcd(7, 8, 9, 10, 11, 12); // RS, E, D4, D5, D6, D7

// LED Pins
const int withdrawLED = 3;
const int depositLED = 4;

void setup() {
    Serial.begin(9600);

    pinMode(withdrawLED, OUTPUT);
    pinMode(depositLED, OUTPUT);

    lcd.begin(16, 2);  // 16 columns, 2 rows
    lcd.setCursor(0, 0);
    lcd.print("ATM Ready...");
}

void scrollText(String message) {
    lcd.clear();
    int len = message.length();

    if (len > 16) {
        for (int i = 0; i < len - 15; i++) {
            lcd.setCursor(0, 0);
            lcd.print(message.substring(i, i + 16));
            delay(300);
        }
    } else {
        lcd.setCursor(0, 0);
        lcd.print(message);
        delay(2000);
    }
}

void loop() {
    if (Serial.available() > 0) {
        String command = Serial.readStringUntil('\n');
        command.trim();

        if (command.startsWith("withdraw:")) {
            long amount = command.substring(9).toInt(); // Convert to long instead of int
            Serial.print("Processing withdrawal of $");
            Serial.println(amount);

            digitalWrite(withdrawLED, HIGH);
            scrollText("Withdraw: $" + String(amount));
            delay(2000);
            digitalWrite(withdrawLED, LOW);

            Serial.println("withdraw_complete");
        }
        else if (command.startsWith("deposit:")) {
            long amount = command.substring(8).toInt(); // Convert to long instead of int
            Serial.print("Processing deposit of $");
            Serial.println(amount);

            digitalWrite(depositLED, HIGH);
            scrollText("Deposit: $" + String(amount));
            delay(2000);
            digitalWrite(depositLED, LOW);

            Serial.println("deposit_complete");
        }
    }
}
