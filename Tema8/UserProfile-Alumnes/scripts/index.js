window.onload = inicio;

function inicio() {
    mostrarUsuario();
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