const io = require('socket.io')(3000);
var turnoA = 0;
var turnoB = 0;
var arreglo = [];
var turnoPantalla=[]; 

io.on('connection', socket => {
    console.log('Un cliente inicio');
    socket.emit('envioAlCliente', 'Conexion con el server');

    socket.on('enviarClientesServer', clientesArray =>{
        arreglo=clientesArray;
    });

    socket.on('enviarALServer', data => {
        if(data.detalle === 'Credioro'){
            turnoB = turnoB + data.turno;
            data.turno = 'B'+turnoB;
        }else{
            turnoA = turnoA + data.turno;
            data.turno = 'A'+turnoA;  
        }
        arreglo.push(data);
        turnoPantalla.push(data.turno);
        console.log(turnoPantalla[0]);
        socket.broadcast.emit('envioAlCliente', arreglo);
        socket.emit('envioDeTurnoCliente', data.turno);
        socket.broadcast.emit('envioDeTurnoC', turnoPantalla[0] );
    });

    socket.on('envioDeTurno', turno => {
        turnoPantalla.shift();
        socket.broadcast.emit('envioDeTurnoC', turnoPantalla[0] );
    });
});