const socket = io('http://192.168.106.6:3000');
//Chicos la ip aqui tambien cambia, son la misma ip en ambos archivos

const enviarUsuario = document.querySelector('.enviarUsuario');
const asesorUser = document.querySelector('.usuarioAsesor');
const pantallaUser = document.querySelector('.usuarioPantalla');
const noSeUser = document.querySelector('.deficionUsuario');
const clienteUser = document.querySelector('.usuarioCliente');
const selectUser = document.querySelector('.selectorUsuario');
const splash = document.querySelector('.splash');
const navBar = document.querySelector('.navBar');
const textoNav = document.querySelector('.textoNav');

const turnero1 = document.querySelector('.turno1');

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

const pantallaDocumento = document.querySelector('.pantallaDocumento');
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

const serviciosAdq = document.querySelectorAll('.tituloProdAdq');
const turnoCliente = document.querySelector('.turnoCliente');
const numTurno = document.querySelector('.numTurno');
const turnoMensaje = document.querySelector('.turnoMensaje');

const opcion1 = document.querySelector('.opcion1');
const opcion2 = document.querySelector('.opcion2');
const opcion3 = document.querySelector('.opcion3');

const botonAtras = document.querySelector('.div-back');
const pasarTurnoBtn = document.querySelector('.pasarTurno');
const infoList = document.querySelector('.listaClientes');

const oferta1 = document.querySelector('.opcion1');
const oferta2 = document.querySelector('.opcion2');
const oferta3 = document.querySelector('.opcion3');
const guiaContainer = document.querySelector('.guiaDeVenta');

var usuario;

var numeroDocumento = '';
var tipoDocumento = '';
var tipoTramite = '';
var detalleTramite = '';
var extrasTramite = '';
var statusCliente = {
    24: 'Es un cliente nuevo',
};

var pantallaActual;
var pantallaAnterior;
var cajaCounter = 0;
var clientesArray = [];

