
    const socket = io('http://172.30.192.254:3000');
    //Chicos la ip aqui tambien cambia, son la misma ip en ambos archivos
    const noSeUser = document.querySelector('.deficionUsuario');
    const clienteUser = document.querySelector('.usuarioCliente');
    const asesorUser = document.querySelector('.usuarioAsesor');
    const enviarUsuario = document.querySelector('.enviarUsuario');
    const selectUser = document.querySelector('.selectorUsuario');
    
    const infoForm = document.querySelector('.formularioCliente');
    const enviar = document.querySelector('.enviar');
    
    const infoShow = document.querySelector('.informacionCliente');
    

    function definicionUsuario(){
        let usuario = selectUser.value;
    
        if(usuario === 'Cliente'){
            noSeUser.style.display= 'none';
            clienteUser.style.display= 'block';
        }else{
            noSeUser.style.display= 'none';
            asesorUser.style.display= 'block';
        }
    }
    enviarUsuario.addEventListener('click', definicionUsuario);
    
    socket.on('envioAlCliente', data => {
        mostrarDatos(data);
    });
    
    enviar.addEventListener('click', e => {
        console.log('enviando');
        var data = {
            nombre: infoForm.nombre.value,
            cedula: infoForm.cedula.value,
            celular: infoForm.celular.value,
            motivo: infoForm.motivo.value,
        }
    
        socket.emit('enviarALServer', data);
        data = ''; 
    
    })
    
    function mostrarDatos(data) {
        console.log(data);
        if(data.nombre !== undefined){
            const tabla = document.createElement('table');
            const titular1 = document.createElement('th');
            titular1.innerText = 'Nombre';
            const titular2 = document.createElement('th');
            titular2.innerText = 'Cedula';
            const titular3 = document.createElement('th');
            titular3.innerText = 'Celular';
            const titular4 = document.createElement('th');
            titular4.innerText = 'Motivo de visita';
            const fila = document.createElement('tr');
            const casillaNombre = document.createElement('td');
            casillaNombre.innerText = data.nombre;
            const casillaCedula = document.createElement('td');
            casillaCedula.innerText = data.cedula;
            const casillaCelular = document.createElement('td');
            casillaCelular.innerText = data.celular;
            const casillaMotivo = document.createElement('td');
            casillaMotivo.innerText = data.motivo;
        
            tabla.appendChild(titular1);
            tabla.appendChild(titular2);
            tabla.appendChild(titular3);
            tabla.appendChild(titular4);
        
            fila.appendChild(casillaNombre);
            fila.appendChild(casillaCedula);
            fila.appendChild(casillaCelular);
            fila.appendChild(casillaMotivo);
        
            infoShow.appendChild(tabla);
            tabla.appendChild(fila);
        }
    
    }

