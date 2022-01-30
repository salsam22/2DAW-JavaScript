window.onload = iniciar;

var arrayPlatosCompleto = new Array();
var arrayPlatosFinal = new Array();
var arrayBebidasCompleto = new Array();
var arrayBebidasFinal = new Array();
var arrayNuevaComanda = {
    "nombre": "",
    "comensales": "",
    "estado": "Pendiente",
    "mesa": "",
    "bebidas": [],
    "platos": []
};

function iniciar() {
    mostrarUsuario();
    cargarMesas();
    cargarBebidas();
    cargarPlatos();
    document.getElementById("confirmar").addEventListener("click", validar, false);
}

function reiniciarTableBebidas() {
    borrarTodoBebidas();
    cargarDatosBebidas();
}

function reiniciarTablePlatos() {
    borrarTodoPlatos();
    cargarDatosPlatos();
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
            console.log(data);
            if (data.error == null) {
                let nom = document.getElementById("user");
                nom.innerHTML = data.data.user.name;
            } else {
                console.log(data.error);
            }
            let avatar = document.getElementById("avatar");
            avatar.setAttribute("src", "https://userprofile.serverred.es/public/img/" + data.data.user.avatar);
            //arrayNuevaComanda.user = data.data.user.name;
            //"61e8359f26d20e038319f759"
        })
        .catch((error) => {
            console.log(error);
        })
}

function validarNombre() {
    var element = document.getElementById("nombre");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Debes de introducir un nombre.");
        }

        if (element.validity.patternMismatch) {
            error2(element, "El nombre ha de tener entre 4 y 60 carácteres.");
        }
        return false;
    }
    return true;
}

function validarComensales() {
    var element = document.getElementById("comensales");

    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Debes de introducir los comensales.");
            return false;
        }
        if (element.validity.rangeUnderflow) {
            error2(element, "El mínimo de comensales ha de ser 1.");
        }
        return false;
    }
    return true;
}

function validar(e) {
    e.preventDefault();
    if (validarNombre() && validarComensales()) {
        esborrarError();
        subirAPI();
        return true;
    } else {
        return false;
    }
}

function error2(element, mensaje) {
    document.getElementById("missatgeError").innerHTML = mensaje;
    element.className = "form-control border-danger";
    element.focus();
}

function esborrarError() {
    var formulari = document.forms[0];
    for (var i = 0; i < formulari.elements.length - 1; i++) {
        formulari.elements[i].className = "form-control";
    }
}

function cargarMesas() {
    fetch('https://restaurante.serverred.es/api/mesas', {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            "auth-token": JSON.parse(localStorage.getItem("TK"))
        }
    })
        .then(response => response.json())
        .then(data => {
            var mesas = document.getElementById("mesas");
            data.data.data.forEach(element => {
                var div = document.createElement("div");
                div.setAttribute("class", "col");
                var boton = document.createElement("button");
                boton.setAttribute("type", "button")
                boton.setAttribute("id", element._id);
                boton.setAttribute("class", "mt-2 btn btn-primary p-3");
                boton.setAttribute("onclick", "cargarDatosMesas(this)");
                var txt = document.createTextNode(element.numero)
                boton.appendChild(txt);
                div.appendChild(boton);
                mesas.appendChild(div);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        })
}

function cargarDatosMesas(aux) {
    var id = aux.id;
    //console.log(id)
    fetch('https://restaurante.serverred.es/api/mesas', {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            "auth-token": JSON.parse(localStorage.getItem("TK"))
        }
    })
        .then(response => response.json())
        .then(data => {
            var datosMesa = document.getElementById("datosMesa");
            data.data.data.forEach(element => {
                if (element._id == id) {
                    arrayNuevaComanda.mesa = element._id;

                    if (document.getElementById("descMesa") == null) {
                        var h3 = document.createElement("h3");
                        h3.setAttribute("id", "descMesa")
                        var br = document.createElement("br");
                        var txt1 = document.createTextNode("Comensales: " + element.comensales);
                        var txt2 = document.createTextNode("Descripción: " + element.descripcion);
                        var hr = document.createElement("hr");
                        h3.appendChild(br);
                        h3.appendChild(txt1);
                        h3.appendChild(br);
                        h3.appendChild(txt2);
                        h3.appendChild(hr);
                        datosMesa.appendChild(h3);
                    } else {
                        var descMesa = document.getElementById("descMesa");
                        do {
                            descMesa.firstChild.remove();
                        } while (descMesa.lastChild)

                        var br = document.createElement("br");
                        var txt1 = document.createTextNode("Comensales: " + element.comensales);
                        var txt2 = document.createTextNode("Descripción: " + element.descripcion);
                        var hr = document.createElement("hr");
                        descMesa.appendChild(br);
                        descMesa.appendChild(txt1);
                        descMesa.appendChild(br);
                        descMesa.appendChild(txt2);
                        descMesa.appendChild(hr);

                    }
                    cambiarColor(id);
                }
                if (id != element._id) {
                    document.getElementById(element._id).setAttribute("class", "mt-2 btn btn-primary p-3");
                }
            });

        })
        .catch((error) => {
            console.error('Error:', error);
        })

    
}

