#include <Wire.h> //AF
#include <Adafruit_INA219.h> //AF

#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEScan.h>
#include <BLEAdvertisedDevice.h>
#include <BLEClient.h>
#include <BLEUUID.h>

#define SERVER_NAME "ESP_SPP_SERVER"
#define SERVICE_UUID "ABF0"
#define CHAR_UUID "ABF1"

#define LED_R 0
#define LED_G 1
#define LED_B 2
#define LED_W 3

#define DRIVER 7

#define LED_FREQUENCY 2000 // 2kHz
#define LED_RESOLUTION 12  // 12-bit resolution
//#define BRIGHTNESS_STEPS 100 // Smooth transition steps
//#define MAX_DUTY ((1 << LED_RESOLUTION) - 1)  // 4095 for 12-bit

Adafruit_INA219 ina219; //AF

BLEClient* pClient;
BLERemoteCharacteristic* pRemoteCharacteristic;
bool deviceConnected = false;
bool doConnect = false;
BLEAdvertisedDevice* myDevice = nullptr;

float brightnessFactor = 0.0;
bool staticBrightness = false;
unsigned long lastUpdate = 0;
unsigned long powerUpdate = 0;
const int powerUpdateInterval = 1000;
const int updateInterval = 20; // 20ms for smooth transitions
uint16_t currentR = 0, currentG = 0, currentB = 0;
//int brightnessCounter = 0;   // Initialize brightness counter
//int brightnessSteps = 500;   // Number of steps from 0 to 100%
float driverBrightness;
int driverToggle;

void notifyCallback(BLERemoteCharacteristic* pBLERemoteCharacteristic, uint8_t* pData, size_t length, bool isNotify);

class MyClientCallback : public BLEClientCallbacks {
    void onConnect(BLEClient* pclient) {
        deviceConnected = true;
    }

    void onDisconnect(BLEClient* pclient) {
        deviceConnected = false;
        doConnect = true;  // Try to reconnect
    }
};

class MyAdvertisedDeviceCallbacks : public BLEAdvertisedDeviceCallbacks {
    void onResult(BLEAdvertisedDevice advertisedDevice) {
        if (advertisedDevice.haveName() && advertisedDevice.getName() == SERVER_NAME) {
            BLEDevice::getScan()->stop();
            myDevice = new BLEAdvertisedDevice(advertisedDevice);
            doConnect = true;  // Set flag to connect in loop()
        }
    }
};

void connectToServer() {
    if (!myDevice) return;
    pClient = BLEDevice::createClient();
    pClient->setClientCallbacks(new MyClientCallback());
    pClient->connect(myDevice);
    BLERemoteService* pRemoteService = pClient->getService(BLEUUID(SERVICE_UUID));
    if (pRemoteService) {
        pRemoteCharacteristic = pRemoteService->getCharacteristic(BLEUUID(CHAR_UUID));
        if (pRemoteCharacteristic) {
            pRemoteCharacteristic->registerForNotify(notifyCallback);
            Serial.println("Connected to server!");
            deviceConnected = true;
        }
    }
}

void updateLEDs(uint16_t r, uint16_t g, uint16_t b, float brightnessFactor) {
    analogWriteFrequency(LED_FREQUENCY); // Set PWM frequency to 2kHz
    analogWriteResolution(LED_RESOLUTION); // Set PWM resolution to 12 bits
    uint16_t scaledR = r * brightnessFactor;
    uint16_t scaledG = g * brightnessFactor;
    uint16_t scaledB = b * brightnessFactor;
    analogWrite(LED_R, scaledR);
    analogWrite(LED_G, scaledG);
    analogWrite(LED_B, scaledB);
}

void notifyCallback(BLERemoteCharacteristic* pBLERemoteCharacteristic, uint8_t* pData, size_t length, bool isNotify) {
    Serial.print("Received Notification: ");
    Serial.write(pData, length);
    Serial.println("");

    uint8_t r, g, b;
    int toggle, brightness, rainbow_toggle;
    if (sscanf((char*)pData, "#%02hhX%02hhX%02hhX,%d,%d,%d", &r, &g, &b, &toggle, &brightness, &rainbow_toggle) == 6) {
        float targetBrightness = brightness / 100.0;
        brightnessFactor = targetBrightness; // Smooth transition handled in loop()
        currentR = (r * 4095) / 255;
        currentG = (g * 4095) / 255;
        currentB = (b * 4095) / 255;
        driverBrightness = brightness / 500.0;
        driverToggle = toggle;
        staticBrightness = (rainbow_toggle == 0); // Enable static brightness if toggle is off
    }
}

