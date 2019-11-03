const socket = io('http://192.168.1.10:3000');
//Chicos la ip aqui tambien cambia, son la misma ip en ambos archivos

const enviarUsuario = document.querySelector('.enviarUsuario');
const asesorUser = document.querySelector('.usuarioAsesor');
const pantallaUser= document.querySelector('.usuarioPantalla');
const noSeUser = document.querySelector('.deficionUsuario');
const clienteUser = document.querySelector('.usuarioCliente');
const selectUser = document.querySelector('.selectorUsuario');
const splash = document.querySelector('.splash');
const navBar = document.querySelector('.navBar');
const textoNav = document.querySelector('.textoNav');
const turnero = document.querySelector('.turnero');

const infoForm = document.querySelector('.formularioCliente');

const inputDoc = document.querySelector('.inputDoc');
const doc = document.querySelectorAll('.doc');
const tecla = document.querySelectorAll('.tecla');

const tramite = document.querySelectorAll('.tramite');

const giro = document.querySelectorAll('.giro');
const credito = document.querySelectorAll('.credito');
const divisa = document.querySelectorAll('.divisa');
const seguro = document.querySelectorAll('.seguro');
const pais = document.querySelectorAll('.pais');
const credioro = document.querySelectorAll('.credioro');

const teclaCod = document.querySelectorAll('.teclaCodigo');
const inputCod = document.querySelector('.inputCod');

const pantallaDoc1 = document.querySelector('.tecladoDoc');
const pantallaDoc2 = document.querySelector('.botonesDoc');
const pantallaTramite = document.querySelector('.tramites');
const pantallaGiros = document.querySelector('.giros');
const pantallaGiroInde = document.querySelector('.girosIndefinido');
const pantallaCreInde = document.querySelector('.creditosIndefinido');
const pantallaCredioro = document.querySelector('.creditosCredioro');
const pantallaEnvio = document.querySelector('.girosEnvio');
const pantallaRecibo = document.querySelector('.girosRecibo');
const pantallaDivisas = document.querySelector('.divisas');
const pantallaSeguros = document.querySelector('.seguros');
const pantallaCreditos = document.querySelector('.creditos');
const pantallaTurno = document.querySelector('.turno');

const turnoCliente = document.querySelector('.turnoCliente');
const turnoMensaje = document.querySelector('.turnoMensaje');

var usuario;

var numeroDocumento = '';
var tipoDocumento = '';
var tipoTramite = '';
var detalleTramite = '';
var extrasTramite = '';
var statusCliente = {
    status: 'Es un cliente nuevo',
};

//Se define si es cliente o asesor al inicio de la jornada
function definicionUsuario() {
    usuario = selectUser.value;
    if (usuario === 'Cliente') {
        console.log(usuario);
        noSeUser.style.display = 'none';
        splash.style.display = 'flex';
        definicionDocumento();
    } else if (usuario === 'Asesor'){
        console.log(usuario);
        noSeUser.style.display = 'none';
        asesorUser.style.display = 'block';
        navBar.style.display = 'flex';
        textoNav.innerHTML = 'Clientes';
    } else if (usuario === 'Pantalla'){
        console.log(usuario);
        noSeUser.style.display = 'none';
        pantallaUser.style.display = 'block';
        navBar.style.display = 'flex';
        textoNav.innerHTML = 'Turnos';
    }
}
enviarUsuario.addEventListener('click', definicionUsuario);

//Se quita el splash al hacerle click siendo el cliente
function quitarSplash() {
    pantallaTurno.style.display = 'none';
    textoNav.innerHTML = 'Ingresar Documento';
    splash.style.display = 'none';
    pantallaDoc1.style.display = 'flex';
    pantallaDoc2.style.display = 'flex';
    clienteUser.style.display = 'flex';
    infoForm.style.display = 'flex';
    navBar.style.display = 'flex';
}
splash.addEventListener('click', quitarSplash);

