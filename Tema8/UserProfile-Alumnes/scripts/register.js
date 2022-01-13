window.onload = inicio;

function inicio() {
    document.getElementById("enviar").addEventListener("click", validar, false);
}

var passwd = "";

function validarNombre() {
    esborrarError();
    var element = document.getElementById("nom");
    if (!element.checkValidity()) {
        if(element.validity.valueMissing) {
            error2(element, "Error: El nombre es requerido.");
        }
        if(element.validity.patternMismatch) {
            error2(element, "Error: El nombre tiene que tener entre 6 y 255 caracteres i no puede contener caracteres especiales.");
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
            error2(element, "Error: El correo electronico es requerido.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "Error: El correo electronico tiene que seguir el ejemplo proporcionado.");
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
            error2(element, "Error: La contraseña es requerida.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "Error: La contraseña tiene que tener mas de 6 caracteres.")
        }
        return false;
    }
    passwd = element.value;
    borrarError();
    return true;
}

function validarPasswordc() {
    esborrarError();
    var element = document.getElementById("passwordc");
    var passwd = document.getElementById("password")
    console.log(passwd.value);
    console.log(element.value);
    if (element.value != passwd.value) {
        error2(element, "Error: La repetición de la contraseña tiene que ser igual que la contraseña introducida anteriormente.")
        return false;
    }
    borrarError();
    return true;
}

function validar(e) {
    e.preventDefault();
    if (validarNombre() && validarEmail() && validarPassword() && validarPasswordc() && confirm("¿Seguro que quieres registrarte?")) {
        subirAPI();
        return true;
    } else {
        return false;
    }
}

function error2(element, missatge) {
    document.getElementById("missatgeError").innerHTML = missatge;
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
    document.getElementById("missatgeError").innerHTML = "";
}

function subirAPI() {
    var usuario = {
        "name": document.getElementById("nom").value,
        "email": document.getElementById("email").value,
        "password": document.getElementById("password").value
    }
    fetch(" https://userprofile.serverred.es/api/register", {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(usuario)
    })
        .then(response => response.json())
        .then(data =>{ console.log(data)
            if(data.error==null){
                alert("S'ha registrat l'usuari");
            }
        }).catch(error=>console.log(error));
}