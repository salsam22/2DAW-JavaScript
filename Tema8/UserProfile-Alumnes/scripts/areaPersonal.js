window.onload = inicio;

function inicio() {
    mostrarNombre();
    mostrarUsuario();
    document.getElementById("enviar").addEventListener("click", validar, false);
}

function mostrarNombre() {
    fetch('https://userprofile.serverred.es/api/areapersonal', {
        method: 'GET',
        headers: {
            'Accept' : 'application/json',
            "auth-token": JSON.parse(localStorage.getItem("TK"))
        }
    })
    .then(response => response.json())
    .then(data => {
        if(data.error == null){
        console.log("FUNCIONA");
        console.log(data)
        let nom = document.getElementById("nom");
        nom.value = data.data.user.name;
        }else{
        console.log("ERROR");
        console.log(data.error);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    })
}

function mostrarUsuario() {
    fetch('https://userprofile.serverred.es/api/areapersonal', {
        method: 'GET',
        headers: {
            'Accept' : 'application/json',
            "auth-token": JSON.parse(localStorage.getItem("TK"))
        }
    })
    .then(response => response.json())
    .then(data => {
        if(data.error == null){
        console.log("FUNCIONA");
        let nom = document.getElementById("user");
        nom.innerHTML = data.data.user.name;
        }else{
        console.log("ERROR");
        console.log(data.error);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function validarPassword() {
    esborrarError();
    var element = document.getElementById("passworda");
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

function validarPasswordNova() {
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
    if (validarPassword() && validarPasswordNova() && validarPasswordc() && confirm("¿Seguro que quieres registrarte?")) {
        actualizarAPI();
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

function actualizarAPI() {
    var newPass = {
        "name": document.getElementById("nom").value,
        "password": document.getElementById("passworda").value,
        "newPassword": document.getElementById("password").value
    }
    console.log(newPass);
    fetch(" https://userprofile.serverred.es/api/areaPersonal", {
        method:"PUT",
        headers: {
            "Content-Type": "application/json",
            'Accept' : 'application/json',
            "auth-token": JSON.parse(localStorage.getItem("TK"))
        },
        body:JSON.stringify(newPass)
    })
        .then(response => response.json())
        .then(data =>{ 
            console.log(data)
            if(data.error==null){
                alert("S'ha actualitzat la contraseña correctament");
            }
        })
        .catch(error=>console.log(error));
}