//Todo lo que tiene que ver la parte del documento
function definicionDocumento() {
    // Se define el numero del documento
    for (let index = 0; index < tecla.length; index++) {
        tecla[index].addEventListener('click', () => {
            console.log('tecla');
            let valor = tecla[index].value;
            if (valor === 'Cancelar') {
                inputDoc.value = '';
            } else if (valor === 'Corregir') {
                inputDoc.value = inputDoc.value.slice(0, -1);
            } else if (valor === 'Ingresar') {
                pantallaDoc1.style.display = 'none';
                pantallaDoc2.style.display = 'none';
                pantallaTramite.style.display = 'flex';
                numeroDocumento = inputDoc.value;
            } else {
                inputDoc.value += valor;
            }
        });
    }

    //Se define el tipo de documento a utilizar
    for (let index = 0; index < doc.length; index++) {
        doc[index].addEventListener('click', () => {
            tipoDocumento = doc[index].value;
        });
    }

    //Se define el tipo de tramite a realizar
    for (let index = 0; index < tramite.length; index++) {
        tramite[index].addEventListener('click', () => {
            tipoTramite = tramite[index].value;
            definicionTramite(tipoTramite);
        });
    }

}

//Todo lo que tiene que ver con la parte del tramite
function definicionTramite(elTramite) {
    pantallaTramite.style.display = 'none';

    if (elTramite === 'Giros') {
        pantallaGiros.style.display = 'flex';
        pantallaGiroInde.style.display = 'flex';

        //Se define el tipo de giro a realizar
        for (let index = 0; index < giro.length; index++) {
            giro[index].addEventListener('click', () => {
                detalleTramite = giro[index].value;
                pantallaGiroInde.style.display = 'none';
                extrasGiro(detalleTramite);
            });
        }

    } else if (elTramite === 'Divisas') {
        pantallaDivisas.style.display = 'flex';

        //Se define el tipo de divisa a realizar
        for (let index = 0; index < divisa.length; index++) {
            divisa[index].addEventListener('click', () => {
                detalleTramite = divisa[index].value;
                extrasTramite = 'Ningun extra';
                enviarDatosCliente();
                pantallaDivisas.style.display = 'none';
            });
        }

    } else if (elTramite === 'Seguros') {
        pantallaSeguros.style.display = 'flex';

        //Se define el tipo de seguro a realizar
        for (let index = 0; index < seguro.length; index++) {
            seguro[index].addEventListener('click', () => {
                detalleTramite = seguro[index].value;
                extrasTramite = 'Ningun extra';
                enviarDatosCliente();
                pantallaSeguros.style.display = 'none';
            });
        }

    } else if (elTramite === 'Créditos') {
        pantallaCreditos.style.display = 'flex';
        pantallaCreInde.style.display = 'flex';
        //Se define el tipo de credito a realizar
        for (let index = 0; index < credito.length; index++) {
            credito[index].addEventListener('click', () => {
                detalleTramite = credito[index].value;
                console.log(detalleTramite);
                pantallaCreInde.style.display = 'none';
                extrasCredito(detalleTramite);
            });
        }

    } else {
        detalleTramite = 'Ningun detalle';
        extrasTramite = 'Ningun extra';
        enviarDatosCliente();
    }

}

//Se definen cosas como el codigo o pais del giro
function extrasGiro(tipoGiro) {

    if (tipoGiro == 'Envío') {
        pantallaEnvio.style.display = 'flex';

        //Se define el pais del giro a enviar
        for (let index = 0; index < pais.length; index++) {
            pais[index].addEventListener('click', () => {
                extrasTramite = pais[index].value;
                enviarDatosCliente();
                pantallaEnvio.style.display = 'none';
                pantallaGiros.style.display = 'none';
            });
        }
    } else if (tipoGiro == 'Recibo') {
        pantallaRecibo.style.display = 'flex';

        // Se define el codigo del giro
        for (let index = 0; index < teclaCod.length; index++) {
            teclaCod[index].addEventListener('click', () => {

                let valor = teclaCod[index].value;
                if (valor === 'Cancelar') {
                    extrasTramite = '';
                } else if (valor === 'Corregir') {
                    extrasTramite = extrasTramite.slice(0, -1);
                } else if (valor === 'Ingresar') {
                    enviarDatosCliente();
                    pantallaRecibo.style.display = 'none';
                    pantallaGiros.style.display = 'none';
                } else {
                    extrasTramite += valor;
                }
                inputCod.value = extrasTramite;
            });
        }
    }
}


