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
                var btnCerrar = document.createElement("button");
                btnCerrar.setAttribute("class", "btn btn-danger btn-lg p-2");
                btnCerrar.setAttribute("id", element._id);
                btnCerrar.setAttribute("onclick", "cerrarComanda(this)")
                var txt = document.createTextNode("Cerrar");
                btnCerrar.appendChild(txt);
                td1.appendChild(btnCerrar);
                txtSpace = document.createTextNode(" ");
                td1.appendChild(txtSpace)
                var btnTicket = document.createElement("button");
                btnTicket.setAttribute("class", "btn btn-primary btn-lg p-2");
                var txt = document.createTextNode("Ticket");
                btnTicket.appendChild(txt);
                td1.appendChild(btnTicket);
                
                if (element.estado == "Servido") {
                    tr.setAttribute("class", "table-success")
                    btnCerrar.setAttribute("style", "pointer-events:none");
                    btnTicket.setAttribute("style", "pointer-events:none");
                }

                var td2 = document.createElement("td");
                var txt1 = document.createTextNode(element.nombre)
                td2.appendChild(txt1);

                var td3 = document.createElement("td");
                var mesa = "No creada correctament";
                mesasComplete.forEach(mesas => {
                    if (element.mesa == mesas._id) {
                        mesa = mesas.numero;
                    }
                });
                var txt2 = document.createTextNode(mesa)
                td3.appendChild(txt2);

                var td4 = document.createElement("td");
                var txt3 = document.createTextNode(element.comensales)
                td4.appendChild(txt3);

                var td8 = document.createElement("td");
                var txt8 = document.createTextNode(element.estado)
                td8.appendChild(txt8);

                var td5 = document.createElement("td");
                var camarero = "No creat correctament";
                camarerosComplete.forEach(camareros => {
                    if (element.user == camareros._id) {
                        camarero = camareros.name;
                    }
                });
                var txt4 = document.createTextNode(camarero)
                td5.appendChild(txt4);

                var td6 = document.createElement("td");
                var hora = obtenerHora(element.fechaEntrada);
                var txt5 = document.createTextNode(hora)
                td6.appendChild(txt5);

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td8);
                tr.appendChild(td5);
                tr.appendChild(td6);

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

function cerrarComanda(element) {
    $("#myModal").modal("show");
    console.log(comandasActivas);
    for (let i = 0; i < comandasActivas.length; i++) {
        if (comandasActivas[i]._id == element.id) {
            document.getElementById("nombre").innerHTML = "Nombre: " + comandasActivas[i].nombre;
            var mesa = "";
            mesasComplete.forEach(element => {
                if (comandasActivas[i].mesa == element._id) {
                    mesa = element.numero;
                }
            });
            document.getElementById("mesa").innerHTML = "Mesa: " + mesa;
            document.getElementById("comensales").innerHTML = "Comensales: " + comandasActivas[i].comensales;
            var camarero = "No creat correctament";
                camarerosComplete.forEach(camareros => {
                    if (comandasActivas[i].user == camareros._id) {
                        camarero = camareros.name;
                    }
                });
            document.getElementById("camarero").innerHTML = "Camarero: " + camarero;
        }
        
    }
}

function borrarTodo() {
    var files = document.getElementById("files");
    do {
        files.firstChild.remove();
    } while (files.lastChild)
}