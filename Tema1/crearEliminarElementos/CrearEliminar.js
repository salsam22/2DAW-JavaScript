function afegir() {
    var mensaje;
    var opcion = prompt("Afegix algo: ");
    if (opcion == null || opcion == "") {
        console.log("No has introducido nada o lo has enviado vacio");
    } else {
        mensaje = opcion;
    }
    var parrafo = document.createElement("li");
    var ol = document.getElementById("ol");
    var contenido = document.createTextNode(mensaje);
    parrafo.appendChild(contenido);
    ol.appendChild(parrafo);
}

function eliminar() {
    var eliminar = document.querySelector("li");
    eliminar.parentNode.lastChild.remove(eliminar);
}