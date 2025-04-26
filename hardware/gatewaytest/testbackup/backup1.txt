
#include <Arduino.h>
#include <WiFi.h>

String ssid = "";
String password = "";

void setup(){
  Serial.begin(115200);
  
}

void loop(){
//Get network name
  Serial.println("Enter Network Name: ");
  while(Serial.available() == 0){}
  ssid = Serial.readStringUntil('\n');
  
//Get network password
  Serial.println("Enter Password: ");
  while(Serial.available() == 0){}
  password = Serial.readStringUntil('\n');
  sleep(2);
//Connect to wifi
  WiFi.begin(ssid, password);
  Serial.println("Connecting");

  while(WiFi.status() != WL_CONNECTED){
    Serial.print(".");
    delay(100);
  }

  Serial.println("\nConnected to the WiFi network");
  while(1) {
    Serial.print("IP: ");
    Serial.println(WiFi.localIP());
    sleep(600);
  }
  
  
}
