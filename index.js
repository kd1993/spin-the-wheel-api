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
  socket.on('start-spin', (users) => {
    spinnerWheel.startSpin(users);
      var user = users[Math.floor(Math.random() * users.length)];
     socket.emit('winner-selected', user);
   });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
}

io.on("connection", onConnection);

http.listen(port, () => console.log("listening on port " + port));