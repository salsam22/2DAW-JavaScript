window.onload = inicio;

function inicio() {
    logged();
    document.getElementById("enviar").addEventListener("click", logout);
}

function logout() {
    localStorage.removeItem("TK");
    logged();
}

function logged() {
    if (JSON.parse(localStorage.getItem("TK")) == null) {
        location.assign("login.html");
    } else {
        fetch("https://userprofile.serverred.es/api/areapersonal", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                "auth-token": JSON.parse(localStorage.getItem("TK"))
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            });
    }
}