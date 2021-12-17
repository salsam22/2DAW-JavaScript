window.onload = inici;

function inici() {
    document.getElementById("btnGravar").addEventListener("click", gravar);
}

function validarNom() {
    esborrarError();
    var element = document.getElementById("nom");
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

function validarAny() {

}

function gravar() {

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