//Se define si es cliente o asesor al inicio de la jornada
function definicionUsuario() {
    usuario = selectUser.value;
    if (usuario === 'Cliente') {
        noSeUser.style.display = 'none';
        splash.style.display = 'flex';
        definicionDocumento();
    } else if (usuario === 'Asesor') {
        noSeUser.style.display = 'none';
        //asesorUser.style.display = 'block';
        asesorUser.style.display = 'flex';
        navBar.style.display = 'flex';
        textoNav.innerHTML = 'Clientes';
    } else if (usuario === 'Pantalla') {
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
    botonAtras.style.visibility = 'visible';
    textoNav.innerHTML = 'Ingresa tu Documento';
    splash.style.display = 'none';
    pantallaDocumento.style.display = 'flex';
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
            let valor = tecla[index].value;
            if (valor === 'Cancelar') {
                inputDoc.value = '';
            } else if (valor === 'Corregir') {
                inputDoc.value = inputDoc.value.slice(0, -1);
            } else if (valor === 'Ingresar') {
                pantallaDocumento.style.display = 'none';
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

function irAtras() {
    if (pantallaDocumento.style.display === 'flex') {
        pantallaAnterior = splash;
        pantallaActual = pantallaDocumento;
    } else if (pantallaTramite.style.display === 'flex') {
        pantallaAnterior = pantallaDocumento;
        pantallaActual = pantallaTramite;
        pantallaDoc1.style.display = 'flex';
        pantallaDoc2.style.display = 'flex';
    } else if (pantallaCreditos.style.display === 'flex') {

        if (pantallaCredioro.style.display === 'flex') {
            pantallaAnterior = pantallaCreInde;
            pantallaActual = pantallaCredioro;
        } else {
            pantallaAnterior = pantallaTramite;
            pantallaActual = pantallaCreditos;
        }

    } else if (pantallaSeguros.style.display === 'flex') {
        pantallaSeguros.style.display = 'none';
        pantallaAnterior = pantallaTramite;
        pantallaActual = pantallaSeguros;

    } else if (pantallaDivisas.style.display === 'flex') {
        pantallaAnterior = pantallaTramite;
        pantallaActual = pantallaDivisas;
        pantallaDivisas.style.display = 'none';

    } else if (pantallaGiros.style.display === 'flex') {
        if (pantallaEnvio.style.display === 'flex') {
            pantallaAnterior = pantallaGiroInde;
            pantallaActual = pantallaEnvio;
        } else if (pantallaRecibo.style.display === 'flex') {
            pantallaAnterior = pantallaGiroInde;
            pantallaActual = pantallaRecibo;
        } else {
            pantallaAnterior = pantallaTramite;
            pantallaActual = pantallaGiros;
        }
    }

    pantallaActual.style.display = 'none';
    pantallaAnterior.style.display = 'flex';

}
botonAtras.addEventListener('click', irAtras);

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

    } else if (elTramite === 'Cambio de divisas') {
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
    } else {
        extrasTramite = 'Ningun extra';
        pantallaCredioro.style.display = 'none';
        pantallaCreditos.style.display = 'none';
        enviarDatosCliente();
    }
}

//Todo lo que tiene que ver con el envio de informacion
function enviarDatosCliente() {
    var data = {
        cedula: numeroDocumento,
        tramite: tipoTramite,
        detalle: detalleTramite,
        extras: extrasTramite,
        turno: 1,
        atendiendo: false,
    }
    socket.emit('enviarALServer', data);
    data = '';
}

socket.on('envioAlCliente', arregloClientes => {
    if (arregloClientes[0].cedula !== undefined) {
        clientesArray = arregloClientes;
        mostrarDatos();
        agregarListaClientes();
    }
});

socket.on('envioDeTurnoCliente', turno => {
    darTurno(turno);
});

function darTurno(turno) {
    if (turno !== undefined) {
        pantallaTurno.style.display = 'flex';
        numTurno.innerHTML = turno;
        turnoCliente.innerHTML = 'Tu turno es: ' + turno;
        botonAtras.style.visibility = 'hidden';

        if (tipoTramite === 'Asesoría') {
            turnoMensaje.innerHTML = 'Recuerda que por Teleágil puedes realizar diferentes tipos de consultas sin necesidad de coger un turno. Acércate a él, podría ser más rápido.';
        } else if (tipoTramite === 'Cuenta de ahorros') {
            turnoMensaje.innerHTML = 'Encontraras información útil sobre las cuentas de ahorros en los volantes dentro del cajón #1.';
        } else if (tipoTramite === 'Seguros') {
            turnoMensaje.innerHTML = 'Conoce mas sobre los seguros que Giros y finanzas ofrece para facilitar tu seguridad y la de tu familia, toma un volante del cajón #2.';
        } else if (tipoTramite === 'Créditos') {
            turnoMensaje.innerHTML = 'Infórmate sobre las opciones crediticias que en Giros y Finanzas tenemos para ti, toma un volante del cajón #3';
        } else if (tipoTramite === 'Recaudos') {
            turnoMensaje.innerHTML = 'Recuerda tomar el volante donde se encuentran nuestros convenios para realizar recaudos, lo encontrarás en el cajon #4.';
        }

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function pausa() {
            await sleep(8000);
            splash.style.display = 'flex';
            botonAtras.style.visivility = 'hidden';
            pantallaTurno.style.display = 'none';
            turnoMensaje.innerHTML = '';
            inputDoc.value = '';
            inputCod.value = '';
        }
        pausa();
    }
}

socket.on('envioDeTurnoC', turno => {
    turnero1.innerText = turno;  
});

function mostrarDatos() {
    let dataCliente = clientesArray[0];
    //Cargar el archivo
    $.ajax({
        url: "/dataBaseClientes.csv",
        dataType: "text"
    }).done(successFunction);

    function successFunction(data) {

        let arregloDeLista;
        let dataLinea;
        let servicios = '';

        //Division por saltos de linea
        var datosFila = data.split("\n");
        //Arreglo donde se guarda la nueva información
        var informacion = [];

        for (let index = 0; index < datosFila.length; index++) {
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
                    statusCliente[24] = 'Es un cliente antiguo';
                    for (let index = 13; index < 24; index++) {
                        if (infoDB[index] === 'si') {
                            servicios = informacion[0][index] + '\n';
                        }
                    }
                }
                if (statusCliente[24] === 'Es un cliente antiguo') {
                    ventanillaNombre.innerText = statusCliente[2];
                    clientesArray[clientesArray.length - 1].nombre = statusCliente[2];
                    console.log('aaaa');
                } else {
                    ventanillaNombre.innerText = 'Cliente Nuevo';
                }
            }
            //Recomendaciones 
            serviciosAdq.innerText = servicios;
            if (dataCliente.tramite === 'Giros' && dataCliente.detalle === 'Recibo') {
                textoRecomendacion.innerText = "Pago seguro";
                textoRecomendacion2.innerText = "Repatriación";
                if (statusCliente[13] > 2) {
                    textoRecomendacion3.innerText = "Cuenta de ahorro";
                } else {
                    textoRecomendacion3.innerText = "";
                }
            } else if (dataCliente.tramite === 'Divisas' || (dataCliente.tramite === 'Giros' && dataCliente.detalle === 'Envío')) {
                textoRecomendacion.innerText = "Cuenta de ahorro";
                textoRecomendacion2.innerText = "Repatriación";
                textoRecomendacion3.innerText = "";
            } else if (dataCliente.tramite === 'Seguros') {
                textoRecomendacion.innerText = "Vida grupo";
                textoRecomendacion2.innerText = "Cuenta de ahorro";
                textoRecomendacion3.innerText = "Vida tranquila";
            } else if (dataCliente.tramite === 'Créditos') {

                if (statusCliente[21] === 'si' || statusCliente[22] === 'si' || statusCliente[23] === 'si') {
                    textoRecomendacion.innerText = "Vida grupo";
                    textoRecomendacion2.innerText = "Cuenta de ahorro";
                } else {
                    textoRecomendacion.innerText = "Credioro";
                    textoRecomendacion2.innerText = "Tarjeta la 14";
                }
                textoRecomendacion3.innerText = "";

            } else if (dataCliente.tramite === 'Repatriación') {
                textoRecomendacion.innerText = "Giros";
                textoRecomendacion2.innerText = "Cuenta de ahorro";
                textoRecomendacion3.innerText = "";
            } else if (dataCliente.tramite === 'Cuenta de ahorro') {
                textoRecomendacion.innerText = "Seguros";
                if (statusCliente[15] > 1000000) {
                    textoRecomendacion2.innerText = "CDT";
                } else {
                    textoRecomendacion2.innerText = "";
                }
                textoRecomendacion3.innerText = "";
            }
        }
    }

    let textoTramite = document.querySelector('.tramiteInfooo');
    let textoDetalle = document.querySelector('.detalleInfo');
    let textoExtra = document.querySelector('.extraInfo');
    let textoCedula = document.querySelector('.cedulaInfo');

    let textoRecomendacion = document.querySelector('.recomendacion1');
    let textoRecomendacion2 = document.querySelector('.recomendacion2');
    let textoRecomendacion3 = document.querySelector('.recomendacion3');

    let ventanillaTurno = document.querySelector('.clienteVentanilla-turno');
    let ventanillaNombre = document.querySelector('.clienteVentanilla-nombre');
    let ventanillaTramite = document.querySelector('.clienteVentanilla-tramite');

    //los datos del cliente, aqui ven que quieren que se vea o no etc etc


    textoTramite.innerText = dataCliente.tramite;
    textoDetalle.innerText = dataCliente.detalle;
    textoExtra.innerText = "" + dataCliente.extras;
    textoCedula.innerText = 'C.C ' + dataCliente.cedula;

    ventanillaTurno.innerText = dataCliente.turno;
    ventanillaTramite.innerText = dataCliente.tramite;

    let textoTurno = document.createElement('p');
    textoTurno.innerText = "" + dataCliente.turno;

}

