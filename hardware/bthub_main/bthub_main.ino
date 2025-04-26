#include <ETH.h>
#include <WiFiClientSecure.h>
#include <HTTPClient.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include "esp_system.h"
#include "esp_log.h"
#include "nvs_flash.h"
#include "esp_bt.h"
#include "driver/uart.h"
#include "string.h"

#include "esp_gap_ble_api.h"
#include "esp_gatts_api.h"
#include "esp_bt_defs.h"
#include "esp_bt_main.h"
#include "ble_spp_server_demo.h"
#include "esp_gatt_common_api.h"
#include <math.h>
#include <stdio.h>

//Arduino Bluetooth setup
#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>

#define DEVICE_NAME "ESP_SPP_SERVER"
#define SPP_SERVICE_UUID "ABF0"
#define SPP_CHAR_UUID "ABF1"

BLEServer *pServer = NULL;
BLECharacteristic *pCharacteristic = NULL;
bool deviceConnected = false;
bool restartServer = false;


class MyServerCallbacks : public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) {
        deviceConnected = true;
    };
    void onDisconnect(BLEServer* pServer) {
        deviceConnected = false;
        restartServer = true; // Trigger server restart
    }
};

// AWS API Gateway endpoint
const char* mqtt_server = "a3f9623llaje2z-ats.iot.us-west-2.amazonaws.com";
const char* pub_topic = "$aws/things/BTHubThing/shadow/name/BTHubThing/update"; // MQTT Publish Topic
const char* sub_topic = "config/BTHubThing"; // MQTT Subscribe Topic

String ssid = "";
String password = "";
String json = "";

WiFiClientSecure net;
PubSubClient client(net);

const char AWS_CERT_CRT[] = R"EOF(
-----BEGIN CERTIFICATE-----
MIIDWjCCAkKgAwIBAgIVAI4XBMVQBofb0FroVKCvVDFarmuMMA0GCSqGSIb3DQEB
CwUAME0xSzBJBgNVBAsMQkFtYXpvbiBXZWIgU2VydmljZXMgTz1BbWF6b24uY29t
IEluYy4gTD1TZWF0dGxlIFNUPVdhc2hpbmd0b24gQz1VUzAeFw0yNTAzMDYxODM0
MzdaFw00OTEyMzEyMzU5NTlaMB4xHDAaBgNVBAMME0FXUyBJb1QgQ2VydGlmaWNh
dGUwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC7HRV5LE28qXeGXAkA
D8w+4Zh4hR0/seDzAZJ8DuWIkHDDQ4okkXzxZ2U49wX7K7objgp8W8Ao6Gf4e1z8
t5ndzFPvoztZx9Mtt5wgRM8H/a94sud6hpXrn09upUKWgc7QyaCRL0OE5MIImsG6
F39ApoDVlc9blFOqFIFRZVOK9nbAS8c/8S5w/HWX0rvpDO9bGf7EAXsid20YSIlX
wmTo4Jx8WfZFrQpYWcyZYpXfe5jeL6g1qzKFFXw0rGrDGGxcmPcypw9l1aOegul3
R3kSqyxXVNZMSuwgBQWFtUrQzZZvQ0MEB9hwsVp8XozEqcjsvP0dgzs9Bg/iADtG
GRx5AgMBAAGjYDBeMB8GA1UdIwQYMBaAFN4vRFmO/Xj7qPc0G0oF9PVLS/ZzMB0G
A1UdDgQWBBTF0uItE4rVFLg8JRoXetWN44jddzAMBgNVHRMBAf8EAjAAMA4GA1Ud
DwEB/wQEAwIHgDANBgkqhkiG9w0BAQsFAAOCAQEAfb8ldFtfQxo+VCpqe3tmFEvP
hnEyniAI4oeJCrxGUGcK3pOqKn34vxp59cIynSfu0Fh8P4OSnvTMfmaIpj6rpggJ
jfkjBlpOZN3lgPTWvMwZgmnisP0ShiEYjH+Vl/rJJzaQSyS2necfS5Z1aQ7TEZLc
MvDcHWELUx5Dav3wIFUsetGpUhqYlK5U2jJ+MwonD+MYMvDssDukHdUHYgie0J60
GSGEG6EzZlhGcvy/p/h3srMVOVB2Yely7Hi2Js4tuzH3q+zKuYkmSfgJVnL9flDg
D0mIHQG3LvAW92GmtTZZlax7SsBjvZtRus37giFVg5vA/G8yUTmZXkn4GyVHiQ==
-----END CERTIFICATE-----
)EOF";

