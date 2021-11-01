window.onload = iniciar;

function iniciar() {
    document.getElementById("enviar").addEventListener("click", validar, false);
}

function validarDNI() {
    var element = document.getElementById("DNI");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Tienes que introducir un DNI.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "El DNI tiene que tener el formato 99999999Z.");
        }
        //error(element);
        return false;
    }
    return true;
}

function validarTel() {
    var element = document.getElementById("telefono");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Tienes que introducir un telefono.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "El telefono tiene que tener el formato 999 999 999.");
        }
        //error(element);
        return false;
    }
    return true;
}

function validarFecha() {
    var element = document.getElementById("fecha");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Tienes que introducir una fecha.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "La fecha tiene que tener el formato YYYY/mm/dd.");
        }
        return false;
    }
    return true;
}

function validarMatr() {
    var element = document.getElementById("matricula");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Tienes que introducir una matricula.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "La matricula tiene que tener el formato 9999 ZZZ.");
        }
        return false;
    }
    return true;
}

function validarEmail() {
    var element = document.getElementById("email");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Tienes que introducir un email.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "El email tiene que estar correctamente escrito.");
        }
        return false;
    }
    return true;
}

function validarURL() {
    var element = document.getElementById("URL");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Tienes que introducir una URL.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "El URL tiene que estar correctamente escrito.");
        }
        return false;
    }
    return true;
}

function validar(e) {
    borrarError();
    if (validarDNI() && validarTel() && validarFecha() && validarMatr() && validarEmail() && validarURL() && confirm("Confirma si vols enviar el formulari")) {
        return true;
    } else {
        e.preventDefault();
        return false;
    }
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