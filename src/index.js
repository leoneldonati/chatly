import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";
import express from "express";
import morgan from "morgan";
import { MongoClient } from "mongodb";

const app = express();
const server = createServer(app);
const io = new Server(server);

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

client
  .connect()
  .then(() => {
    console.log("conectado a bdd");
  })
  .catch((err) => console.error(err));

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  socket.on("notification", (ntf) => {
    console.log(ntf);
  });

  socket.on("message", (msg) => {
    console.log(msg);
  });
});

server.listen(3000);
