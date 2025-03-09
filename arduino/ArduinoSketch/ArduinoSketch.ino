#include <Arduino.h>
#include <LiquidCrystal.h>

// LCD Configuration (1602A without I2C)
LiquidCrystal lcd(7, 8, 9, 10, 11, 12); // RS, E, D4, D5, D6, D7

// LED Pins
const int withdrawLED = 3;
const int depositLED = 4;

void setup() {
    Serial.begin(9600);

    pinMode(withdrawLED, OUTPUT);
    pinMode(depositLED, OUTPUT);

    lcd.begin(16, 2);  // 16 columns, 2 rows
}

// Function to display an animated welcome message
void animatedWelcomeMessage() {
    const String messages[] = {
        "Welcome to ATM",
        "Scan The RFID",
        "Secure Banking"
    };
    
    static int index = 0;
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print(messages[index]);
    index = (index + 1) % 3; // Cycle through messages
    delay(2000); // Change message every second
}

// Function to scroll cash animation from left to right (Deposit)
void scrollDepositAnimation() {
    for (int i = 0; i <= 16; i++) {
        lcd.clear();
        lcd.setCursor(i, 0);
        lcd.print("|$|");
        delay(200);
    }
}

// Function to scroll cash animation from right to left (Withdraw)
void scrollWithdrawAnimation() {
    for (int i = 16; i >= 0; i--) {
        lcd.clear();
        lcd.setCursor(i, 0);
        lcd.print("|$|");
        delay(200);
    }
}

// Function to display transaction on two lines, then reset
void displayTransaction(String type, long amount) {
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print(type);
    
    lcd.setCursor(0, 1);
    lcd.print("$");
    lcd.print(amount);

    delay(2000);
}

// Main Loop
void loop() {
    if (Serial.available() > 0) {
        String command = Serial.readStringUntil('\n');
        command.trim();

        if (command.startsWith("withdraw:")) {
            long amount = command.substring(9).toInt();
            Serial.print("Processing withdrawal of $");
            Serial.println(amount);

            digitalWrite(withdrawLED, HIGH);
            scrollWithdrawAnimation();
            displayTransaction("Withdraw:", amount);
            digitalWrite(withdrawLED, LOW);

            Serial.println("withdraw_complete");
        }
        else if (command.startsWith("deposit:")) {
            long amount = command.substring(8).toInt();
            Serial.print("Processing deposit of $");
            Serial.println(amount);

            digitalWrite(depositLED, HIGH);
            scrollDepositAnimation();
            displayTransaction("Deposit:", amount);
            digitalWrite(depositLED, LOW);

            Serial.println("deposit_complete");
        }
    }
    else {
        animatedWelcomeMessage(); // Display animated idle message
    }
}