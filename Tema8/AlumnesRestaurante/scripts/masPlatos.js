window.onload = inicio;

var arrayPlatos = new Array();
var arrayComanda = JSON.parse(localStorage.getItem("Comanda Seleccionada"));

async function inicio() {
    await cargarArrayPlatos();
    mostrarUsuario();
    mostrarDatosComanda();
    borrarTodoPlatos();
    mostrarBotonesPlatos();
    mostrarPlatos();
    document.getElementById("confirmar").addEventListener("click", subirAPI, false)
}

function reiniciarTable() {
    borrarTodoPlatos();
    mostrarPlatos();
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

async function cargarArrayPlatos() {
    await fetch("https://restaurante.serverred.es/api/platos", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "auth-token": JSON.parse(localStorage.getItem("TK"))
        }
    })
        .then(response => response.json())
        .then(data => {
            arrayPlatos = data.data.data;
        })
        .catch(error => error2(error, "Error al mostrar las bebida para añadirlas."));
}

function mostrarPlatos() {

    arrayComanda.platos.forEach(element => {
        var tr = document.createElement("tr");

        var td1 = document.createElement("td");
        var btnBorrar = document.createElement("button");
        btnBorrar.setAttribute("class", "btn btn-primary btn-lg my-3");
        btnBorrar.setAttribute("id", element._id)
        btnBorrar.setAttribute("onclick", "borrarPlato(this)")
        btnBorrar.setAttribute("type", "button");
        var txt = document.createTextNode("Borrar");
        btnBorrar.appendChild(txt);
        td1.appendChild(btnBorrar);

        var td2 = document.createElement("td");
        var txt1 = document.createTextNode(element.nombre);
        td2.appendChild(txt1);

        var td3 = document.createElement("td");

        var orden = obtenerOrden(element._id);
        var txt2 = document.createTextNode(orden);
        td3.appendChild(txt2);

        var td4 = document.createElement("td");
        var txt3 = document.createTextNode(element.cantidad);
        td4.appendChild(txt3);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        var content = document.getElementById("comPlatos");
        content.appendChild(tr);
    });
}

function obtenerOrden(id) {
    const platoSelec = arrayPlatos.find(element => element._id == id);
    if (platoSelec != undefined) {
        return platoSelec.orden;
    } else {
        return "plato no existe";
    }
}

function mostrarBotonesPlatos() {

    arrayPlatos.forEach(element => {

        if (element.orden == "Primero") {   
            var platos = document.getElementById("platosPrimero");
            
            var div = document.createElement("div");
            div.setAttribute("class", "col");
            
            var input = document.createElement("input");
            input.setAttribute("type", "button");
            input.setAttribute("id", element._id);
            input.setAttribute("class", "mt-2 btn btn-warning p-3");
            input.setAttribute("value", element.nombre);
            input.setAttribute("onclick", "elegirPlato(this)");
            
            div.appendChild(input)
            
            platos.appendChild(div)
        } else if (element.orden == "Segundo") {
            var platos = document.getElementById("platosSegundo");
            
            var div = document.createElement("div");
            div.setAttribute("class", "col");
            
            var input = document.createElement("input");
            input.setAttribute("type", "button");
            input.setAttribute("id", element._id);
            input.setAttribute("class", "mt-2 btn btn-warning p-3");
            input.setAttribute("value", element.nombre);
            input.setAttribute("onclick", "elegirPlato(this)");
            
            div.appendChild(input)
            
            platos.appendChild(div)
        } else if (element.orden == "Postre") {
            var platos = document.getElementById("platosPostre");
            
            var div = document.createElement("div");
            div.setAttribute("class", "col");
            
            var input = document.createElement("input");
            input.setAttribute("type", "button");
            input.setAttribute("id", element._id);
            input.setAttribute("class", "mt-2 btn btn-warning p-3");
            input.setAttribute("value", element.nombre);
            input.setAttribute("onclick", "elegirPlato(this)");
            
            div.appendChild(input)
            
            platos.appendChild(div)
        }
    })
}

function borrarPlato(elem) {
    arrayComanda.platos.forEach((element, index) => {
        if (elem.id == element._id) {
            if (element.estado == "Pendiente") {
                arrayComanda.platos.splice(index, 1);
                reiniciarTable();
            } else if (element.estado == "Servido") {
                alert("No se puede eliminar porque ya esta servido")
            } 
        }
    })
}

function elegirPlato(elem) {
    var validar = false;
    

    arrayComanda.platos.forEach(element => {
        if (elem.id == element._id) {
            element.cantidad = element.cantidad+1;
            validar = true;
            reiniciarTable();
        } 
    })

    if (validar == false) {
        arrayPlatos.forEach(element => {
            if (elem.id == element._id) {
                var plato = {
                    "_id": element._id,
                    "cantidad": 1,
                    "estado": "Pendiente",
                    "orden": element.orden,
                    "nombre": element.nombre,
                    "precio": element.precio
                }
                arrayComanda.platos.push(plato);
                reiniciarTable();
            }
        })
    }
    console.log(arrayComanda);
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

function borrarTodoPlatos() {
    var files = document.getElementById("comPlatos");
    do {
        files.firstChild.remove();
    } while (files.lastChild)
}

function error2(element, missatge) {
    document.getElementById("missatgeError").innerHTML = missatge;
    element.className = "form-control border-danger";
}

function subirAPI(e) {
    e.preventDefault();
    var notas = document.getElementById("notas").value;

    var platos = {
        "platos" : arrayComanda.platos,
        "notas" : notas
    }

    fetch("https://restaurante.serverred.es/api/comandas/platos/" + arrayComanda._id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": JSON.parse(localStorage.getItem("TK"))
            },
            body: JSON.stringify(platos)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
    /*setTimeout(function () {
        window.location.href = "comandas.html";
    }, 500);*/
}