void setup() {
    Serial.begin(115200);
    pinMode(LED_R, OUTPUT);
    pinMode(LED_G, OUTPUT);
    pinMode(LED_B, OUTPUT);
    pinMode(LED_W, OUTPUT);

    analogWrite(LED_R, 0);
    analogWrite(LED_G, 0);
    analogWrite(LED_B, 0);
    analogWrite(LED_W, 0);
    analogWrite(DRIVER, 0);
    

    BLEDevice::init("");
    BLEScan* pBLEScan = BLEDevice::getScan();
    pBLEScan->setAdvertisedDeviceCallbacks(new MyAdvertisedDeviceCallbacks());
    pBLEScan->setActiveScan(true);
    pBLEScan->start(5, false);

     // Initialize the INA219.
    // By default the initialization will use the largest range (32V, 2A).  However
     // you can call a setCalibration function to change this range (see comments).
    if (! ina219.begin()) { //AF
    Serial.println("Failed to find INA219 chip"); //AF
    while (1) { delay(10); } //AF
    } //AF
    // To use a slightly lower 32V, 1A range (higher precision on amps):
    //ina219.setCalibration_32V_1A();
    // Or to use a lower 16V, 400mA range (higher precision on volts and amps):
    //ina219.setCalibration_16V_400mA();

    Serial.println("Measuring voltage and current with INA219 ..."); //AF
}

void loop() {
    if (doConnect) {
        connectToServer();
        doConnect = false;
    }
    if (!deviceConnected) {
        Serial.println("Scanning for BLE devices...");
        BLEDevice::getScan()->start(5, false);
    }
    // Smooth brightness update every 20ms
    if (millis() - lastUpdate > updateInterval) {
        lastUpdate = millis();
        
        if(driverToggle == 0) {
        float smoothFactor = staticBrightness ? 1.0 : (sin(millis() / 1000.0 * PI) + 1.0) / 2.0; // Static or sine wave modulation
        updateLEDs(currentR, currentG, currentB, brightnessFactor * smoothFactor);
        analogWrite(LED_W, 0);
        analogWrite(DRIVER, 0);
        } 
        else {
        // Update brightness smoothly from 0% to 100%
        //int duty = (brightnessCounter * MAX_DUTY) / brightnessSteps;
        //analogWrite(DRIVER, duty);

        // Update counter
        //brightnessCounter++;
        //if (brightnessCounter > brightnessSteps) {
          //brightnessCounter = 0;  // Restart the ramp
        //}
        analogWrite(DRIVER, round(driverBrightness * 4095));
        analogWrite(LED_R, 0);
        analogWrite(LED_G, 0);
        analogWrite(LED_B, 0);
        analogWrite(LED_W, 0);
        }
    }

    if (millis() - powerUpdate > powerUpdateInterval) {
        powerUpdate = millis();
    //AF below
  float shuntvoltage = 0;
  float busvoltage = 0;
  float current_mA = 0;
  float loadvoltage = 0;
  float power_mW = 0;

  shuntvoltage = ina219.getShuntVoltage_mV();
  busvoltage = ina219.getBusVoltage_V();
  current_mA = ina219.getCurrent_mA();
  power_mW = ina219.getPower_mW();
  loadvoltage = busvoltage + (shuntvoltage / 1000);
  
  //Serial.print("Bus Voltage:   "); Serial.print(busvoltage); Serial.println(" V");
  //Serial.print("Shunt Voltage: "); Serial.print(shuntvoltage); Serial.println(" mV");
  //Serial.print("Load Voltage:  "); Serial.print(loadvoltage); Serial.println(" V");
  //Serial.print("Current:       "); Serial.print(current_mA); Serial.println(" mA");
  Serial.print("Power:         "); Serial.print(power_mW); Serial.println(" mW");
  Serial.println("");
  }
  //delay(2000);
}