//Se definen cosas como el codigo o pais del giro
function extrasCredito(tipoCredito) {

    if (tipoCredito == 'Credioro') {
        pantallaCredioro.style.display = 'flex';
        //Se define el pais del giro a enviar
        for (let index = 0; index < credioro.length; index++) {
            credioro[index].addEventListener('click', () => {
                extrasTramite = credioro[index].value;
                enviarDatosCliente();
                pantallaCredioro.style.display = 'none';
                pantallaCreditos.style.display = 'none';
            });
        } 
    } else{
        extrasTramite = 'Ningun extra';
        enviarDatosCliente();
    }
}

//Todo lo que tiene que ver con el envio de informacion
socket.on('envioAlCliente', data => {
    if (data.cedula !== undefined) {
        mostrarDatos(data);
        mostrarTurnos(data);
    }
});

function enviarDatosCliente() {
    var data = {
        cedula: numeroDocumento,
        tramite: tipoTramite,
        detalle: detalleTramite,
        extras: extrasTramite,
        turno: 1,
    }
    socket.emit('enviarALServer', data);
    data = '';
}

socket.on('envioDeTurnoCliente', turno => {
    darTurno(turno);
});

function darTurno(turno) {
    if (turno !== undefined) {
        pantallaTurno.style.display = 'flex';
        turnoCliente.innerHTML = 'Tu turno es: ' + turno;
        
        if(tipoTramite === 'Asesoría'){
            turnoMensaje.innerHTML = 'Recuerda que por Teleágil puedes realizar diferentes tipos de consultas sin necesidad de coger un turno. Acércate a él, podría ser más rápido.';
        } else if(tipoTramite === 'Recaudos'){
            turnoMensaje.innerHTML = 'Recuerda tomar el volante donde se encuentran nuestros convenios para realizar recaudos.';
        }
        
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
          }
          
          async function pausa() {
            await sleep(8000);
            console.log('siguiente cliente');
            splash.style.display = 'flex';
            pantallaTurno.style.display = 'none';
            turnoMensaje.innerHTML = '';
            inputDoc.value = '';
            inputCod.value = '';
          }
          pausa();
    }
}