function agregarListaClientes() {
    console.log('bbbbbb');
    if (clientesArray.length > 1) {
        let trajetaCliente = document.createElement('div');
        trajetaCliente.className = 'tarjetaCliente';
        let trajetaClienteNombre = document.createElement('p');
        if (clientesArray[clientesArray.length - 1].nombre !== undefined) {
            trajetaClienteNombre.innerText = clientesArray[clientesArray.length - 1].nombre;
        } else {
            trajetaClienteNombre.innerText = 'Cliente nuevo';
        }
        trajetaCliente.appendChild(trajetaClienteNombre);
        infoList.appendChild(trajetaCliente);
    }
}

function generarGuiaDeVenta(event) {
    let objetivo = event.target;
    var oferta;
    if (objetivo.className === 'opcion1 ofertaOpcion') {
        oferta = objetivo.childNodes[7].innerText;
    } else if (objetivo.className === 'textoRecomendacion') {
        oferta = objetivo.innerText;
    } else {
        oferta = objetivo.parentElement.childNodes[7].innerText;
    }

    if (oferta === 'Cuenta de ahorro') {

        guiaContainer.innerText = "Monto mínimo de apertura $100.000.\nRentabilidad diaria. A mayor saldo mayor tasa.\nRetiros exentos del 4x1.000 hasta $9.619.750 mensuales.\nPodrás escoger si tienes tu Cuenta con Tarjeta Débito o sin ella.\nSin cuota de manejo, siempre y cuando no utilices durante el mes tu Tarjeta Débito.\nAbonar tus Giros Western Union sin costo alguno y con disponibilidad inmediata.\nCuenta con el Seguro de Depósitos de Fogafín.";

    } else if (oferta === 'Repatriación') {

        guiaContainer.innerText = "Muerte accidental\nSe indemniza a los beneficiarios designados o de ley.Hasta por el valor acordado previamente, siempre y cuando la causa del fallecimiento esté amparada por la póliza.\nAsistencia de repatriación.\nOfrece la posibilidad de repatriar el cuerpo de un ser querido que viva en el exterior.\nCubre los trámites legales, el traslado del cuerpo de la persona que se encuentra fuera del país y los gastos funerarios en Colombia.\nAhorro: El costo de repatriar un cuerpo a Colombia está alrededor de los $ 35 millones de pesos, puedes ahorratelo con nuestro seguro.\nCobertura: Repatriación desde cualquier parte del mundo **.Cobertura de gastos para imprevistos por $800.000 en caso de muerte del designado de repatriación.\nEl asegurado principal en Colombia podrá tener hasta 20 asegurados agregados.";

    } else if (oferta === 'Pago seguro') {

        guiaContainer.innerText = "Amparos básicos\nIncluye las siguientes coberturas por consecuencia del hurto calificado del dinero y / o divisas correspondiente a operaciones de Giros Internacionales y Cuenta de Ahorros: \nPor hurto: \nEl dinero que quede bajo este seguro quedará protegido hasta por 3 horas después de haber realizado el retiro.\nPara iniciar el trámite de reclamación debes: \nPresentar la denuncia ante la Fiscalía dentro de las siguientes 24 horas de ocurrido el evento\nDentro de los tres(3) días siguientes debes dar aviso en la oficina de Giros y Finanzas C.F.S.A.donde realizaste el retiro afectado en el hurto.\nPor muerte accidental\nSe indemniza a los beneficiarios designados o de ley\nHasta por el valor acordado previamente(valor asegurado máximo de $ 5.000.000), siempre y cuando la causa del fallecimiento esté amparada por la póliza.\nPérdida de documentos personales\nEn el evento que el asegurado como consecuencia del hurto calificado pierda además los documentos personales como la licencia de conducción, cédula de ciudadanía o libreta militar, se indemnizará con el monto de $50.000.\nReposición de bolso y / o billetera\nEn el evento que el asegurado pierda su bolso y / o billetera en el hurto se reconocerá un valor de hasta $50.000 para la reposición de estos elementos.";

    } else if (oferta === 'Credioro') {
        guiaContainer.innerText = "Análisis y respuesta inmediata.\nDesembolso del crédito al instante y en efectivo.*\nTasa de interés competitiva frente a las líneas que ofrece el mercado.\nNo requiere experiencia crediticia.\nAsignación de cupo de crédito rotativo con garantía en joyas de oro.\nPlazo de financiación a 6 meses prorrogables. Puede extender el plazo tanto como lo desee**\nAbono de cuotas extras o prepagos en cualquier momento, sin sanción alguna.\nPóliza de seguro de vida gratis para para el deudor.***\nProducto disponible en algunas oficinas del país, con cobertura en 20 municipios del territorio nacional.";

    } else if (oferta === 'Tarjeta la 14') {
        guiaContainer.innerText = "Avances en efectivo en cajeros automáticos y próximamente en las oficinas de Giros y Finanzas C.F S.A.\nComodidad  para efectuar el pago en cualquier oficina de Giros y Finanzas en todo el país.\nTasas de interés competitivas.\nBeneficios adicionales en promociones.";

    } else if (oferta === 'Vida grupo') {
        guiaContainer.innerText = "Muerte por cualquier causa: ampara al asegurado principal en caso de cualquier causa de muerte* incluye homicidio y suicidio desde el primer día de la vigencia.\nIncapacidad total y permanente: protege al asegurado en caso de una incapacidad total y permanente por accidente o por enfermedad, siempre y cuando el evento generador se produzca dentro de la vigencia de la póliza.\nEnfermedades graves: se indemnizara hasta el 50% del valor asegurado como anexo en caso de que se diagnostique alguna de las enfermedades graves amparadas por la póliza.\nRentas por hospitalización: se pagara al asegurado principal  un valor diario por su estadía centro hospitalario siempre y cuando este sea mayor a 24 horas.\nAuxilio canasta: se pagara un dinero para gastos al asegurado principal en caso de incapacidad total y permanente o a su familia en caso de muerte.\nAuxilio funerario: se indemnizara a la familia con un dinero para las honras fúnebres del asegurado principal. ";

    } else if (oferta === 'Vida tranquila') {
        guiaContainer.innerText = "";

    } else if (oferta === 'Giros') {
        guiaContainer.innerText = "Te ofrecemos el servicio de Abono Directo a Cuenta Bancaria, como una forma fácil, rápida y segura de reclamar tus giros. Sin salir de tu casa y sin costos adicionales, puedes solicitar el abono del giro a tu Cuenta de Ahorros de Giros y Finanzas o de cualquier entidad, llamando a nuestra Línea de Servicio al Cliente:";

    } else if (oferta === 'CDT') {

        guiaContainer.innerText = "Excelente rentabilidad.\nDiferentes plazos, a partir de 30 días.\nServicio de prórroga automática.\nNegociable en la Bolsa de Valores de Colombia y endosable a solicitud del titular.\nCuenta con el Seguro de Depósitos de Fogafín";

    }
}
oferta1.addEventListener('click', generarGuiaDeVenta);
oferta2.addEventListener('click', generarGuiaDeVenta);
oferta3.addEventListener('click', generarGuiaDeVenta);

function pasarTurno() {
    clientesArray.shift();
    socket.emit('enviarClientesServer', clientesArray);
    infoList.removeChild(infoList.lastChild);
    if (clientesArray.length > 0) {
        mostrarDatos();
        socket.emit('envioDeTurno', 'aaa');
    }
}
pasarTurnoBtn.addEventListener('click', pasarTurno);
