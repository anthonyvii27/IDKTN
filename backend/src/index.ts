import * as mqtt from 'async-mqtt';
import * as express from 'express';
import { Server } from 'socket.io';
import * as monk from 'monk';
import { createServer } from 'http';

interface Account {
    id: string;
    balance: number;
}

const handler = async (topic: string, message: Buffer) => {
    const id = message.toString();
    
    console.log(`Received message at topic ${topic}: ${id}`);
    
    const { balance }: Account = await mongoCollection.findOne({ id });
    
    if(balance < 4.05) {
        io.emit('error');
    } else {
        const newBalance = balance - 4.05;
        await mongoCollection.update({ id }, { $set: { balance: newBalance } });
        
        io.emit('success', balance);
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