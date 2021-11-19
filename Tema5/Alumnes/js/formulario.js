window.onload = iniciar;
var nombre;
var correo;
var telefono;

function iniciar() {
    localStorage.clear();
    document.getElementById("nombre").addEventListener("blur", validarNombre, false);
    document.getElementById("email").addEventListener("blur", validarEmail, false);
    document.getElementById("telefono").addEventListener("blur", validarTelefono, false);
    document.getElementById("siguiente").addEventListener("click", validar, false);
}

function subirLocalStorage() {
    var ticket = new Array();
    var general = {
        "nom": nombre,
        "correo": correo,
        "telefono": telefono,
        "productos": [],
        "precioTotal": 0
    }
    ticket.push(general);
    localStorage.setItem("Ticket", JSON.stringify(ticket));
}

function validarNombre() {
    esborrarError();
    var element = document.getElementById("nombre");
    if (!element.checkValidity()) {
        if(element.validity.valueMissing) {
            error2(element, "Error: El nombre es requerido.");
        }
        if(element.validity.patternMismatch) {
            error2(element, "Error: El nombre tiene que tener entre 2 y 60 caracteres i no puede contener caracteres especiales.")
        }
        return false;
    }

    nombre = element.value;
    borrarError();
    return true;
}

function validarEmail() {
    esborrarError();
    var element = document.getElementById("email");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Error: El correo electronico es requerido.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "Error: El correo electronico tiene que seguir el ejemplo proporcionado.");
        }
        return false;
    }
    correo = element.value;
    borrarError();
    return true;
}

function validarTelefono() {
    esborrarError();
    var element = document.getElementById("telefono");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Error: El telefono es requerido.")
        }
        if (element.validity.patternMismatch) {
            error2(element, "Error: El telefono tiene que seguir el ejemplo proporcionado. ")
        }
        return false;
    }
    telefono = element.value;
    borrarError();
    return true;
}

function validar(e) {
    if (validarNombre() && validarEmail() && validarTelefono() && confirm("¿Seguro que quieres enviar el formulario?")) {
        subirLocalStorage();
        return true;
    } else {
        e.preventDefault();
        return false;
    }
}

function error2(element, missatge) {
    document.getElementById("mensajeError").innerHTML = missatge;
    element.className = "form-control border-danger";
    element.focus();
}

function esborrarError() {
    var formulari = document.forms[0];
    for (var i = 0; i < formulari.elements.length - 1; i++) {
        formulari.elements[i].className = "form-control";
    }
}

function borrarError() {
    document.getElementById("mensajeError").innerHTML = "";
}