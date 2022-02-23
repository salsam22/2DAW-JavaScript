window.onload = inicio;

function inicio() {
    mostrarUsuario();
    mostrarCategorias();
    validarToken();
    document.getElementById("crearArticulo").addEventListener("click", validar, false);
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

            data.resultado.forEach(element => {
                var option = document.createElement("option");
                option.innerText = element.name;
                option.setAttribute("value", element.name);

                var ul = document.getElementById("categories")
                ul.appendChild(option);
            });
        })
}

function validarTitulo() {
    esborrarError();
    var element = document.getElementById("title");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Error: El titulo es requerido.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "Error: El titulo es demasiado corto o tiene numeros y caracteres extraños.");
        }
        return false;
    }
    borrarError();
    return true;
}

function validarAutor() {
    esborrarError();
    var element = document.getElementById("author");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Error: El autor es requerido.");
        }
        return false;
    }
    borrarError();
    return true;
}

function validarBody() {
    esborrarError();
    var element = document.getElementById("body");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Error: El cuerpo es requerido.");
        }
        if (element.value.length < 20) {
            error2(element, "Error: El cuerpo tiene que tener mas de 20 caracteres");
        }
        return false;
    }
    borrarError();
    return true;
}

function validar(e) {
    e.preventDefault();
    if (validarTitulo() && validarAutor() && validarBody()) {
        grabar();
        return true;
    } else {
        return false;
    }
}

function grabar() {
    var title = document.getElementById("title").value;
    var author = document.getElementById("author").value;
    var body = document.getElementById("body").value;
    var category = document.getElementById("categories").value;

    var articulo = {
        'title': title,
        'body': body,
        'author': author,
        'voteScore': 1,
        'category': category
    }

    fetch("https://news.serverred.es/api/articles", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token": JSON.parse(localStorage.getItem("TK"))
        },
        body: JSON.stringify(articulo)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            window.location.href = "index.html";
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
    var files = document.getElementById("categories");
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