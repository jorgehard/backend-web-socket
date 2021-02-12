const http = require("http");
const socket = require("socket.io");

const app = require("./app");

const server = http.createServer(app);

const serverIo = socket(server, {
  cors: true,
});
let messages = [];
//esperando conexao (ouvindo)
serverIo.on("connection", (client) => {
  client.on("join", (name) => {
    console.log(`Joined: ${name}`);
  });
  client.on("sendMessage", (name, message) => {
    messages.push({ name, message });
    serverIo.emit("chat", name, message);
  });
});
server.listen(3333, () => console.log("Server in port 3333"));
