const io = require('socket.io')(3000);

var turno = 0;

io.on('connection', socket =>{
    console.log('Un cliente inicio');
    socket.emit('envioAlCliente', 'Conexion con el server');

    socket.on('enviarALServer', data =>{
        turno = turno + data.turno;
        data.turno = turno;
        socket.broadcast.emit('envioAlCliente', data);
        socket.emit('envioDeTurnoCliente', data.turno);

    });
    
});