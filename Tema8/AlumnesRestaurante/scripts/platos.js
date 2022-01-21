window.onload = inicio;

function inicio() {
    mostrarUsuario();
    mostrarImg();
    borrarTodo();
    cargarPlatos();
    document.getElementById("newPlato").addEventListener("click", new_mod, false);
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

function cargarPlatos() {
    fetch("https://restaurante.serverred.es/api/platos", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": JSON.parse(localStorage.getItem("TK"))
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.data.data.forEach((element, index) => {
                var tr = document.createElement("tr");
                var td1 = document.createElement("td");
                var btnBorrar = document.createElement("button");
                btnBorrar.setAttribute("class", "btn btn-primary btn-lg my-3");
                btnBorrar.setAttribute("id", element._id);
                btnBorrar.setAttribute("onclick", "borrarPlatos(this)")
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
                var txt2 = document.createTextNode(element.orden)
                td4.appendChild(txt2);
                var td5 = document.createElement("td");
                var txt3 = document.createTextNode(element.precio)
                td5.appendChild(txt3);
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                var content = document.getElementById("files");
                content.appendChild(tr);
            })
        }
        )
}

function muestraEdit(id) {
    fetch("https://restaurante.serverred.es/api/platos", {
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
                    document.getElementById("orden").value = element.orden;
                    document.getElementById("precio").value = element.precio;
                }
            });
        })
        .catch(error => console.log(error));
}

function new_mod_plato() {
    var id = document.getElementById("_id").value;
    if (id == "undefined") {
        var plato = {
            nombre: document.getElementById("nombre").value,
            orden: document.getElementById("orden").value,
            precio: document.getElementById("precio").value
        }
        fetch("https://restaurante.serverred.es/api/platos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": JSON.parse(localStorage.getItem("TK"))
            },
            body: JSON.stringify(plato)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
    } else {
        var plato = {
            nombre: document.getElementById("nombre").value,
            orden: document.getElementById("orden").value,
            precio: document.getElementById("precio").value
        }
        fetch("https://restaurante.serverred.es/api/platos/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": JSON.parse(localStorage.getItem("TK"))
            },
            body: JSON.stringify(plato)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
    }
    inicio();
    cancelar();
}

function borrarPlatos(elem) {
    fetch("https://restaurante.serverred.es/api/platos/" + elem.id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "auth-token": JSON.parse(localStorage.getItem("TK"))
        }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
    inicio();
}

function validarNombrePlato() {
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

function validarOrdenPlato() {
    esborrarError();
    var element = document.getElementById("orden");
    if (element.value == "Selecciona Orden") {
        error2(element, "Error: No has seleccionado ninguna orden.")
        return false;
    }
    return true;
}

function validarPrecioPlato() {
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
    if (validarNombrePlato() && validarOrdenPlato() && validarPrecioPlato() && confirm("¿Seguro?")) {
        new_mod_plato();
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
    document.getElementById("orden").value = "Selecciona Orden";
    document.getElementById("precio").value = "";
}

function borrarTodo() {
    var files = document.getElementById("files");
    do {
        files.firstChild.remove();
    } while (files.lastChild)
}