function cambiarColor(id) {
    var btn = document.getElementById(id);

    if (btn.className == "mt-2 btn btn-danger p-3") {
        btn.setAttribute("class", "mt-2 btn btn-primary p-3");
        document.getElementById("descMesa").setAttribute("style", "display:none");
    } else {
        btn.setAttribute("class", "mt-2 btn btn-danger p-3");
        document.getElementById("descMesa").setAttribute("style", "display:block");
    }
}

function cargarBebidas() {
    fetch('https://restaurante.serverred.es/api/bebidas', {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            "auth-token": JSON.parse(localStorage.getItem("TK"))
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.error == null) {
                var bebidas = document.getElementById("bebidas");
                data.data.data.forEach(element => {
                    arrayBebidasCompleto.push(element);
                    var col = document.createElement("div");
                    col.setAttribute("class", "col");
                    var boton = document.createElement("button");
                    boton.setAttribute("type", "button")
                    boton.setAttribute("id", element._id);
                    boton.setAttribute("class", "mt-2 btn btn-info p-3");
                    boton.setAttribute("onclick", "añadirBebidaArray(this)");
                    var txt = document.createTextNode(element.nombre)
                    boton.appendChild(txt);
                    col.appendChild(boton);
                    bebidas.appendChild(col);
                });

            } else {
                console.log("Error");
                console.log(data.error);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        })
}

function añadirBebidaArray(elem) {
    var validar = false;

    arrayBebidasFinal.forEach(element => {
        if (elem.id == element._id) {
            element.cantidad = element.cantidad + 1;
            validar = true;
            reiniciarTableBebidas();
        }
    });

    if (validar == false) {
        arrayBebidasCompleto.forEach(element => {
            if (elem.id == element._id) {
                var bebida = {
                    "_id": element._id,
                    "cantidad": 1,
                    "estado": "Pendiente",
                    "nombre": element.nombre,
                    "precio": element.precio
                }
                arrayBebidasFinal.push(bebida);
                reiniciarTableBebidas();
            }
        })
    }
}

