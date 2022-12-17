
const express = require("express");
const app = express();
const http = require("http").Server(app);
const { Server } = require("socket.io");
const io = new Server(http, {
  cors: {
    origin: "*",
  },
});

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

function onConnection(socket) {
  socket.on("whiteboard", (data) => socket.broadcast.emit("whiteboard", data));
}

io.on("connection", onConnection);

http.listen(port, () => console.log("listening on port " + port));