const char AWS_CERT_PRIVATE[] = R"EOF(
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAux0VeSxNvKl3hlwJAA/MPuGYeIUdP7Hg8wGSfA7liJBww0OK
JJF88WdlOPcF+yu6G44KfFvAKOhn+Htc/LeZ3cxT76M7WcfTLbecIETPB/2veLLn
eoaV659PbqVCloHO0MmgkS9DhOTCCJrBuhd/QKaA1ZXPW5RTqhSBUWVTivZ2wEvH
P/EucPx1l9K76QzvWxn+xAF7IndtGEiJV8Jk6OCcfFn2Ra0KWFnMmWKV33uY3i+o
NasyhRV8NKxqwxhsXJj3MqcPZdWjnoLpd0d5EqssV1TWTErsIAUFhbVK0M2Wb0ND
BAfYcLFafF6MxKnI7Lz9HYM7PQYP4gA7RhkceQIDAQABAoIBAAQ1WUBKcM0nepq5
AzLPKCbZ6BX92HSQSaDtjh/gLeVuajraEAdWhlrfmnU3iRjnGN55yV6WqbHB2GTM
UYEVmA5XBCRFpZYVWniSwp4vLgDeAc5TJ8WntUOBZ8XzTZYZAU/M2SGq0HfytTKA
WI8Y7DHGDOvA3NMQePlAUNBF2SUs8AAGAsxfVK084D7hnTzXBtNdrmYlimL+Vr1e
CMkZsjCe6HS7sq779WX/xOHOzkaCvpFDB4RR+/TA3lo6Eh/lWvjC12GQIV/awhOy
v0CzDAHUwv/EnlF4GxovKNXA2lpaapzkynCBtrIcJjopcc077/3o181paLb+Dqyl
J8MW0wECgYEA9vzhhRz3BujatmR0d5R7QTNYGwMK6OTE2nGyJRB1VmfT0MJ7LPMP
cgNeY2Qx9aIutyYv89EqQJEN1YjU2tiwzHDHtjBDYJ9hALAcc5LJmyGJ9LCVedoX
uF3rrtyLvAD9/42yHlT6xyRdpZ1Tud1TrialBCYkcVmJglcA1IUbu7ECgYEAwfDq
ovtbOztxumE+SigP0/LfG7Up4xTuXTWQHN+0sQLFDckgiaNwBnNYsjnCgA3iDoa+
nTuaQQWaCt3Jm2JVEHGUyiTcvxp+BuPWJLUzECfg0Aw9yHVAplWt1D6ULVfXEDo+
76kekuRSQjC6PncvrsXy2wyyIbMR+RnKL3tqx0kCgYEAn8bfrVkbhODF/A/oOCNZ
yMgKSw8g06CKqDW85LVM8uSf5gCp5l4ms77yJKIAn8KXLewKQVQiXTp5FJY7/IcJ
eHfM+lMmgy8XdXZ4MVvYB/8eW6iQSg+IIMDBYpFR5AFQTy2++FhJEuK3ohewviAr
rhFZ1uFF2f3uMt9Nri2dz0ECgYBJkTWwNWDaCyaM6K5UOvYmFA8F16bX+Oyidtr/
2OwV6VMOc6jgDRtFlyOiF77sDFgf4oUT57QPziwsywza4GYcIrmqJGmIJGiB/JMS
wZlpG3dv8/TLwY6QiheyVzqmKJfwE+gjySdL2UhKy2kaoON5jKUe6qX3mpHKyDml
4U8T4QKBgQCb2GZma7HAJsvCXZ6BqHjFSryN7ucjIk6vCkcJCBBOK5vTPHTY02Hw
+xlAfuP1Xu9ZYOvndNaovpddWdBxG8MpiKP/Dhvmrh9DQ16PyfLmm1hrjoo+0SW8
IV3vxzxsHKuD2pHzsK0WWXkwGDEFOw3fF3xdqSofh/tYeDK5SflUCw==
-----END RSA PRIVATE KEY-----
)EOF";