function mostrarDatos(cliente) {

    let dataCliente = cliente;
    //Cargar el archivo
    $.ajax({
        url: "/dataBaseClientes.csv",
        dataType: "text"
    }).done(successFunction);

    function successFunction(data) {

        let arregloDeLista;
        let dataLinea;

        //Division por saltos de linea
        var datosFila = data.split("\n");
        //Arreglo donde se guarda la nueva información
        var informacion = [];

        for (let index = 1; index < datosFila.length; index++) {
            //Lectura de una linea
            dataLinea = datosFila[index];

            //Division por ;
            arregloDeLista = dataLinea.split(";");

            informacion.push(arregloDeLista);
            //determinar si es cliente antiguo
            for (let index = 0; index < informacion.length; index++) {
                let infoDB = informacion[index];
                if (infoDB[1] === dataCliente.cedula) {
                    statusCliente = infoDB;
                    console.log(statusCliente);
                    statusCliente.status = 'Es un cliente antiguo';
                    textoNombre.innerText = statusCliente[2];
                }
            }
            //Recomendaciones a partir de giros
            console.log(statusCliente);
            if (cliente.tramite === 'Giros' && cliente.detalle === 'Recibo') {
                textoRecomendacion.innerText = "Pago seguro";
                textoRecomendacion2.innerText = "Repatriación";
                if (statusCliente[13] > 2) {
                    textoRecomendacion3.innerText = "Cuenta de ahorro";
                } else {
                    textoRecomendacion3.innerText = "";
                }
            } else if (cliente.tramite === 'Divisas' || (cliente.tramite === 'Giros' && cliente.detalle === 'Envío')) {
                textoRecomendacion.innerText = "Cuenta de ahorro";
                textoRecomendacion2.innerText = "Repatriación";
                textoRecomendacion3.innerText = "";
            } else if (cliente.tramite === 'Seguros') {
                textoRecomendacion.innerText = "Vida grupo";
                textoRecomendacion2.innerText = "Cuenta de ahorro";
                textoRecomendacion3.innerText = "Vida tranquila";
            } else if (cliente.tramite === 'Créditos') {

                if (statusCliente[21] === 'si' || statusCliente[22] === 'si' || statusCliente[23] === 'si') {
                    textoRecomendacion.innerText = "Vida grupo";
                    textoRecomendacion2.innerText = "Cuenta de ahorro";
                } else {
                    textoRecomendacion.innerText = "Credioro";
                    textoRecomendacion2.innerText = "Tarjeta la 14";
                }
                textoRecomendacion3.innerText = "";

            } else if (cliente.tramite === 'Repatriación') {
                textoRecomendacion.innerText = "Giros";
                textoRecomendacion2.innerText = "Cuenta de ahorro";
                textoRecomendacion3.innerText = "";
            } else if (cliente.tramite === 'Cuenta de ahorro') {
                textoRecomendacion.innerText = "Seguros";
                if (statusCliente[15] > 1000000) {
                    textoRecomendacion2.innerText = "CDT";
                } else {
                    textoRecomendacion2.innerText = "";
                }
                textoRecomendacion3.innerText = "";
            }
            textoStatus.innerText = "" + statusCliente.status;
            statusCliente.status = 'Es un cliente nuevo';
        }
    }

    let infoCliente = document.querySelector('.informacion');
    let infoRecomen = document.querySelector('.recomendacion');
    let infoList = document.querySelector('.listaClientes');

    //los datos del cliente, aqui ven que quieren que se vea o no etc etc
    let textoCedula = document.createElement('p');
    textoCedula.innerText = cliente.cedula;
    let textoNombre = document.createElement('p');
    let textoTramite = document.createElement('p');
    textoTramite.innerText = cliente.tramite;
    let textoDetalle = document.createElement('p');
    textoDetalle.innerText = cliente.detalle;
    let textoExtra = document.createElement('p');
    textoExtra.innerText = "" + cliente.extras;
    let textoTurno = document.createElement('p');
    textoTurno.innerText = "" + cliente.turno;
    let textoStatus = document.createElement('p');
    let textoRecomendacion = document.createElement('p');
    let textoRecomendacion2 = document.createElement('p');
    let textoRecomendacion3 = document.createElement('p');

    infoCliente.appendChild(textoCedula);
    infoCliente.appendChild(textoTramite);
    infoCliente.appendChild(textoDetalle);
    infoCliente.appendChild(textoExtra);
    infoCliente.appendChild(textoStatus);

    let trajetaCliente = document.createElement('div');
    trajetaCliente.className = 'tarjetaCliente';
    trajetaCliente.appendChild(textoNombre);
    trajetaCliente.appendChild(textoTramite);

    infoList.appendChild(trajetaCliente);
    infoRecomen.appendChild(textoRecomendacion);
    infoRecomen.appendChild(textoRecomendacion2);
    infoRecomen.appendChild(textoRecomendacion3);

}

function mostrarTurnos(cliente){
    let turno = document.createElement('p');
    turno.innerText = cliente.turno;

    turnero.appendChild(turno);
}