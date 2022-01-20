window.onload = inicio;

function inicio() {
    mostrarUsuario();
    mostrarImg();
    borrarTodo();
    cargarMesas();
    document.getElementById("newMesa").addEventListener("click", new_mod, false);
    document.getElementById("confirmar").addEventListener("click", validar, false);
    document.getElementById("cancelar").addEventListener("click", cancelar, false);
}

function mostrarUsuario() {
    fetch('https://userprofile.serverred.es/api/areapersonal', {
        method: 'GET',
        headers: {
            'Accept' : 'application/json',
            "auth-token": JSON.parse(localStorage.getItem("TK"))
        }
    })
    .then(response => response.json())
    .then(data => {
        if(data.error == null){
        console.log("FUNCIONA");
        let nom = document.getElementById("user");
        nom.innerHTML = data.data.user.name;
        }else{
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
            "auth-token" : JSON.parse(localStorage.getItem("TK"))
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let avatar = document.getElementById("avatar");

            avatar.setAttribute("src", "https://userprofile.serverred.es/public/img/"+ data.data.user.avatar);
        })
        .catch((error) => {
            console.log(error);
        })
}

function cargarMesas() {
    fetch("https://restaurante.serverred.es/api/mesas", {
        method:"GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token" : JSON.parse(localStorage.getItem("TK"))
        }
    })
        .then(response => response.json())
        .then(data =>{
            console.log(data);
            data.data.data.forEach((element,index) => {
                var tr = document.createElement("tr");
                var td1 = document.createElement("td");
                var btnBorrar = document.createElement("button");
                btnBorrar.setAttribute("class", "btn btn-primary btn-lg my-3");
                btnBorrar.setAttribute("id", element._id);
                btnBorrar.setAttribute("onclick", "borrarMesa(this)")
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
                var txt1 = document.createTextNode(element.numero)
                td3.appendChild(txt1);
                var td4 = document.createElement("td");
                var txt2 = document.createTextNode(element.comensales)
                td4.appendChild(txt2);
                var td5 = document.createElement("td");
                var txt3 = document.createTextNode(element.descripcion)
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

function validarNumeroMesa() {
    esborrarError();
    var element = document.getElementById("numero");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Error: El numero de mesa es requerido.");
        }
        if (element.validity.rangeOverflow) {
            error2(element, "Error: El numero de mesa tiene que ser inferior a 100.");
        }
        if (element.validity.rangeUnderflow) {
            error2(element, "Error: El numero de mesa tiene que ser superior a 1.");
        }
        return false;
    }
    borrarError();
    return true;
}

function validarComensales() {
    esborrarError();
    var element = document.getElementById("comensales");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Error: El numero de comensales es requerido.");
        }
        if (element.validity.rangeOverflow) {
            error2(element, "Error: El numero de comensales tiene que ser inferior a 50.");
        }
        if (element.validity.rangeUnderflow) {
            error2(element, "Error: El numero de comensales tiene que ser superior a 1.");
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
    if (validarNumeroMesa() && validarComensales() && confirm("¿Seguro?")) {
        new_mod_mesa();
        return true;
    } else {
        return false;
    }
}

function new_mod_mesa() {
    var id = document.getElementById("_id").value;
    if (id == "undefined") {
        var mesa = {
            numero: document.getElementById("numero").value,
            comensales: document.getElementById("comensales").value,
            descripcion: document.getElementById("descripcion").value
        }
        fetch("https://restaurante.serverred.es/api/mesas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token" : JSON.parse(localStorage.getItem("TK"))
            },
            body: JSON.stringify(mesa)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error=>console.log(error));
        inicio();
    } else {
        var mesa = {
            numero: document.getElementById("numero").value,
            comensales: document.getElementById("comensales").value,
            descripcion: document.getElementById("descripcion").value
        }
        fetch("https://restaurante.serverred.es/api/mesas/"+id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token" : JSON.parse(localStorage.getItem("TK"))
            },
            body: JSON.stringify(mesa)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error=>console.log(error));
        inicio();
    }
}

function muestraEdit(id) {
    fetch("https://restaurante.serverred.es/api/mesas/", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "auth-token" : JSON.parse(localStorage.getItem("TK"))
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(id);
            data.data.data.forEach(element => {
                if (element._id == id) {
                    console.log(element);
                    document.getElementById("numero").value = element.numero;
                    document.getElementById("comensales").value = element.comensales;
                    document.getElementById("descripcion").value = element.descripcion;
                }
            });
        })
        .catch(error=>console.log(error));
}

function borrarMesa(elem) {
    fetch("https://restaurante.serverred.es/api/mesas/" + elem.id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "auth-token" : JSON.parse(localStorage.getItem("TK"))
        }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
    inicio();
}

function borrarTodo() {
    var files = document.getElementById("files");
    do {
        files.firstChild.remove();
    } while (files.lastChild)
}