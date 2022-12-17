const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'origin, X-Requested-With,Content-Type,Accept, Authorization'
    );
  
    next();
  });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

    socket.on('start-spin', (users) => {
        spinnerWheel.startSpin(users);
        var user = users[Math.floor(Math.random() * users.length)];
        socket.emit('winner-selected', user);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


server.listen(3000, () => {
    console.log('listening on *:3000');
});
