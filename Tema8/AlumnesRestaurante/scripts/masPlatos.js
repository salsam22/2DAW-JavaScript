window.onload = inicio;

var arrayPlatos = new Array();
var arrayComanda = JSON.parse(localStorage.getItem("Comanda Seleccionada"));

function inicio() {
    mostrarUsuario();
    mostrarDatosComanda();
    borrarTodoPlatos();
    mostrarPlatosBotones();
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

function mostrarPlatosBotones() {
    fetch("https://restaurante.serverred.es/api/platos", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "auth-token": JSON.parse(localStorage.getItem("TK"))
        }
    })
        .then(response => response.json())
        .then(data => {
            data.data.data.forEach(element => {
                arrayPlatos.push(element);
                console.log(arrayPlatos);
            });
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
        btnBorrar.setAttribute("onclick", "borrarBebida(this)")
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
    console.log("fga");
    console.log(arrayPlatos);
    arrayPlatos.forEach(element => {
        console.log(element);
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