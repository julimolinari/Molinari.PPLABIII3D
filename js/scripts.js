import crearTabla from "./tabla.js";
import agregarManejadorTR from "./tabla.js";
import Anuncio from "./anuncio.js";
import Anuncio_Auto from "./Anuncio_Auto.js";


let listaAnuncio;
let frmAnuncio;
let proximoId;
let divTabla;
let btnEliminar = document.getElementById('btnEliminar');
let btnCancelar = document.getElementById('btnCancelar');
let btnAltaMod = document.getElementById('btnAltaModif');

btnEliminar.hidden = true;
btnCancelar.hidden = true;

window.addEventListener('load', incializarManejadores);



export default function cargarFormulario() {

    listaAnuncio.forEach(element => {
        if (element.id == JSON.parse(localStorage.getItem('idSeleccionado'))) {
            document.getElementById('txtTitulo').value = element.titulo;

            if (element.transaccion == "Venta") {
                document.getElementById("rdoV").checked = true;
            } else {
                document.getElementById("rdoA").checked = true;
            }
            document.getElementById('txtDescripcion').value = element.descripcion;
            document.getElementById('txtDescripcion').value = element.descripcion;
            document.getElementById('txtPrecio').value = element.precio;
            document.getElementById('num_puertas').value = element.num_puertas;
            document.getElementById('num_kms').value = element.num_KMs;
            document.getElementById('num_potencia').value = element.potencia;
                
            
        }
    });

    btnAltaMod.textContent = 'Modificar';
    btnEliminar.hidden = false;
    btnCancelar.hidden = false;

}

btnEliminar.addEventListener('click', function (e) {
    var r = confirm("Eliminar?");
    if(r == true){
    for (let index = 0; index < listaAnuncio.length; index++) {
        const element = listaAnuncio[index];
        if(JSON.parse(localStorage.getItem('idSeleccionado')) == element.id){
            listaAnuncio.splice(index,1);
        }
    }}else{
        limpiarDatosForm();
    }
    


});



function incializarManejadores() {
    listaAnuncio = obtenerAnuncio();
    proximoId = obtenerId();

    console.log(proximoId);
    divTabla = document.getElementById("divTabla");

    actualizarLista();

    frmAnuncio = document.forms[0];
    frmAnuncio.addEventListener('submit', e => {
      
        e.preventDefault();
        if (btnAltaMod.textContent == 'Modificar') {

            listaAnuncio.forEach(element => {
                if (element.id == JSON.parse(localStorage.getItem('idSeleccionado'))) {
                    element.titulo = frmAnuncio.titulo.value;
                    element.descripcion = frmAnuncio.descripcion.value;
                    element.precio = frmAnuncio.precio.value;
                    element.transaccion = frmAnuncio.trans.value;
                    element.num_puertas = frmAnuncio.num_puertas.value;
                    element.num_KMs = frmAnuncio.num_kms.value;
                    element.potencia = frmAnuncio.num_potencia.value;
                    
                }
            });
            limpiarDatosForm();
            guardarDatos();
            actualizarLista();

        } else {

            const nuevoAnuncio = obtenerAnuncios();
            if (nuevoAnuncio) {
                listaAnuncio.push(nuevoAnuncio);
                proximoId++;
                guardarDatos();
                localStorage.setItem('nextId', proximoId);
                actualizarLista();
                limpiarDatosForm();
            }
        }        

    });
}

function obtenerAnuncios() {


    const nuevoAnuncio = new Anuncio_Auto(proximoId, frmAnuncio.titulo.value, frmAnuncio.trans.value, frmAnuncio.descripcion.value,
        frmAnuncio.precio.value,frmAnuncio.num_puertas.value,frmAnuncio.num_kms.value,frmAnuncio.num_potencia.value);

    return nuevoAnuncio;
}


function guardarDatos() {
    localStorage.setItem('gente', JSON.stringify(listaAnuncio));
}



function obtenerAnuncio() {
    return JSON.parse(localStorage.getItem('gente')) || [];

}



function obtenerId() {
    return JSON.parse(localStorage.getItem('nextId')) || 0;

}



function actualizarLista() {
    divTabla.innerHTML = "";
    document.getElementById("divTabla").innerHTML='<img src="../images/6.gif" alt="cargando...">'

    setTimeout(() => {

        divTabla.innerHTML = "";
        divTabla.appendChild(crearTabla(listaAnuncio));
        
    }, 700);
    
}


function limpiarDatosForm() {    
    document.getElementById('txtTitulo').value = "";
    document.getElementById('txtDescripcion').value = "";
    document.getElementById('txtPrecio').value = "";
    document.getElementById('num_puertas').value = "";
    document.getElementById('num_kms').value = "";
    document.getElementById('num_potencia').value = "";
    btnAltaMod.textContent = 'Guardar';
    btnEliminar.hidden = true;
    btnCancelar.hidden = true;

}


btnCancelar.addEventListener('click',e=>{
    limpiarDatosForm();
})


