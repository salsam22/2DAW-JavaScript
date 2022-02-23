window.onload = inicio;

function inicio() {
    mostrarUsuario();
    mostrarCategorias();
    validarToken();
    document.getElementById("btnGravar").addEventListener("click", validar, false);
}

function validarToken() {
    var token = JSON.parse(localStorage.getItem("TK"))

    if (token == null) {
        window.location.href = "login.html";
    }
}

function mostrarCategorias() {
    fetch("https://news.serverred.es/api/categories", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            borrarTodo();
            data.resultado.forEach(element => {
                var li = document.createElement("li");
                li.innerText = element.name;
                li.setAttribute("class", "list-group-item")

                var ul = document.getElementById("listCategory")
                ul.appendChild(li);
            });
        })
}

function validarNombre() {
    esborrarError();
    var element = document.getElementById("nom");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Error: El nombre es requerido.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "Error: El nombre es demasiado corto o demasiado largo o tiene numeros y caracteres extraños.");
        }
        return false;
    }
    borrarError();
    return true;
}

function validar(e) {
    e.preventDefault();
    if (validarNombre()) {
        grabar();
        return true;
    } else {
        return false;
    }
}

function grabar() {
    var nombre = document.getElementById("nom").value;

    var nombrePath = {
        'name': nombre,
        'path': nombre
    }

    fetch("https://news.serverred.es/api/categories", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token": JSON.parse(localStorage.getItem("TK"))
        },
        body: JSON.stringify(nombrePath)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            mostrarCategorias();
        })
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

function borrarTodo() {
    var files = document.getElementById("listCategory");
    do {
        files.firstChild.remove();
    } while (files.lastChild);
}

function mostrarUsuario() {
    fetch('https://news.serverred.es/api/areapersonal', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            "auth-token": JSON.parse(localStorage.getItem("TK"))
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.error == null) {
                console.log("FUNCIONA");
                let nom = document.getElementById("user");
                nom.innerHTML = data.data.user.name;
            } else {
                console.log("ERROR");
                console.log(data.error);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        })
}