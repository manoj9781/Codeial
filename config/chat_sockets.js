module.exports.chatSockets = function (socketServer) {
    let io = require('socket.io')(socketServer);

    io.sockets.on('connection', function (socket) {
        console.log('new Connection is established', socket.id);


        socket.on('disconnect', function () {
            console.log('User has been disconnected');
        });

        socket.on('joinRoom', function (data) {
            console.log('Joining Request', data);

            socket.join(data.chatRoom);

            io.in(data.chatRoom).emit('user_joined', data);
        })
    });
}

