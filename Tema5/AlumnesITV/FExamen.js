// inici
window.onload = inici;

function inici() {

    document.getElementById("alc").addEventListener("change", estacionsProvincia, false);
    document.getElementById("vlc").addEventListener("change", estacionsProvincia, false);
    document.getElementById("ctl").addEventListener("change", estacionsProvincia, false);
    document.getElementById("matricula").addEventListener("blur", validarMatricula, false);

    document.getElementById("nom").addEventListener("blur", validarNomCognom, false);
    document.getElementById("telefon").addEventListener("blur", validarTelefono, false);
    document.getElementById("email").addEventListener("blur", validarEmail, false);
    document.getElementById("Enviar").addEventListener("click", validar, false);
}

function estacionsProvincia() {
    var provincia = document.getElementsByName("provincia");
    var select = document.getElementById("estacio");
    eliminarEstacionsAnteriors();
    for (var i = 0; i < estacions.length; i++) {
        if (provincia[i].checked) {
            estacions[i].estacio.forEach((element, index) => {
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
    for (let i = select.options.length; i >= 0; i--) {
        select.remove(i);
    }
}

function validarProvincia() {
    var provincia = document.getElementsByName("provincia");
    for (let i = 0; i < estacions.length; i++) {
        if (provincia[i].checked) {
            return true;
        }
    }
    error2(provincia, "Error: Tienes que seleccionar una provincia.");
}

function validarEstacio() {
    var element = document.getElementById("estacio");
    if (element.value == "Selecciona una opció") {
        error2(element, "Error:Tienes que seleccionar una estación.")
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

function validarData() {
    var today = new Date();
    var dias = 30;
    let fechaMax = new Date();


    fechaMax.setDate(fechaMax.getDate() + dias);

    var element = document.getElementById("date");

    if (!element.checkValidity()) {
        console.log(element.value);
        if (element.validity.valueMissing) {
            error2(element, "Error: La fecha es requerida.");
        }
        return false;
    }

    let fechaEnviada = new Date(element.value);

    if (fechaEnviada < today) {
        error2(element, "Error: La fecha es anterior a la de hoy.");
        return false;
    }
    if (fechaEnviada > fechaMax) {
        error2(element, "Error: La fecha es posterior a la permitida.");
        return false;
    }
    if (fechaEnviada.getDay() == 0) {
        error2(element, "Error: Los domingos no se trabaja.");
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
    if (validarProvincia() && validarMatricula() && validarCombustible() && validarData() && validarNomCognom() && validarTelefono() && validarEmail() && validarCheckBox() && confirm("Seguro que quieres enviar el formulario?")) {
        return true;
    }
    e.preventDefault();
    return false;
}

function error2(element, missatge) {
    document.getElementById("missatgeError").innerHTML = missatge;
    document.location.href = "#miModal";
}
