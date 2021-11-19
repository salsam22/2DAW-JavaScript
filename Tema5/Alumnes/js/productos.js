window.onload = inicio;
var cont = 0;
var nombreF;
var precioF;
var tallaF;
var foto;

function inicio() {
    if (cont < 5) {
        obtenerNombre();
        prenda();
        establecerPrecio();
        document.getElementById("talla").addEventListener("change", establecerPrecio, false);
        document.getElementById("siguiente").addEventListener("click", pujarLocalStorage);
        cont++;
    } else {
        location.href = "FDConfirmar.html";
    }
}

function obtenerNombre() {
    var nombreTxt = JSON.parse(localStorage.getItem("Ticket"));
    var h2 = document.getElementById("nombreApellidos");
    var txt = document.createTextNode(nombreTxt[0].nom);
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
    var img = document.getElementById("imagen");
    img.setAttribute("src", "img/" + pedido[cont].imagen)
    foto = pedido[cont].imagen;
}

function establecerPrecio() {
    var total = document.getElementById("total");
    precio = 0;
    if (localStorage.getItem("Ticket") != null) {
        var precio = JSON.parse(localStorage.getItem("Ticket"));
    }
    if (document.getElementById("talla").value == "Talla") {
        total.innerHTML = precio[cont+1].precio + " €";
    } else {
        tallaF = document.getElementById("talla").value;
        total.innerHTML = precio + parseInt(document.getElementById("precioArticulo").value) + " €";
    } 
}

function subirLocalStorage() {
    var ticket = new Array();
    var producto = {
        "nombre":nombreF,
        "precio":precioF,
        "talla":tallaF,
        "foto":foto
    }

    console.log(producto);
    

    //var preuTotal = (parseInt(document.getElementById("total").outerText.split(" ")[0]));

    if (JSON.parse(localStorage.getItem("Ticket")) != null) {
        ticket = JSON.parse(localStorage.getItem("Ticket"));
    }

    ticket.push(producto);

    if (document.getElementById("talla").value != "Talla") {
        localStorage.setItem("Ticket", JSON.stringify(ticket));
    }
    inicio();
}

function pujarLocalStorage(e) {
    e.preventDefault();
    subirLocalStorage();
}