const char AWS_CERT_CA[] = R"EOF(
-----BEGIN CERTIFICATE-----
MIIDQTCCAimgAwIBAgITBmyfz5m/jAo54vB4ikPmljZbyjANBgkqhkiG9w0BAQsF
ADA5MQswCQYDVQQGEwJVUzEPMA0GA1UEChMGQW1hem9uMRkwFwYDVQQDExBBbWF6
b24gUm9vdCBDQSAxMB4XDTE1MDUyNjAwMDAwMFoXDTM4MDExNzAwMDAwMFowOTEL
MAkGA1UEBhMCVVMxDzANBgNVBAoTBkFtYXpvbjEZMBcGA1UEAxMQQW1hem9uIFJv
b3QgQ0EgMTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALJ4gHHKeNXj
ca9HgFB0fW7Y14h29Jlo91ghYPl0hAEvrAIthtOgQ3pOsqTQNroBvo3bSMgHFzZM
9O6II8c+6zf1tRn4SWiw3te5djgdYZ6k/oI2peVKVuRF4fn9tBb6dNqcmzU5L/qw
IFAGbHrQgLKm+a/sRxmPUDgH3KKHOVj4utWp+UhnMJbulHheb4mjUcAwhmahRWa6
VOujw5H5SNz/0egwLX0tdHA114gk957EWW67c4cX8jJGKLhD+rcdqsq08p8kDi1L
93FcXmn/6pUCyziKrlA4b9v7LWIbxcceVOF34GfID5yHI9Y/QCB/IIDEgEw+OyQm
jgSubJrIqg0CAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMC
AYYwHQYDVR0OBBYEFIQYzIU07LwMlJQuCFmcx7IQTgoIMA0GCSqGSIb3DQEBCwUA
A4IBAQCY8jdaQZChGsV2USggNiMOruYou6r4lK5IpDB/G/wkjUu0yKGX9rbxenDI
U5PMCCjjmCXPI6T53iHTfIUJrU6adTrCC2qJeHZERxhlbI1Bjjt/msv0tadQ1wUs
N+gDS63pYaACbvXy8MWy7Vu33PqUXHeeE6V/Uq2V8viTO96LXFvKWlJbYK8U90vv
o/ufQJVtMVT8QtPHRh8jrdkPSHCa2XV4cdFyQzR1bldZwgJcJmApzyMZFo6IQ6XU
5MsI+yMRQ+hDKXJioaldXgjUkK642M4UwtBV8ob2xJNDd2ZhwLnoQdeXeGADbkpy
rqXRfboQnoZsG4q5WTP468SQvvG5
-----END CERTIFICATE-----
)EOF";


static bool eth_connected = false;

// Global variables
static float hue = 0.0; // Hue value for the rainbow cycle (0-360)
static String hexcode = "#000000"; //Hex value for static lights
static int toggle = 0;  // Toggle signal: 0 = RGB, 1 = White
static int brightness = 100; // Brightness percentage (0-100)
static int brightness_direction = -1; // Direction for brightness cycling (-1 for down, 1 for up)
static int rainbow_toggle = 1; //Toggle between rainbow cycle and static value: 0 = static, 1 = cycle

