const io = require('socket.io')(3000);
var turnoA = 0;
var turnoB = 0;

io.on('connection', socket => {
    console.log('Un cliente inicio');
    socket.emit('envioAlCliente', 'Conexion con el server');

    socket.on('enviarALServer', data => {
        if(data.detalle === 'Credioro'){
            turnoB = turnoB + data.turno;
            data.turno = 'B'+turnoB;
        }else{
            turnoA = turnoA + data.turno;
            data.turno = 'A'+turnoA;  
        }
        socket.broadcast.emit('envioAlCliente', data);
        socket.emit('envioDeTurnoCliente', data.turno);
    });
});