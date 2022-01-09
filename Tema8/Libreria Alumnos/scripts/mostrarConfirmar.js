window.onload = inici;
var diasExtra = 20;
var fechaHoy = new Date();
var año = fechaHoy.getFullYear();
var mes = fechaHoy.getMonth() + 1;
var dia = fechaHoy.getDate();

function inici() {
    mostrarUsuario();
    mostrarLibro();
    mostrarFecha();
    mostrarFechaDev();
    document.getElementById("dataPrestec").addEventListener("change", mostrarFechaDev);
    document.getElementById("btnReservar").addEventListener("click", validar, false);
}

function mostrarUsuario() {
    var input = document.getElementById("usuari");
    var usuario = "";
    if (JSON.parse(localStorage.getItem("Usuario")) != null) {
        usuario = JSON.parse(localStorage.getItem("Usuario"));
    }
    input.setAttribute("value", usuario.nombre);
}

function mostrarLibro() {
    var input = document.getElementById("llibre");
    var libro = "";
    if (JSON.parse(localStorage.getItem("Libro")) != null) {
        libro = JSON.parse(localStorage.getItem("Libro"));
    }
    input.setAttribute("value", libro.titulo);
}

function mostrarFecha() {
    var fecha = document.getElementById("dataPrestec");
    if (mes < 10) {
        mes = "0" + mes;
    }
    if(dia < 10) {
        dia = "0" + dia;
    }
    var fechaActual = año+"-"+mes+"-"+dia;
    fecha.setAttribute("value", fechaActual);
    fecha.setAttribute("max", fechaActual);
}

function mostrarFechaDev() {
    var fechaActual = document.getElementById("dataPrestec").value;
    var fecha = new Date(fechaActual);
    fecha.setDate(fecha.getDate() + diasExtra);

    var añoDev = fecha.getFullYear();
    var mesDev = fecha.getMonth() + 1;
    var diaDev = fecha.getDate();
    if (mesDev < 10) {
        mesDev = "0" + mesDev;
    }
    if(diaDev < 10) {
        diaDev = "0" + diaDev;
    }
    var fechaDevFinal = diaDev+"/"+mesDev+"/"+añoDev;

    var txt = document.createTextNode(fechaDevFinal);
    var element = document.getElementById("dataDevolucio");
    element.replaceChildren(txt);
}

function validarFecha() {
    var fecha = document.getElementById("dataPrestec").value;
    fecha = new Date(fecha);
    var inputFecha = document.getElementById("dataPrestec");
    if(!inputFecha.checkValidity()) {
        if (inputFecha.validity.valueMissing) {
            error2(inputFecha, "Selecciona una data.")
        }
        if (inputFecha.validity.rangeOverflow) {
            error2(inputFecha, "No poses una data superior a la del dia de hui.")
        }
        return false;
    }
    return true;
}

function error2(element, missatge) {
    var error = document.getElementById("missatgeError");
    var errCont = document.createTextNode(missatge);
    error.appendChild(errCont);
    element.className = "error";
    element.focus();
}

function esborrarError() {
    var formulari = document.forms[0];
    for(var i=0; i < formulari.elements.length; i++) {
        formulari.elements[i].className = "";
    }
    var msgError = document.getElementById("missatgeError");
    var contMsgError = document.createTextNode("");
    msgError.replaceChildren(contMsgError);
}

function validar(e) {
    esborrarError();
    e.preventDefault();
    if(validarFecha()){
        enviarReserva();
        return true;
    } else {
        console.log("error");
        return false;
    }
}

function enviarReserva() {
    var fechaHoy = document.getElementById("dataPrestec").value;
    var fechaToday = new Date(fechaHoy);
    var fechaActual = document.getElementById("dataPrestec").value;
    var fechaDev = new Date(fechaActual);
    fechaDev.setDate(fechaDev.getDate() + diasExtra);
    if (JSON.parse(localStorage.getItem("Usuario")) != null) {
        var usuario = JSON.parse(localStorage.getItem("Usuario"));
    }   
    if (JSON.parse(localStorage.getItem("Libro")) != null) {
        var libro = JSON.parse(localStorage.getItem("Libro"));
    }
    var reserva = {
        "usuario": usuario._id,
        "libro": libro._id,
        "fecha": fechaToday,
        "fechaDevolucion": fechaDev
    }

    fetch("https://www.serverred.es/api/reservas", {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(reserva)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error=>console.log(error));
    setTimeout(function () {
        window.location.href = "llistatReserves.html";
    }, 50);
}