// HSV to RGB conversion
void hsv_to_rgb(float h, float s, float v, uint8_t *r, uint8_t *g, uint8_t *b) {
    float c = v * s;
    float x = c * (1 - fabs(fmod(h / 60.0, 2) - 1));
    float m = v - c;
    float r_prime, g_prime, b_prime;

    if (h < 60) {
        r_prime = c; g_prime = x; b_prime = 0;
    } else if (h < 120) {
        r_prime = x; g_prime = c; b_prime = 0;
    } else if (h < 180) {
        r_prime = 0; g_prime = c; b_prime = x;
    } else if (h < 240) {
        r_prime = 0; g_prime = x; b_prime = c;
    } else if (h < 300) {
        r_prime = x; g_prime = 0; b_prime = c;
    } else {
        r_prime = c; g_prime = 0; b_prime = x;
    }

    *r = (uint8_t)((r_prime + m) * 255);
    *g = (uint8_t)((g_prime + m) * 255);
    *b = (uint8_t)((b_prime + m) * 255);
}

void setColorFromHex(String hex, uint8_t *r, uint8_t *g, uint8_t *b) {
    if (hex[0] == '#') {
        hex = hex.substring(1);
    }
    if (hex.length() == 6) {
        *r = strtol(hex.substring(0, 2).c_str(), NULL, 16);
        *g = strtol(hex.substring(2, 4).c_str(), NULL, 16);
        *b = strtol(hex.substring(4, 6).c_str(), NULL, 16);
    }
}

void sendColorNotification() {
    if (deviceConnected) {
        uint8_t r, g, b;

        char notification[20];

        if (rainbow_toggle == 1){
          hsv_to_rgb(hue, 1.0, (float)brightness / 100.0, &r, &g, &b);
        }
        else{
          setColorFromHex(hexcode, &r, &g, &b);
        }
        snprintf(notification, sizeof(notification), "#%02X%02X%02X,%d,%d,%d", r, g, b, toggle, brightness, rainbow_toggle);

        pCharacteristic->setValue(notification);
        pCharacteristic->notify();
    }
}


