// inici
window.onload = inici;

function inici() {
    document.getElementById("alc").addEventListener("change", estacionsProvincia, false);
    document.getElementById("vlc").addEventListener("change", estacionsProvincia, false);
    document.getElementById("ctl").addEventListener("change", estacionsProvincia, false);
    document.getElementById("matricula").addEventListener("blur", validarMatricula, false);
    document.getElementById("nom").addEventListener("blur", validarNomCognom, false);
    document.getElementById("telefon").addEventListener("blur", validarTelefono, false);
    document.getElementById("Enviar").addEventListener("click", validar, false);
}

function estacionsProvincia() {
    var provincia = document.getElementsByName("provincia");
    var select = document.getElementById("estacio");
    eliminarEstacionsAnteriors();
    for (var i = 0; i < 3; i++) {
        if(provincia[i].checked) {
            estacions[i].estacio.forEach((element,index) => {
                var option = document.createElement("option");
                option.setAttribute("value", index);
                var txtOption = document.createTextNode(element);
                option.appendChild(txtOption);
                select.appendChild(option);
            });
        }
    }
}

function eliminarEstacionsAnteriors() {
    var select = document.getElementById("estacio");
    for(let i = select.options.length; i>= 0; i--) {
        select.remove(i);
    }
}

function validarProvincia() {
    var element = document.getElementById("estacio");
    if (element.value == "Selecciona una opció") {
        error2(element, "Error:Tienes que seleccionar una provincia y una estación.")
        return false;
    }
    return true;
}

function validarMatricula() {
    var element = document.getElementById("matricula");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Error: La matricula es requerida.");
        } 
        if (element.validity.patternMismatch) {
            error2(element, "Error: No sigue el patron indicado.")
        }
        return false;
    }
    return true;
}

function validarCombustible() {
    var element = document.getElementById("conbustible");
    if (element.value == "Selecciona una opció") {
        error2(element, "Error: Tienes que seleccionar un tipo de combustible.");
        return false;
    }
    return true;
}

function validarNomCognom() {
    var element = document.getElementById("nom");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Error: Tienes que introducir un nombre y apellido.")
        }
        if (element.validity.patternMismatch) {
            error2(element, "Error: El nombre solo puede contener letras.")
        }
        return false;
    }
    return true;
}

function validarTelefono() {
    var element = document.getElementById("telefon");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Error: Tienes que introducir un numero de telefono.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "Error: El numero de telefono tiene que tener el formato 999 999 999.");
        }
        return false;
    }
    return true;
}

function validarEmail() {
    var element = document.getElementById("email");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Error: Tienes que introducir un email.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "Error: El correu electronic tiene que tener el formato ejemplo@ejemplo.com.")
        }
        return false;
    }
    return true;
}

function validarCheckBox() {
    var element = document.querySelector("input[id='protecioDades']:checked");
    if (!element) {
        error2(element, "Debes aceptar los Términos y condiciones.");
        return false;
    }
    return true;
}

function validar(e) {
    if (validarProvincia() && validarMatricula() && validarCombustible() && validarNomCognom() && validarTelefono() && validarEmail() && validarCheckBox() && confirm("Seguro que quieres enviar el formulario?")) {
        return true;
    }
    e.preventDefault();
    return false;
}

function error2(element, missatge) {
    document.getElementById("missatgeError").innerHTML = missatge;
    document.location.href="#miModal";
}
