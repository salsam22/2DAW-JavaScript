window.onload = inicio;

var mesasComplete = new Array();
var camarerosComplete = new Array();

function inicio() {
    mostrarUsuario();
    borrarTodo();
    mesa();
    //document.getElementById("newMesa").addEventListener("click", new_mod, false);
    //document.getElementById("confirmar").addEventListener("click", validar, false);
    //document.getElementById("cancelar").addEventListener("click", cancelar, false);
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
            console.log(mesasComplete);
            console.log(camarerosComplete);
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
            console.log(data);
            data.data.data.forEach((element, index) => {
                var tr = document.createElement("tr");

                var td1 = document.createElement("td");
                var btnBebidas = document.createElement("button");
                btnBebidas.setAttribute("class", "btn btn-info btn-lg p-2");
                btnBebidas.setAttribute("onclick", "crearBebidas()")
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

                var td3 = document.createElement("td");
                var txt1 = document.createTextNode(element.nombre)
                td3.appendChild(txt1);

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
                var txt5 = document.createTextNode(element.fechaEntrada)
                td7.appendChild(txt5);

                tr.appendChild(td1);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tr.appendChild(td6);
                tr.appendChild(td7);

                var content = document.getElementById("files");
                content.appendChild(tr);
            })
        }
        )
}

function crearBebidas() {
    window.location.assign("comandasAddBebidas.html");
}

function borrarTodo() {
    var files = document.getElementById("files");
    do {
        files.firstChild.remove();
    } while (files.lastChild)
}