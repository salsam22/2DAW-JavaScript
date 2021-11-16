window.onload = inicio;

function inicio() {
    obtenerNombre();
}

function obtenerNombre() {
    var nombreTxt = localStorage.getItem("Usuario");
    var h2 = document.getElementById("nombreApellidos");
    console.log(nombreTxt);
    var txt = document.createTextNode(nombreTxt.nom);
    h2.appendChild(txt);
}