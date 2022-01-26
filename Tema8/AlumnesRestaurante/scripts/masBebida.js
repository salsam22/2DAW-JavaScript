window.onload = inicio;

var arrayBebidas = new Array();
var arrayComanda = JSON.parse(localStorage.getItem("Comanda Seleccionada"));

function inicio() {
    mostrarUsuario();
    mostrarDatosComanda();
    borrarTodoBebidas();
    borrarTodoBotones();
    mostrarBebidasBotones();
    mostrarBebidas();
    document.getElementById("confirmar").addEventListener("click", subirAPI, false)
}

function reiniciarTable() {
    borrarTodoBebidas();
    mostrarBebidas();
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
                let nom = document.getElementById("user");
                nom.innerHTML = data.data.user.name;
            } else {
                console.log(data.error);
            }
            let avatar = document.getElementById("avatar");
            avatar.setAttribute("src", "https://userprofile.serverred.es/public/img/" + data.data.user.avatar);
        })
        .catch((error) => {
            console.log(error);
        })
}

function mostrarDatosComanda() {

    var nombre = document.createTextNode(arrayComanda.nombre);
    document.getElementById("nombre").appendChild(nombre);

    var comensales = document.createTextNode(arrayComanda.comensales);
    document.getElementById("comensales").appendChild(comensales);

    var mesa = document.createTextNode(arrayComanda.mesa);
    document.getElementById("mesa").appendChild(mesa);

    var camarero = document.createTextNode(arrayComanda.user);
    document.getElementById("camarero").appendChild(camarero);

    var hora = obtenerHora(arrayComanda.fechaEntrada);
    hora = document.createTextNode(hora);
    document.getElementById("fechaEntrada").appendChild(hora);
}

function mostrarBebidas() {
    arrayComanda.bebidas.forEach(element => {

        var tr = document.createElement("tr");

        var td1 = document.createElement("td");
        var btnBorrar = document.createElement("button");
        btnBorrar.setAttribute("class", "btn btn-primary btn-lg my-3");
        btnBorrar.setAttribute("id", element._id)
        btnBorrar.setAttribute("onclick", "borrarBebida(this)")
        btnBorrar.setAttribute("type", "button");
        var txt = document.createTextNode("Borrar");
        btnBorrar.appendChild(txt);
        td1.appendChild(btnBorrar);

        var td2 = document.createElement("td");
        var txt1 = document.createTextNode(element.nombre);
        td2.appendChild(txt1);

        var td3 = document.createElement("td");
        var txt2 = document.createTextNode(element.cantidad);
        td3.appendChild(txt2);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        var content = document.getElementById("comBebidas");
        content.appendChild(tr);
    });
}

function mostrarBebidasBotones() {
    fetch("https://restaurante.serverred.es/api/bebidas", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "auth-token": JSON.parse(localStorage.getItem("TK"))
        }
    })
        .then(response => response.json())
        .then(data => {
            data.data.data.forEach(element => {
                arrayBebidas.push(element)

                var bebidas = document.getElementById("bebidas");

                var div = document.createElement("div");
                div.setAttribute("class", "col");

                var input = document.createElement("input");
                input.setAttribute("type", "button");
                input.setAttribute("id", element._id);
                input.setAttribute("class", "mt-2 btn btn-info p-3");
                input.setAttribute("value", element.nombre);
                input.setAttribute("onclick", "añadirBebidaArray(this)");

                div.appendChild(input)

                bebidas.appendChild(div)
            });
        })
        .catch(error => error2(error, "Error al mostrar las bebida para añadirlas."));
}

function añadirBebidaArray(elem) {
    console.log(elem.id);
    console.log(arrayBebidas);
    console.log(arrayComanda.bebidas);

    var validar = false;

    arrayComanda.bebidas.forEach(element => {
        if (elem.id == element._id) {
            element.cantidad = element.cantidad+1;
            validar = true;
            reiniciarTable();
        } 
    })

    if (validar == false) {
        arrayBebidas.forEach(element => {
            if (elem.id == element._id) {
                var bebida = {
                    "_id": element._id,
                    "cantidad": 1,
                    "estado": "Pendiente",
                    "nombre": element.nombre,
                    "precio": element.precio
                }
                arrayComanda.bebidas.push(bebida);
                reiniciarTable();
            }
        })
    }
}

function borrarBebida(elem) {
    arrayComanda.bebidas.forEach((element, index) => {
        if (elem.id == element._id) {
            if (element.estado == "Pendiente") {
                arrayComanda.bebidas.splice(index, 1);
                reiniciarTable();
            } else if (element.estado == "Servido") {
                alert("No se puede eliminar porque ya esta servido");
            } 
        }
    });
}

function obtenerHora(fecha) {
    var date = new Date(fecha);
    var horas = date.getHours();
    var minutos = date.getMinutes();
    if (horas < 10) {
        horas = "0" + horas;
    }
    if (minutos < 10) {
        minutos = "0" + minutos;
    }
    var hora = horas + ":" + minutos;
    return hora;
}

function error2(element, missatge) {
    document.getElementById("missatgeError").innerHTML = missatge;
    element.className = "form-control border-danger";
}

function borrarTodoBebidas() {
    var files = document.getElementById("comBebidas");
    do {
        files.firstChild.remove();
    } while (files.lastChild)
}

function borrarTodoBotones() {
    var files = document.getElementById("bebidas");
    do {
        files.firstChild.remove();
    } while (files.lastChild)
}

function subirAPI(e) {
    e.preventDefault();
    var notas = document.getElementById("notas").value;

    var bebidas = {
        "bebidas" : arrayComanda.bebidas,
        "notas" : notas
    }

    fetch("https://restaurante.serverred.es/api/comandas/bebidas/" + arrayComanda._id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": JSON.parse(localStorage.getItem("TK"))
            },
            body: JSON.stringify(bebidas)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
    setTimeout(function () {
        window.location.href = "comandas.html";
    }, 500);
}