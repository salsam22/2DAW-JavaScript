window.onload = iniciar;

function iniciar() {
    document.getElementById("enviar").addEventListener("click", validar, false);
}

function validarDNI() {
    var patternDNI = new RegExp(/^\d{8}[A-Z]{1}$/);
    var element = document.getElementById("DNI");
    if (patternDNI.test(element.value)) {
        return true;
    } else {
        error2(element, "Error: DNI incompleto o invalido.");
        return false;
    }
}

function validarTel() {
    var patternTel = new RegExp(/^\d{3}\s\d{3}\s\d{3}$$/);
    var element = document.getElementById("telefono");
    if (patternTel.test(element.value)) {
        return true;
    } else {
        error2(element, "Error: Telefono incompleto o invalido.");
        return false;
    }
}

function validarFecha() {
    var patternFecha = new RegExp(/^\d{4}\/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])$/);
    var element = document.getElementById("fecha");
    if (patternFecha.test(element.value)) {
        return true;
    } else {
        error2(element, "La fecha tiene que tener el formato YYYY/mm/dd.");
        return false;
    }
}

function validarMatr() {
    var patternMatr = new RegExp(/^\d{4}\s[A-Z]{3}$/);
    var element = document.getElementById("matricula");
    if (patternMatr.test(element.value)) {
        return true;
    } else {
        error2(element, "La matricula tiene que tener el formato 9999 ZZZ.");
        return false;
    }
}

function validarEmail() {
    var patternEmail = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);
    var element = document.getElementById("email");
    if (patternEmail.test(element.value)) {
        return true;
    } else {
        error2(element, "El email tiene que estar correctamente escrito.");
        return false;
    }
}

function validarURL() {
    var patternURL = new RegExp(/^(ftp|http|https)[^ "]+$/);
    var element = document.getElementById("URL");
    if (patternURL.test(element.value)) {
        return true;
    } else {
        error2(element, "El URL tiene que estar correctamente escrito.");
        return false;
    }
}

function validar(e) {
    borrarError();
    if (validarDNI() && validarTel() && validarFecha() && validarMatr() && validarEmail() && validarURL() && confirm("hola")) {
        console.log("hola");
        return true;
    } else {
        e.preventDefault();
        return false;
    } console.log("hola");
}

function error2(element, missatge) {
    document.getElementById("missatgeError").innerHTML = missatge;
    element.className = "error";
    element.focus();
}

function borrarError() {
    var formulari = document = document.forms[0];
    for (let i = 0; i < formulari.elements.length; i++) {
        formulari.elements[i].className = "";
    }
}