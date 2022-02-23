window.onload = inicio;

function inicio() {
    document.getElementById("enviar").addEventListener("click", validar, false);
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

function validar(e) {
    e.preventDefault();
    if (validarEmail() && validarPassword() && confirm("¿Seguro que quieres registrarte?")) {
        loginAPI();
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

function loginAPI() {
    var usuario = {
        "email": document.getElementById("email").value,
        "password": document.getElementById("password").value
    }
    fetch("https://news.serverred.es/api/login", {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(usuario)
    })
        .then(response => response.json())
        .then(data =>{ 
            var token = data.data.token;
            localStorage.setItem("TK", JSON.stringify(token));
            window.location.href = "areaPersonal.html";
        })
        .catch(error=>console.log(error));
}