void connectWiFi() {
//Get network name
  Serial.println("Enter Network Name: ");
  while(Serial.available() == 0){}
  ssid = Serial.readStringUntil('\n');
  
//Get network password
  Serial.println("Enter Password: ");
  while(Serial.available() == 0){}
  password = Serial.readStringUntil('\n');
  sleep(2);
  
  Serial.print("Connecting to WiFi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
      Serial.print(".");
      delay(500);
  }
  Serial.println("Connected to WiFi!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}


// // Ethernet event callback
void WiFiEvent(WiFiEvent_t event)
{
  switch (event) {
    case ARDUINO_EVENT_ETH_START:
      Serial.println("ETH Started");
      //set eth hostname here
      ETH.setHostname("esp32-ethernet");
      break;
    case ARDUINO_EVENT_ETH_CONNECTED:
      Serial.println("ETH Connected");
      break;
    case ARDUINO_EVENT_ETH_GOT_IP:
      Serial.print("ETH MAC: ");
      Serial.print(ETH.macAddress());
      Serial.print(", IPv4: ");
      Serial.print(ETH.localIP());
      if (ETH.fullDuplex()) {
        Serial.print(", FULL_DUPLEX");
      }
      Serial.print(", ");
      Serial.print(ETH.linkSpeed());
      Serial.println("Mbps");
      eth_connected = true;
      break;
    case ARDUINO_EVENT_ETH_DISCONNECTED:
      Serial.println("ETH Disconnected");
      eth_connected = false;
      break;
    case ARDUINO_EVENT_ETH_STOP:
      Serial.println("ETH Stopped");
      eth_connected = false;
      break;
    default:
      break;
  }
}

void connectAWS() {
    Serial.print("Connecting to AWS IoT...");
    net.setCACert(AWS_CERT_CA);
    net.setCertificate(AWS_CERT_CRT);
    net.setPrivateKey(AWS_CERT_PRIVATE);
    // net.setInsecure();

    client.setServer(mqtt_server, 8883);
    client.setCallback(messageReceived); // Set callback for incoming messages
    
    while (!client.connected()) {
        Serial.print(".");
        if (client.connect("BTHubThing")) {
            Serial.println("Connected to AWS IoT!");
            client.subscribe(sub_topic); // Subscribe to the topic
            Serial.println("Subscribed to topic: " + String(sub_topic));
        } else {
            Serial.print("Failed, rc=");
            Serial.print(client.state());
            Serial.println(" retrying...");
            delay(5000);
        }
    }
}

void publishMessage() {
    if (client.connected()) {
        String message = "{\"device\":\"BTHubThing\",\"status\":\"Connected\"}";
        client.publish(pub_topic, message.c_str());
        Serial.println("Published: " + message);
    }
}

void messageReceived(char* topic, byte* payload, unsigned int length) {
    Serial.print("Message received on topic: ");
    Serial.println(topic);
    Serial.print("Message: ");
   

    String message;
    for (unsigned int i = 0; i < length; i++) {
        message += (char)payload[i];
    }
    
    Serial.println(message);
    json = message;
}


void btconnect() {
  BLEDevice::init(DEVICE_NAME);
  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());
  
  BLEService *pService = pServer->createService(BLEUUID(SPP_SERVICE_UUID));
  pCharacteristic = pService->createCharacteristic(
                    BLEUUID(SPP_CHAR_UUID),
                    BLECharacteristic::PROPERTY_READ |
                    BLECharacteristic::PROPERTY_WRITE |
                    BLECharacteristic::PROPERTY_NOTIFY
                  );
  
  pCharacteristic->setValue("Hello ESP32");
  pService->start();
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(pService->getUUID());
  BLEDevice::startAdvertising();
  Serial.println("BLE Server is running...");  
}



void setup() {
    Serial.begin(115200);
    
    // Attach Ethernet event callback
    WiFi.onEvent(WiFiEvent);
    
    // Start Ethernet
    ETH.begin(0,5,23,18,ETH_PHY_LAN8720,ETH_CLOCK_GPIO17_OUT);

    // Wait for Ethernet connection
    while (!eth_connected) {
        Serial.print(".");
        delay(500);
    }

    Serial.println("Connected to Ethernet!");

    // connectWiFi(); //Wifi mode
    
    // Fetch data from AWS
    connectAWS();
    publishMessage();
    //Enable Bluetooth
    btconnect();
    

    
}


void loop() {
  // if(WiFi.status() != WL_CONNECTED){
  //   connectWiFi(); //WiFi Mode
  // }

  if (!client.connected()) {
        connectAWS(); // Reconnect if disconnected
        publishMessage();
        delay(100);
    }
    client.loop();
    if (json != ""){
      JsonDocument doc;
      deserializeJson(doc, json);

      //Debugging values
      String hex = doc["desired"]["hexcode"];
      String tog = doc["desired"]["toggle"];
      String bright = doc["desired"]["brightness"];
      String bright_dir = doc["desired"]["brightness_direction"];
      String cycle_mode = doc["desired"]["rainbow_toggle"];

      hexcode = hex;
      toggle = (int)doc["desired"]["toggle"];
      brightness = (int)doc["desired"]["brightness"];
      brightness_direction = (int)doc["desired"]["brightness_direction"];
      rainbow_toggle = (int)doc["desired"]["rainbow_toggle"];

      //Print for debugging purposes
      Serial.println(hex);
      Serial.println(tog);
      Serial.println(bright);
      Serial.println(bright_dir);
      Serial.println(cycle_mode);

      
      json = "";
    }

  if (restartServer) {
      Serial.println("Restarting BLE Server...");
      BLEDevice::deinit();
      delay(500);
      btconnect();
      restartServer = false;
  }

  if (deviceConnected) {
      Serial.println("Dimmer Status: Connected");
      sendColorNotification();

      if (rainbow_toggle == 1){
        hue += 5.0;
        if (hue >= 360.0) hue = 0.0;

        // brightness += brightness_direction * 1;
        // if (brightness <= 0 || brightness >= 100) brightness_direction *= -1;
      }

      delay(100);
    }
 
}



