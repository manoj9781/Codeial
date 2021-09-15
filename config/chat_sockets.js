module.exports.chatSockets = function (socketServer) {
    let io = require('socket.io')(socketServer);

    io.sockets.on('connection', function (socket) {
        console.log('new Connection is established', socket.id);
    });
}

