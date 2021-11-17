window.onload = inicio;
var cont = 0;
var totalAbans = 0;
var nombreF;
var precioF;
var tallaF;

function inicio() {
    if (JSON.parse(localStorage.getItem("contador")) != null) { 
        cont = JSON.parse(localStorage.getItem("contador"));       
    }
    if (cont < 5) {
        obtenerNombre();
        prenda();
        cambiarImagen();
        establecerPrecio();
        document.getElementById("talla").addEventListener("change", establecerPrecio, false);
        document.getElementById("siguiente").addEventListener("click", validar)
    } else {
        location.href = "FDConfirmar.html";
    }
    
}

function obtenerNombre() {
    var nombreTxt = JSON.parse(localStorage.getItem("Usuario"));
    var h2 = document.getElementById("nombreApellidos");
    var txt = document.createTextNode(nombreTxt.nom);
    h2.appendChild(txt);
}

function prenda() {
    var nombre = document.getElementById("nombreArticulo");
    nombre.setAttribute("value", pedido[cont].nombreArticulo);
    nombreF = pedido[cont].nombreArticulo;

    var precio = document.getElementById("precioArticulo");
    precio.setAttribute("value", pedido[cont].precioArticulo + " €");
    precioF = pedido[cont].precioArticulo;

    var tallasP = document.getElementById("talla");
    for (let i = 0; i < 3; i++) {
        tallasP.lastElementChild.remove();
    }
    pedido[cont].tallas.forEach((element, index) => {
        var option = document.createElement("option");
        var txt = document.createTextNode(element);
        option.appendChild(txt);
        tallasP.appendChild(option);
    });
}

function establecerPrecio() {
    var total = document.getElementById("total");
    precio = 0;
    if (localStorage.getItem("Productos") != null) {
        var precio = JSON.parse(localStorage.getItem("PrecioTotal"));
    }
    if (document.getElementById("talla").value == "Talla") {
        total.innerHTML = precio + " €";
    } else {
        tallaF = document.getElementById("talla").value;
        total.innerHTML = precio + parseInt(document.getElementById("precioArticulo").value) + " €";
    } 
}

function cambiarImagen() {
    var img = document.getElementById("imagen");
    img.setAttribute("src", "img/" + pedido[cont].imagen)
}

function subirLocalStorage() {
    var arrayProductos = new Array();
    var producto = {
        "nombre":nombreF,
        "precio":precioF,
        "talla":tallaF
    }

    if (JSON.parse(localStorage.getItem("Productos")) != null) {
        arrayProductos = JSON.parse(localStorage.getItem("Productos"));
    }

    arrayProductos.push(producto);
    if (document.getElementById("talla").value != "Talla") {
        localStorage.setItem("Productos", JSON.stringify(arrayProductos));
        localStorage.setItem("PrecioTotal", JSON.stringify(parseInt(document.getElementById("total").outerText.split(" ")[0])));
    }

    cont++;
    localStorage.setItem("contador", JSON.stringify(cont));
}

function validar() {
    subirLocalStorage();
}