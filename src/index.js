import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";
import { MongoClient } from "mongodb";
import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
config();
const app = express();
const server = createServer(app);
const io = new Server(server);
const __dirname = dirname(fileURLToPath(import.meta.url));

const url = `mongodb+srv://leonelroman:${process.env.DB_PASS}@cluster0.fo3dmlm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(url);

const db = await client.db("we-chat");


io.on("connection", (socket) => {
  socket.on("notification", (ntf) => {
    console.log(ntf);
  });

  socket.on("message", (msg) => {
    console.log(msg);
  });
});

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

server.listen(3000);
