import * as mqtt from 'async-mqtt';
import * as express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { MongoClient } from 'mongodb';

interface Account {
    _id: string;
    cardId: string;
    balance: number;
}

const handler = async (topic: string, message: Buffer) => {
    await mongoClient.connect();

    const mongoDatabase = mongoClient.db(process.env.MONGO_DATABASE);
    const mongoCollection = mongoDatabase.collection(process.env.MONGO_COLLECTION);

    const cardId = message.toString().trim();

    console.log(`Received message at topic ${topic}: ${cardId}`);
  
    const query = { cardId };
    const document: Account = await mongoCollection.findOne<Account>(query);

    if(document.balance < 4.05) {
        io.emit('error');
    } else {
        const newBalance = document.balance - 4.05;
        await mongoCollection.updateOne(query, { $set: { balance: newBalance } });
        io.emit('success', newBalance);
    }
}

const mqttClient = mqtt.connect(process.env.MQTT_URL);
const mongoClient = new MongoClient(process.env.MONGO_URL);

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST'], credentials: true } });

server.listen(process.env.PORT, () => console.log(`Started websocket server at port ${process.env.PORT}`));

mqttClient.on('message', handler);
mqttClient.subscribe(process.env.MQTT_TOPIC);