window.onload = inicio;

var mesasComplete = new Array();
var camarerosComplete = new Array();
var comandasActivas = new Array();
var arrColores = ["table-primary", "table-secondary", "table-success", "table-danger", "table-warning", "table-info", "table-light", "table-dark"];

function inicio() {
    mostrarUsuario();
    borrarTodo();
    mesa();
    reiniciarTable();
}

function reiniciarTable() {
    setInterval(function () {
        borrarTodo();
        mesa();
    }, 5000);
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
    var i = 0;
    fetch("https://restaurante.serverred.es/api/comandas", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": JSON.parse(localStorage.getItem("TK"))
        }
    })
        .then(response => response.json())
        .then(data => {

            data.data.data.forEach((elem, index) => {
                i++
                elem.bebidas.forEach(element => {
                    if (elem.estado != "Servido") {
                        if (element.estado != "Servido") {
                            comandasActivas.push(elem);
                            var tr = document.createElement("tr");
                            if (i == 8) {
                                i = 0;
                            }
                            tr.setAttribute("class", colores(i));

                            var td1 = document.createElement("td");
                            var btnServir = document.createElement("button");
                            btnServir.setAttribute("class", "btn btn-warning btn-lg p-2");
                            btnServir.setAttribute("id", elem._id);
                            btnServir.addEventListener("click", () => { servir(elem._id, element._id) });
                            var txt = document.createTextNode("Servir");
                            btnServir.appendChild(txt);
                            td1.appendChild(btnServir);

                            var td2 = document.createElement("td");
                            var mesa = "No creada correctament";
                            mesasComplete.forEach(mesas => {
                                if (elem.mesa == mesas._id) {
                                    mesa = mesas.numero;
                                }
                            });
                            var txt2 = document.createTextNode(mesa)
                            td2.appendChild(txt2);

                            var td3 = document.createElement("td");
                            var txt3 = document.createTextNode(element.nombre)
                            td3.appendChild(txt3);

                            var td4 = document.createElement("td");
                            var txt4 = document.createTextNode(element.cantidad)
                            td4.appendChild(txt4);

                            var td5 = document.createElement("td");
                            var camarero = "No creat correctament";
                            camarerosComplete.forEach(camareros => {
                                if (elem.user == camareros._id) {
                                    camarero = camareros.name;
                                }
                            });
                            var txt5 = document.createTextNode(camarero)
                            td5.appendChild(txt5);

                            var td6 = document.createElement("td");
                            var hora = obtenerHora(elem.fechaEntrada);
                            var txt6 = document.createTextNode(hora)
                            td6.appendChild(txt6);

                            tr.appendChild(td1);
                            tr.appendChild(td2);
                            tr.appendChild(td3);
                            tr.appendChild(td4);
                            tr.appendChild(td5);
                            tr.appendChild(td6);

                            var content = document.getElementById("files");
                            content.appendChild(tr);

                        }

                    }
                })
            })

        }
        )

}

function servir(idComanda, idBebida) {
    var bebida = {
        "bebida": idBebida
    }
    fetch("https://restaurante.serverred.es/api/comandas/estadobebidas/" + idComanda, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "auth-token": JSON.parse(localStorage.getItem("TK"))
        },
        body: JSON.stringify(bebida)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
}

function obtenerHora(fecha) {
    var date = new Date(fecha);

    var h1 = date.getHours();
    var m1 = date.getMinutes();
    if (h1 < 10) {
        h1 = "0" + h1;
    }
    if (m1 < 10) {
        m1 = "0" + m1;
    }
    var horaComanda = h1 + ":" + m1;

    var dateNow = new Date();

    var h2 = dateNow.getHours();
    var m2 = dateNow.getMinutes();
    if (h2 < 10) {
        h2 = "0" + h2;
    }
    if (m2 < 10) {
        m2 = "0" + m2;
    }
    var horaActual = h2 + ":" + m2;

    inicioMinutos = parseInt(horaComanda.substr(3, 2));
    inicioHoras = parseInt(horaComanda.substr(0, 2));

    finMinutos = parseInt(horaActual.substr(3, 2));
    finHoras = parseInt(horaActual.substr(0, 2));

    transcurridoMinutos = finMinutos - inicioMinutos;
    transcurridoHoras = finHoras - inicioHoras;

    if (transcurridoMinutos < 0) {
        transcurridoHoras--;
        transcurridoMinutos = 60 + transcurridoMinutos;
    }

    horas = transcurridoHoras.toString();
    minutos = transcurridoMinutos.toString();

    if (horas.length < 2) {
        horas = "0" + horas;
    }

    if (minutos.length < 2) {
        minutos = "0" + minutos;
    }

    return horas + ":" + minutos;

}

function colores(i) {
    return arrColores[i]
}

function borrarTodo() {
    var files = document.getElementById("files");
    do {
        files.firstChild.remove();
    } while (files.lastChild)
}