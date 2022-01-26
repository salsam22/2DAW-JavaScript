window.onload = inicio;

var mesasComplete = new Array();
var camarerosComplete = new Array();
var comandasActivas = new Array();

function inicio() {
    mostrarUsuario();
    borrarTodo();
    mesa();
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

function mesa() {
    fetch("https://restaurante.serverred.es/api/mesas", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": JSON.parse(localStorage.getItem("TK"))
        }
    })
        .then(response => response.json())
        .then(data => {
            data.data.data.forEach(element => {
                mesasComplete.push(element)
            });
            camarero();
        })
        .catch((error) => {
            console.log(error);
        })
}

function camarero() {
    fetch("https://restaurante.serverred.es/api/camareros", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": JSON.parse(localStorage.getItem("TK"))
        }
    })
        .then(response => response.json())
        .then(data => {
            data.data.data.forEach(element => {
                camarerosComplete.push(element)
            });
            cargarComandas();
            
        })
        .catch((error) => {
            console.log(error);
        })
}

function cargarComandas() {
    fetch("https://restaurante.serverred.es/api/comandas", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": JSON.parse(localStorage.getItem("TK"))
        }
    })
        .then(response => response.json())
        .then(data => {
            data.data.data.forEach(element => {
                comandasActivas.push(element);
                var tr = document.createElement("tr");

                var td1 = document.createElement("td");
                var btnBebidas = document.createElement("button");
                btnBebidas.setAttribute("class", "btn btn-info btn-lg p-2");
                btnBebidas.setAttribute("id", element._id);
                btnBebidas.setAttribute("onclick", "crearBebidas(this)")
                var iBebidas = document.createElement("i");
                iBebidas.setAttribute("class", "fas fa-plus");
                btnBebidas.appendChild(iBebidas);
                var txt = document.createTextNode("Bebidas");
                btnBebidas.appendChild(txt);
                td1.appendChild(btnBebidas);
                txtSpace = document.createTextNode(" ");
                td1.appendChild(txtSpace)
                var btnPlatos = document.createElement("button");
                btnPlatos.setAttribute("class", "btn btn-warning btn-lg p-2");
                var iPlatos = document.createElement("i");
                iPlatos.setAttribute("class", "fas fa-plus");
                btnPlatos.appendChild(iPlatos);
                var txt = document.createTextNode("Platos");
                btnPlatos.appendChild(txt);
                td1.appendChild(btnPlatos);

                var td2 = document.createElement("td");
                var txt1 = document.createTextNode(element.nombre)
                td2.appendChild(txt1);

                var td4 = document.createElement("td");
                var mesa = "No creada correctament";
                mesasComplete.forEach(mesas => {
                    if (element.mesa == mesas._id) {
                        mesa = mesas.numero;
                    }
                });
                var txt2 = document.createTextNode(mesa)
                td4.appendChild(txt2);

                var td5 = document.createElement("td");
                var txt3 = document.createTextNode(element.comensales)
                td5.appendChild(txt3);

                var td6 = document.createElement("td");
                var camarero = "No creat correctament";
                camarerosComplete.forEach(camareros => {
                    if (element.user == camareros._id) {
                        camarero = camareros.name;
                    }
                });
                var txt4 = document.createTextNode(camarero)
                td6.appendChild(txt4);

                var td7 = document.createElement("td");
                var hora = obtenerHora(element.fechaEntrada);
                var txt5 = document.createTextNode(hora)
                td7.appendChild(txt5);

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tr.appendChild(td6);
                tr.appendChild(td7);

                var content = document.getElementById("files");
                content.appendChild(tr);
            })
            console.log(mesasComplete);
            console.log(camarerosComplete);
            console.log(comandasActivas);
        }
        )
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

function crearBebidas(button) {
    for (let i = 0; i < comandasActivas.length; i++) {
        if (button.id == comandasActivas[i]._id) {
            var comandaSeleccionada = comandasActivas[i];
            camarerosComplete.forEach(element => {
                if (element._id == comandaSeleccionada.user) {
                    comandaSeleccionada.user = element.name;
                }
            });
            mesasComplete.forEach(element => {
                if (element._id == comandaSeleccionada.mesa) {
                    comandaSeleccionada.mesa = element.numero;
                }
            });
            localStorage.setItem("Comanda Seleccionada", JSON.stringify(comandaSeleccionada));
            window.location.assign("comandasAddBebidas.html");
        }
    }
}

function borrarTodo() {
    var files = document.getElementById("files");
    do {
        files.firstChild.remove();
    } while (files.lastChild)
}