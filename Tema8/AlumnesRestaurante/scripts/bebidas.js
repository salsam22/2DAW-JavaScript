window.onload = inicio;

function inicio() {
    mostrarUsuario();
    mostrarImg();
    borrarTodo();
    cargarBebidas();
    document.getElementById("newBebida").addEventListener("click", new_mod, false);
    document.getElementById("confirmar").addEventListener("click", validar, false);
    document.getElementById("cancelar").addEventListener("click", cancelar, false);
}

function mostrarUsuario() {
    fetch('https://userprofile.serverred.es/api/areapersonal', {
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

function mostrarImg() {
    fetch("https://userprofile.serverred.es/api/areaPersonal", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": JSON.parse(localStorage.getItem("TK"))
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let avatar = document.getElementById("avatar");

            avatar.setAttribute("src", "https://userprofile.serverred.es/public/img/" + data.data.user.avatar);
        })
        .catch((error) => {
            console.log(error);
        })
}

function cargarBebidas() {
    fetch("https://restaurante.serverred.es/api/bebidas", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": JSON.parse(localStorage.getItem("TK"))
        }
    })
        .then(response => response.json())
        .then(data => {
            data.data.data.forEach(element => {
                var tr = document.createElement("tr");
                var td1 = document.createElement("td");
                var btnBorrar = document.createElement("button");
                btnBorrar.setAttribute("class", "btn btn-primary btn-lg my-3");
                btnBorrar.setAttribute("id", element._id);
                btnBorrar.setAttribute("onclick", "borrarBebida(this)")
                var txt = document.createTextNode("Borrar");
                btnBorrar.appendChild(txt);
                td1.appendChild(btnBorrar);
                var td2 = document.createElement("td");
                var btnModificar = document.createElement("button");
                btnModificar.setAttribute("class", "btn btn-primary btn-lg my-3");
                btnModificar.setAttribute("id", element._id);
                btnModificar.setAttribute("onclick", "new_mod(this)");
                var txt = document.createTextNode("Modificar");
                btnModificar.appendChild(txt);
                td2.appendChild(btnModificar);
                var td3 = document.createElement("td");
                var txt1 = document.createTextNode(element.nombre)
                td3.appendChild(txt1);
                var td4 = document.createElement("td");
                var txt2 = document.createTextNode(element.precio)
                td4.appendChild(txt2);
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                var content = document.getElementById("files");
                content.appendChild(tr);
            })
        }
        )
}

function muestraEdit(id) {
    fetch("https://restaurante.serverred.es/api/bebidas", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "auth-token": JSON.parse(localStorage.getItem("TK"))
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(id);
            data.data.data.forEach(element => {
                if (element._id == id) {
                    console.log(element);
                    document.getElementById("nombre").value = element.nombre;
                    document.getElementById("precio").value = element.precio;
                }
            });
        })
        .catch(error => error2(error, "Error al mostrar la bebida para editarla."));
}

function new_mod_bebida() {
    var id = document.getElementById("_id").value;
    if (id == "undefined") {
        var bebida = {
            nombre: document.getElementById("nombre").value,
            precio: document.getElementById("precio").value
        }
        fetch("https://restaurante.serverred.es/api/bebidas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": JSON.parse(localStorage.getItem("TK"))
            },
            body: JSON.stringify(bebida)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => error2(error, "Error al crear la bebida"));
    } else {
        var bebida = {
            nombre: document.getElementById("nombre").value,
            precio: document.getElementById("precio").value
        }
        fetch("https://restaurante.serverred.es/api/bebidas/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": JSON.parse(localStorage.getItem("TK"))
            },
            body: JSON.stringify(bebida)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => error2(error, "Error al editar la bebida."));
    }
    inicio();
    cancelar();
}

function borrarBebida(elem) {
    fetch("https://restaurante.serverred.es/api/bebidas/" + elem.id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "auth-token": JSON.parse(localStorage.getItem("TK"))
        }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => error2(error, "Error el eliminar la bebida."));
    inicio();

}

function validarNombreBebida() {
    esborrarError();
    var element = document.getElementById("nombre");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Error: El nombre de la bebida es requerido.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "Error: El nombre de la bebida tiene que tener entre 4 y 60 caracteres.");
        }
        return false;
    }
    borrarError();
    return true;
}

function validarPrecio() {
    esborrarError();
    var element = document.getElementById("precio");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Error: El precio de la bebida es requerido.");
        }
        if (element.validity.rangeUnderflow) {
            error2(element, "Error: El precio de la bebida tiene que ser superior a 0.");
        }
        return false;
    }
    borrarError();
    return true;
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

function validar(e) {
    e.preventDefault();
    if (validarNombreBebida() && validarPrecio() && confirm("¿Seguro?")) {
        new_mod_bebida();
        vaciarForm();
        return true;
    } else {
        return false;
    }
}

function cancelar() {
    document.getElementById("formulario").setAttribute("class", "visually-hidden");
}

function new_mod(elem) {
    document.getElementById("_id").setAttribute("value", elem.id);
    if (elem.id != undefined) {
        muestraEdit(elem.id);
    }
    document.getElementById("formulario").setAttribute("class", "visually-visible");
}

function vaciarForm() {
    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
}

function borrarTodo() {
    var files = document.getElementById("files");
    do {
        files.firstChild.remove();
    } while (files.lastChild)
}