window.onload = inicio;

function inicio() {
    mostrarUsuario();
    document.getElementById("enviar").addEventListener("click", logout);
}

function logout() {
    localStorage.removeItem("TK");
    logged();
}

function logged() {
    if (JSON.parse(localStorage.getItem("TK")) == null) {
        location.assign("login.html");
    }
}

function mostrarUsuario() {
    fetch('https://news.serverred.es/api/areapersonal', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            "auth-token": JSON.parse(localStorage.getItem("TK"))
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.error == null) {
                console.log("FUNCIONA");
                let nom = document.getElementById("user");
                nom.innerHTML = data.data.user.name;
            } else {
                console.log("ERROR");
                console.log(data.error);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        })
}