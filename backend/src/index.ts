import * as mqtt from 'async-mqtt';
import * as express from 'express';
import { Server } from 'socket.io';
import * as monk from 'monk';
import { createServer } from 'http';

interface Account {
    card_id: string;
    balance: number;
}

const handler = async (topic: string, message: Buffer) => {
    const card_id = message.toString().trim();

    console.log(`Received message at topic ${topic}: ${card_id}`);

    console.log(mongoCollection);
  
    const { balance }: Account = await mongoCollection.findOne({ _id: "616b012cd1423d06480b4a42"});

    console.log(balance)

    
    if(balance < 4.05) {
        io.emit('error');
    } else {
        const newBalance = balance - 4.05;
        await mongoCollection.update({ card_id }, { $set: { balance: newBalance } });

        
        io.emit('success', newBalance);
    }
}

const mqttClient = mqtt.connect(process.env.MQTT_URL);

const mongoClient = monk.default(process.env.MONGO_URL);
const mongoCollection = mongoClient.get(process.env.MONGO_COLLECTION);

const app = express();
const server = createServer(app);
const io = new Server(server);

server.listen(process.env.PORT, () => console.log(`Started websocket server at port ${process.env.PORT}`));

mqttClient.on('message', handler);
mqttClient.subscribe(process.env.MQTT_TOPIC);