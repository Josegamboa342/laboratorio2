
let filaActual = null; 

function abrirModalModificar(button) {
    filaActual = button.parentElement.parentElement;
    const actividad = filaActual.children[1].innerText;
    const nota = filaActual.children[2].innerText;

    
    document.getElementById('actividad-modificar').value = actividad;
    document.getElementById('nota-modificar').value = nota;

    
    document.getElementById('modal-modificar').style.display = 'block';
}


function cerrarModalModificar() {
    document.getElementById('modal-modificar').style.display = 'none';
    filaActual = null;
    document.getElementById('form-modificar').reset();
}


function abrirModalAgregar() {
    document.getElementById('modal-agregar').style.display = 'block';
}


function cerrarModalAgregar() {
    document.getElementById('modal-agregar').style.display = 'none';
    document.getElementById('form-agregar').reset();
}


document.getElementById('form-modificar').addEventListener('submit', function(event) {
    event.preventDefault(); 

    if (filaActual) {
        const nuevaActividad = document.getElementById('actividad-modificar').value.trim();
        const nuevaNota = document.getElementById('nota-modificar').value.trim();

        
        const notaNumero = parseFloat(nuevaNota);
        if (isNaN(notaNumero) || notaNumero < 0 || notaNumero > 5) {
            alert('La nota debe ser un número entre 0 y 5.');
            return;
        }

        if (nuevaActividad === '') {
            alert('Por favor, completa el campo de actividad.');
            return;
        }

        
        filaActual.children[1].innerText = nuevaActividad;
        filaActual.children[2].innerText = notaNumero;

        
        cerrarModalModificar();

        
        calcularPromedio();
    }
});


document.getElementById('form-agregar').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const actividad = document.getElementById('actividad-agregar').value.trim();
    const nota = document.getElementById('nota-agregar').value.trim();

    
    const notaNumero = parseFloat(nota);
    if (isNaN(notaNumero) || notaNumero < 0 || notaNumero > 5) {
        alert('La nota debe ser un número entre 0 y 5.');
        return;
    }

    if (actividad === '') {
        alert('Por favor, completa el campo de actividad.');
        return;
    }

    
    const tabla = document.getElementById('tabla-actividades').getElementsByTagName('tbody')[0];
    const nuevaFila = tabla.insertRow(tabla.rows.length - 1); 

    
    const celdaAcciones = nuevaFila.insertCell(0);
    const celdaActividad = nuevaFila.insertCell(1);
    const celdaNota = nuevaFila.insertCell(2);

    
    celdaActividad.innerText = actividad;
    celdaNota.innerText = notaNumero;

    
    const botonModificar = document.createElement('button');
    botonModificar.innerText = 'Modificar';
    botonModificar.className = 'btn btn-modificar';
    botonModificar.onclick = function() { abrirModalModificar(this); };

    const botonEliminar = document.createElement('button');
    botonEliminar.innerText = 'Eliminar';
    botonEliminar.className = 'btn btn-eliminar';
    botonEliminar.onclick = function() { eliminarActividad(this); };

    
    celdaAcciones.appendChild(botonModificar);
    celdaAcciones.appendChild(botonEliminar);

  
    cerrarModalAgregar();

    
    calcularPromedio();
});


function eliminarActividad(button) {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar esta actividad y nota?');
    if (confirmacion) {
        const fila = button.parentElement.parentElement;
        fila.remove();
        alert('Actividad eliminada.');

        
        calcularPromedio();
    }
}


function calcularPromedio() {
    const tabla = document.getElementById('tabla-actividades');
    const filas = tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    let suma = 0;
    let conteo = 0;

    for (let i = 0; i < filas.length - 1; i++) { 
        const nota = parseFloat(filas[i].children[2].innerText);
        if (!isNaN(nota)) {
            suma += nota;
            conteo++;
        }
    }

    const promedio = conteo > 0 ? (suma / conteo).toFixed(2) : 0;
    document.getElementById('promedio').innerText = promedio;

    
    const estado = promedio >= 3 ? 'Aprobó' : 'Reprobó';
    document.getElementById('estado').innerText = estado;
}


window.onload = function() {
    calcularPromedio();
}


window.onclick = function(event) {
    const modalModificar = document.getElementById('modal-modificar');
    const modalAgregar = document.getElementById('modal-agregar');
    if (event.target == modalModificar) {
        cerrarModalModificar();
    }
    if (event.target == modalAgregar) {
        cerrarModalAgregar();
    }
}
