// /*
//     This sketch shows the Ethernet event usage

// */

#include <ETH.h>
#include <ESP32Ping.h>
#include <WiFi.h>

// Replace with your AWS IoT Core endpoint (found in AWS IoT > Settings)
const char* aws_endpoint = "a3f9623llaje2z-ats.iot.us-west-2.amazonaws.com";

bool eth_connected = false;

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


void pingAWS() {
    Serial.print("Pinging AWS Endpoint: ");
    Serial.println(aws_endpoint);

    IPAddress remoteIP;
    if (WiFi.hostByName(aws_endpoint, remoteIP)) {
        Serial.print("Resolved IP: ");
        Serial.println(remoteIP);
        if (Ping.ping(remoteIP)) {
            Serial.println("Ping successful!");
            Serial.print("Ping Time: ");
            Serial.print(Ping.averageTime());
            Serial.println(" ms");
        } else {
            Serial.println("Ping failed!");
        }
    } else {
        Serial.println("Failed to resolve AWS endpoint!");
    }
}

void setup() {
    Serial.begin(115200);
    WiFi.onEvent(WiFiEvent);
    ETH.begin(0,5,23,18,ETH_PHY_LAN8720,ETH_CLOCK_GPIO17_OUT); // Start Ethernet

    while (!eth_connected) {
        Serial.print(".");
        delay(500);
    }

    Serial.println("\nEthernet Connected!");
    delay(2000);

    // Ping AWS IoT Core
    pingAWS();
}

void loop() {
    // Ping AWS every 30 seconds
    delay(30000);
    pingAWS();
}

