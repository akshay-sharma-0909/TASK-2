// Node server that will handle socket.io connections
const io = require('socket.io')(8000);

const users = {};

io.on('connection', socket => {
    // When a new user joins
    socket.on('new-user-joined', name => {
        console.log("New user", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);  
    });

    // When a message is sent
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });

    // When a user disconnects
    socket.on('disconnect', () => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});

