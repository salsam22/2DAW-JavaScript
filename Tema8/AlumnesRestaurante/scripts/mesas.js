window.onload = inicio;

function inicio() {
    mostrarUsuario();
    mostrarImg();
    cargarMesas();
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
            var tr = document.createElement("tr");
            data.data.data.forEach(element => {
                var td1 = document.createElement("td");
                var btnBorrar = document.createElement("button");
                var txt1 = document.createTextNode("Borrar");
                btnBorrar.appendChild(txt1);
                btnBorrar.setAttribute("value", "Borrar");
                btnBorrar.setAttribute("class", "btn btn-primary btn-lg my-3");
                td1.appendChild(btnBorrar);
                tr.appendChild(td1);
            });
            var files = document.getElementById("files");
            files.appendChild(tr);
        })
}