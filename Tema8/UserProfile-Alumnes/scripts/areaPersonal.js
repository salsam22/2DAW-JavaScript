window.onload = inicio;

function inicio() {
    mostrarNombre();
}

function mostrarNombre() {
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
        let nom = document.getElementById("nom");
        nom.value = data.data.user.name;
        }else{
        console.log("ERROR");
        console.log(data.error);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    })
}