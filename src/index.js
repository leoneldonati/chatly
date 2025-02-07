import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";
import { MongoClient } from "mongodb";
import express from "express";
import morgan from "morgan";
import { port } from "./config.js";


const app = express();
const server = createServer(app);
const io = new Server(server);
const __dirname = dirname(fileURLToPath(import.meta.url));

const url = `mongodb+srv://leonelroman:${process.env.DB_PASS}@cluster0.fo3dmlm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = await new MongoClient(url).connect();

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

server.listen(port, () => console.log({
  server: {
    message: 'servidor levantado',
    port
  },
  db: {
    dbName: client.db('we-chat').databaseName
  },
  url: import.meta.url
}));
