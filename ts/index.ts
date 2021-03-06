import * as Discord from "discord.js";
import * as dotenv from "dotenv";
import * as mysql from "mysql2/promise";
import axiospkg from "axios";
import * as fs from "fs";
import axiosretry from "axios-retry";
import * as server from "./util/server.js";
import * as tsMessage from "./util/message.js"

dotenv.config();

const client = new Discord.Client();

const database = await mysql.createPool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    host: process.env.DATABASE_IP,
    port: parseInt(process.env.DATABASE_PORT),
    database: "mailmarine"
});

const axios = axiospkg.create({
    baseURL: "https://discord.com/api/v9",
    headers: {
        Authorization: `Bot ${process.env.TOKEN}`
    }
});

axiosretry(axios, {
    retries: 3,
    retryDelay: ((retries, err): number => {
        // todo: this
        switch (err.code) {
            case "429": {
                return err.response.data.retry_after * 1000;
            }
            default: {
                return 300;
            }
        }
    })
});

globalThis.axios = axios;
globalThis.db = database;

globalThis.cacheTime = parseInt(process.env.CACHE) || 10800000;

globalThis.readFile = (file) => {
    return fs.readFileSync(file).toString();
};

client.once("ready", () => {
    console.log("Ready");
});

client.on("message", async (message) => {
    // check if message is inside the allotted chat
    try {
        // message inside the inter server chat
        if (message.channel.id != await server.getChannel(message.guild.id)) {
            tsMessage.createOriginMessage(message).then(() => console.log("New message sent. Id: " + message.id));
            return;
        }
    }
});

client.login(process.env.TOKEN);