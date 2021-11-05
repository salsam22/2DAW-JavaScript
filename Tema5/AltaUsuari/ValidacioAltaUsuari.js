window.onload = iniciar;
var randSR = Math.floor(Math.random()*2);
var rand1 = Math.floor(Math.random()*10);
var rand2 = Math.floor(Math.random()*10);

function iniciar() {
    mostrarCaptcha();
    document.getElementById("enviar").addEventListener("click",validar,false);
}

function validarNombre() {
    esborrarError();
    var element = document.getElementById("nombre");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Tienes que introducir un nombre.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "El nombre tiene que tener entre 2 y 20 caracteres, sin numeros.");
        }
        return false;
    }
    borrarError();
    return true;
}

function validarApellido() {
    esborrarError();
    var element = document.getElementById("apellido");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Tienes que introducir un apellido.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "El apellido tiene que tener entre 2 y 30 caracteres, sin numeros.");
        }
        return false;
    }
    borrarError();
    return true;
}

function validarDNI() {
    esborrarError();
    var element = document.getElementById("DNI");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Tienes que introduir un DNI.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "El DNI tiene que tener el siguiente formato: 99999999Z.");
        }
        return false;
    }
    borrarError();
    return true;
}

function validarEmail() {
    esborrarError();
    var element = document.getElementById("email");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Tienes que introducir un correo electronico.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "El correo electronico tiene que tener el siguiente formato: example@example.com.");
        }
        return false;
    }
    borrarError();
    return true;
}

function validarEmailRepe() {
    esborrarError();
    var element = document.getElementById("repeEmail");
    
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Tienes que introducir la repeticion del correo electronico.")
        }
        if (element.validity.patternMismatch) {
            error2(element, "La repeticion del correo electronico tiene que tener el siguiente formato: example@example.com. Y ser igual que el correo electronico introducido anteriormente.");
        }
        return false;
    }
    borrarError();
    return true;
}

function validarIgualdadEmail(){
    var nuevo = document.getElementById("repeEmail");
    var original = document.getElementById("email").value;
    if (original == nuevo.value) {
        return true;
    }
    error2(nuevo, "La repeticion del correo electronico no es igual al que has introducido antes.");
    return false;
}


function validarNickname() {
    esborrarError();
    var element = document.getElementById("nickname");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Tienes que introducir un nickname.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "El nickname tiene que tener entre 2 y 8 caracteres sin numeros.");
        }
        return false;
    }
    borrarError();
    return true;
}

function validarPassword() {
    esborrarError();
    var element = document.getElementById("password");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Tienes que introducir una contraseña.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.");
        }
        return false;
    }
    borrarError();
    return true;
}

function validarPasswordRepe() {
    esborrarError();
    var element = document.getElementById("repePassword");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Tienes que introducir la repeticion de la contraseña.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "La repeticion de la contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. Y ser igual que la contraseña anterior.");
        }
        return false;
    }
    borrarError();
    return true;
}

function validarIgualdadPassword(){
    var nuevo = document.getElementById("repePassword");
    var original = document.getElementById("password").value;
    if (original == nuevo.value) {
        return true;
    }
    error2(nuevo, "La repeticion de la contraseña no es igual a la que has introducido antes.");
    return false;
}

function mostrarCaptcha() {
    
    var input = document.getElementById("captcha");
    if (randSR == 0) {
        input.setAttribute("placeholder",rand1+" + "+rand2+" =");
    } else if (randSR == 1) {
        input.setAttribute("placeholder",rand1+" - "+rand2+" =");
    }
}

function validarCaptcha() {
    esborrarError();
    var element = document.getElementById("captcha");
    if (element.validity.valueMissing) {
        error2(element, "Tienes que introducir el captcha.");
        return false;
    } else if (element.validity.patternMismatch) {
            error2(element, "El captcha tienen que ser 1 o 2 numeros positivos o negativos.");
            return false;
    } else if (randSR == 0) {
        if (rand1+rand2 != element.value) {
            error2(element, "El captcha esta mal calculado, calculalo de nuevo.")
            return false;
        }
    } else if (randSR == 1) {
        if (rand1-rand2 != element.value) {
            error2(element, "El captcha esta mal calculado, calculalo de nuevo.")
            return false;
        }
    }
    borrarError();
    return true;
}

function validar(e) {
    esborrarError();
    if (validarNombre() && validarApellido() && validarDNI() && validarEmail() && validarEmailRepe() && validarIgualdadEmail() && validarNickname() && validarPassword() && validarPasswordRepe() && validarIgualdadPassword() && validarCaptcha() && confirm("Seguro que quieres enviar el formulario???")) {
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

function esborrarError() {
    var formulari = document.forms[0];
    for (let i = 0; i < formulari.elements.length; i++) {
        formulari.elements[i].className = "";
    }
}

function borrarError() {
    document.getElementById("missatgeError").innerHTML = "";
}