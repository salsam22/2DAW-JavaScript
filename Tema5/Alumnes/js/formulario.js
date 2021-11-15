window.onload = iniciar;

function iniciar() {
    document.getElementById("nombre").addEventListener("blur", validarNombre, false);
    document.getElementById("email").addEventListener("blur", validarEmail, false);
    document.getElementById("siguiente").addEventListener("click", validar, false);
}

function validarNombre() {
    var element = document.getElementById("nombre");
    if (!element.checkValidity()) {
        if(element.validity.valueMissing) {
            error2(element, "Error: El nombre es requerido.");
        }
        if(element.validity.patternMissmatch) {
            error2(element, "Error: El nombre tiene que tener entre 2 y 60 caracteres i no puede contener caracteres especiales.")
        }
        return false;
    }
    return true;
}

function validarEmail() {
    var element = document.getElementById("email");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Error: El correo electronico es requerido.");
        }
        if (element.validity.patternMissmatch) {
            error2(element, "Error: El correo electronico tiene que seguir el ejemplo proporcionado.");
        }
        return false;
    }
    return true;
}

function validar(e) {
    if (validarNombre() && validarEmail() && confirm("¿Seguro que quieres enviar el formulario?")) {
        return true;
    } else {
        e.preventDefault();
        return false;
    }
}

function error2(element, missatge) {
    document.getElementById("mensajeError").innerHTML = missatge;
    element.className = "text-danger";
    element.focus();
}

function esborrarError() {
    var formulari = document.forms[0];
    for (let i = 0; i < formulari.elements.length; i++) {
        formulari.elements[i].className = "";
    }
}

function borrarError() {
    document.getElementById("mensajeError").innerHTML = "";
}