import config from "config";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { version } from "../package.json";
import logger from "./utils/logger";
import socket from "./sockets";

const port = config.get<string>("port");
const host = config.get<string>("host");
const corsOrigin = config.get<string>("corsOrigin");

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: corsOrigin,
    credentials: true,
    methods: ["GET"],
  },
});

app.get("/", (_, res) => {
    res.send(`Server is running. \nVersion: ${version}`);
}
)

server.listen(port, host, () => {
    logger.info(`Server is running..`);
    socket({ io });
})