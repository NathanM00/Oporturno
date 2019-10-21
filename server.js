const io = require('socket.io')(3000);

io.on('connection', socket =>{
    console.log('Un cliente inicio');
    socket.emit('envioAlCliente', 'Conexion con el server');

    socket.on('enviarALServer', data =>{
        socket.broadcast.emit('envioAlCliente', data);
    });
    
});