function cargarDatosBebidas() {

    arrayBebidasFinal.forEach(element => {
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

function borrarBebida(elem) {
    arrayBebidasFinal.forEach((element, index) => {
        if (elem.id == element._id) {
            if (element.estado == "Pendiente") {
                arrayBebidasFinal.splice(index, 1);
                reiniciarTableBebidas();
            } else if (element.estado == "Servido") {
                alert("No se puede eliminar porque ya esta servido");
            }
        }
    });
}

function borrarTodoBebidas() {
    let comBebidas = document.getElementById("comBebidas");
    comBebidas.replaceChildren("");
}

function cargarPlatos() {
    fetch('https://restaurante.serverred.es/api/platos', {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            "auth-token": JSON.parse(localStorage.getItem("TK"))
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.error == null) {
                var platosPrimero = document.getElementById("platosPrimero");
                var platosSegundo = document.getElementById("platosSegundo");
                var platosPostre = document.getElementById("platosPostre");
                data.data.data.forEach(element => {
                    arrayPlatosCompleto.push(element);
                    if (element.orden == "Primero") {
                        var col = document.createElement("div");
                        col.setAttribute("class", "col");
                        var boton = document.createElement("button");
                        boton.setAttribute("type", "button")
                        boton.setAttribute("id", element._id);
                        boton.setAttribute("class", "mt-2 btn btn-warning p-3");
                        boton.setAttribute("onclick", "añadirPlatoArray(this)");
                        var txt = document.createTextNode(element.nombre)
                        boton.appendChild(txt);
                        col.appendChild(boton);
                        platosPrimero.appendChild(col);
                    }
                    if (element.orden == "Segundo") {
                        var col = document.createElement("div");
                        col.setAttribute("class", "col");
                        var boton = document.createElement("button");
                        boton.setAttribute("type", "button")
                        boton.setAttribute("id", element._id);
                        boton.setAttribute("class", "mt-2 btn btn-warning p-3");
                        boton.setAttribute("onclick", "añadirPlatoArray(this)");
                        var txt = document.createTextNode(element.nombre)
                        boton.appendChild(txt);
                        col.appendChild(boton);
                        platosSegundo.appendChild(col);
                    }
                    if (element.orden == "Postre") {
                        var col = document.createElement("div");
                        col.setAttribute("class", "col");
                        var boton = document.createElement("button");
                        boton.setAttribute("type", "button")
                        boton.setAttribute("id", element._id);
                        boton.setAttribute("class", "mt-2 btn btn-warning p-3");
                        boton.setAttribute("onclick", "añadirPlatoArray(this)");
                        var txt = document.createTextNode(element.nombre)
                        boton.appendChild(txt);
                        col.appendChild(boton);
                        platosPostre.appendChild(col);
                    }
                });

            } else {
                console.log("Error");
                console.log(data.error);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        })
}

function añadirPlatoArray(elem) {
    var validar = false;

    arrayPlatosFinal.forEach(element => {
        if (elem.id == element._id) {
            element.cantidad = element.cantidad + 1;
            validar = true;
            reiniciarTablePlatos();
        }
    });

    if (validar == false) {
        arrayPlatosCompleto.forEach(element => {
            if (elem.id == element._id) {
                var plato = {
                    "_id": element._id,
                    "cantidad": 1,
                    "estado": "Pendiente",
                    "nombre": element.nombre,
                    "precio": element.precio
                }
                arrayPlatosFinal.push(plato);
                reiniciarTablePlatos();
            }
        })
    }
}

function cargarDatosPlatos() {

    arrayPlatosFinal.forEach(element => {
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

        var td4 = document.createElement("td");
        var txt3 = document.createTextNode(element.cantidad);
        td4.appendChild(txt3);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td4);

        var content = document.getElementById("comPlatos");
        content.appendChild(tr);
    });
}

function borrarPlato(elem) {
    arrayPlatosFinal.forEach((element, index) => {
        if (elem.id == element._id) {
            if (element.estado == "Pendiente") {
                arrayPlatosFinal.splice(index, 1);
                reiniciarTablePlatos();
            } else if (element.estado == "Servido") {
                alert("No se puede eliminar porque ya esta servido")
            } 
        }
    })
}

function borrarTodoPlatos() {
    let comBebidas = document.getElementById("comPlatos");
    comBebidas.replaceChildren("");
}

function subirAPI() {
    var nombre = document.getElementById("nombre").value;
    var comensales = document.getElementById("comensales").value;
    arrayNuevaComanda.nombre = nombre;
    arrayNuevaComanda.comensales = comensales;
    console.log(arrayPlatosFinal);
    console.log(arrayBebidasFinal);
    arrayNuevaComanda.bebidas = arrayBebidasFinal;
    arrayNuevaComanda.platos = arrayPlatosFinal;
    //arrayNuevaComanda.fechaSalida = new Date();
    //var nota = document.getElementById("notas").value;
    //arrayNuevaComanda.notas = nota;
    console.log(arrayNuevaComanda);

    setTimeout(function () {
    fetch("https://restaurante.serverred.es/api/comandas", {
        method:"POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "auth-token": JSON.parse(localStorage.getItem("TK"))
        },
        body:JSON.stringify(arrayNuevaComanda)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error=>console.log(error));
        //window.location.href = "comandas.html";
    }, 1000);
}