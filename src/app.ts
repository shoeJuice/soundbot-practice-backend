import config from "config";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { version } from "../package.json";
import logger from "./utils/logger";
import socket from "./sockets";

const PORT = process.env.PORT;
const HOST = process.env.HOST;
const corsOrigin = config.get<string>("corsOrigin");

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: corsOrigin,
    credentials: true,
    methods: ["GET", "POST"]
  },
});

app.get("/", (_, res) => {
  res.send(`Server is running. \nVersion: ${version}`);
});

// @ts-ignore
server.listen(PORT, HOST, () => {
  logger.info(`Server is running..`);
  socket({ io });
});
