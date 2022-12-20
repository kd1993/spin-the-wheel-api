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
  socket.on('start-spin', (userId, users, conferenceId) => {
    console.info('Start spin event received', userId, users, conferenceId);
    // send the event for all the users.
    socket.broadcast.emit('spin-started', userId, conferenceId);
  });

  socket.on('winner-picked', (userId, user, conferenceId) => {
    console.info('============');
    console.info('the winner', user);
    socket.broadcast.emit('winner-selected', userId, user, conferenceId);
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
}

io.on("connection", onConnection);

http.listen(port, () => console.log("listening on port " + port));