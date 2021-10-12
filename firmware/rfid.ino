#include <ESP8266WiFi.h> 
#include <PubSubClient.h>
#include <ESP8266mDNS.h>
#include <ArduinoOTA.h>
#include <SPI.h>
#include <MFRC522.h>


#define TOPIC_MQTT "TOPIC"                                  
#define ID_MQTT  "ID"

#define USER_MQTT  "login"
#define PASS_MQTT  "senha" 
                            
#define RST_PIN    D3    
#define SS_PIN     D8   
#define LED        D1


// WIFI
const char* SSID = "SSID";
const char* PASSWORD = "PASSWORD";

// MQTT
const char* BROKER_MQTT = "BROKER";
int BROKER_PORT = 1883;
 
 
WiFiClient espClient;
PubSubClient MQTT(espClient);
MFRC522 mfrc522(SS_PIN, RST_PIN);

 
void initSerial();
void initWiFi();
void initOTA();
void initMQTT();
void reconectWiFi(); 
void mqtt_callback(char* topic, byte* payload, unsigned int length);
void VerificaConexoesWiFIEMQTT(void);
void InitOutput(void);
void sendCardID(String ID);
 

void setup() {
    initSerial();
    initWiFi();
    initOTA();
    initMQTT();
    InitOutput();
    SPI.begin();
    mfrc522.PCD_Init();
}
 

void initSerial() {
    Serial.begin(115200);
}
 

void initWiFi() {
    delay(10);
    Serial.println("------ WI-FI ------");
    Serial.print("Conectando-se na rede: ");
    Serial.println(SSID);
    Serial.println("Aguarde...");
    
    reconectWiFi();
}


void initOTA() {
    Serial.println();
    Serial.println("------ OTA ------");
    
    ArduinoOTA.setHostname("rfid-system");
    ArduinoOTA.setPassword((const char *)"PASSWORD");
    
    ArduinoOTA.onStart([]() {
        Serial.println("Start");
    });
    
    ArduinoOTA.onEnd([]() {
        Serial.println("\nEnd");
    });
    
    ArduinoOTA.onProgress([](unsigned int progress, unsigned int total) {
        Serial.printf("Progress: %u%%\r", (progress / (total / 100)));
    });
    
    ArduinoOTA.onError([](ota_error_t error) {
        Serial.printf("Error[%u]: ", error);
        if (error == OTA_AUTH_ERROR) Serial.println("Auth Failed");
        else if (error == OTA_BEGIN_ERROR) Serial.println("Begin Failed");
        else if (error == OTA_CONNECT_ERROR) Serial.println("Connect Failed");
        else if (error == OTA_RECEIVE_ERROR) Serial.println("Receive Failed");
        else if (error == OTA_END_ERROR) Serial.println("End Failed");
    });
    
    ArduinoOTA.begin();
}
 

void initMQTT(){
    MQTT.setServer(BROKER_MQTT, BROKER_PORT);
    MQTT.setCallback(initMQTTCallback);
}

 
void initMQTTCallback(char* topic, byte* payload, unsigned int length) {
    String msg;
 
    for(int i = 0; i < length; i++) {
        char c = (char)payload[i];
        msg += c;      
    }
}

 
void reconnectMQTT() {
    while (!MQTT.connected()) {
        Serial.print("- Tentando se conectar ao Broker MQTT: ");
        Serial.println(BROKER_MQTT);
        //if (MQTT.connect(ID_MQTT, USER_MQTT,PASS_MQTT)) 
 
        if (MQTT.connect(ID_MQTT)) {
            Serial.println("Conectado com sucesso ao broker MQTT!");
            MQTT.subscribe(TOPIC_MQTT); 
        } else {
            Serial.println("Falha ao reconectar no broker.");
            Serial.println("Realizando nova tentativa de conexao em 2s");
            delay(2000);
        }
    }
}

 
void reconectWiFi() {
    if (WiFi.status() == WL_CONNECTED)
        return;
        
    WiFi.begin(SSID, PASSWORD);
    
    while (WiFi.status() != WL_CONNECTED) {
        delay(100);
        Serial.print(".");
    }
  
    Serial.println();
    Serial.print("Conectado com sucesso na rede: ");
    Serial.print(SSID);
    Serial.println();
    Serial.print("IP obtido: ");
    Serial.print(WiFi.localIP());  
    Serial.println();
    Serial.print("Endereço MAC: ");
    Serial.print(WiFi.macAddress()); 
}

 
void VerificaConexoesWiFIEMQTT(void) {
    if (!MQTT.connected()) 
        reconnectMQTT();
    
    reconectWiFi();
}
 

void InitOutput(void) {
    pinMode(D1, OUTPUT);      
    digitalWrite(D1, HIGH);    
}


void sendCardID(String ID) {
    MQTT.publish(TOPIC_MQTT, (char*) ID.c_str());
    Serial.println("Mensagem enviada com sucesso! Aguarde 2 segundos...");

    delay(2000);
}
 
 
void loop() {   
    ArduinoOTA.handle();
    VerificaConexoesWiFIEMQTT();
    MQTT.loop();
    
    if (!mfrc522.PICC_IsNewCardPresent()) {
        return;
    }

    if ( ! mfrc522.PICC_ReadCardSerial()) {
        return;
    }

    String conteudo = "";
    byte letra;
    
    for (byte i = 0; i < mfrc522.uid.size; i++) {
        conteudo.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
        conteudo.concat(String(mfrc522.uid.uidByte[i], HEX));
    }

    conteudo.toUpperCase();
    sendCardID(conteudo);
}