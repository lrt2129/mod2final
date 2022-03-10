#include <ArduinoJson.h>


// constants won't change. They're used here to set pin numbers:
const int buttonPin = 26;     // the number of the pushbutton pin of button
const int joyStickHor = 2;  //joystick
const int joyStickVer = 25;  //joystick
int X = 0;  //joystick
int Y = 0;  //joystick


// variables will change:
int buttonState = 0;         // variable for reading the pushbutton status

void setup() {
  Serial.begin(115200); //115200
  // initialize the pushbutton pin as an input:
  pinMode(buttonPin, INPUT_PULLUP);
}

void loop() {
  StaticJsonDocument<2048> doc;
  JsonObject JSONencoder = doc.to<JsonObject>();
  
//  //JOYSTICK
  X = analogRead(joyStickHor); //map(analogRead(joyStickHor), 0, 4095, 0, 100);
  Y = analogRead(joyStickVer); //map(analogRead(joyStickVer), 0, 4095, 100, 0);

  JsonArray joystick = JSONencoder.createNestedArray("joystick");
  joystick.add(X);
  joystick.add(Y);
 
  
  //Serial.print("X:");
  //Serial.print(X);
//  Serial.print("  "); 
//  Serial.print("Y:");
//  Serial.print(Y);
//  Serial.println(" ");
  delay(100); 
//
//  //DIAL
//  //read the input on analog pin 0:
  int sensorValue = analogRead(13);
  int digValue = digitalRead(13);

  JsonArray dial = JSONencoder.createNestedArray("dial");
  dial.add(sensorValue);
  //dial.add(digValue); JUST NOW 
//  // print out the value you read:
//  delay(100);
  
  //BUTTON
  // read the state of the pushbutton value:
  buttonState = digitalRead(buttonPin);
  // check if the pushbutton is pressed. If it is, the buttonState is LOW:
  if (buttonState == HIGH) { 
    //Serial.println(digitalRead(26));  //1
    delay(200); 
  } else if (buttonState == LOW) { 
    //Serial.println(digitalRead(26)); //0
    JSONencoder["button"] = digitalRead(26);
    delay(200);
  }

  
  serializeJson(JSONencoder, Serial);
 // Serial.println(JSONencoder);
}
 
