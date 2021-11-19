window.onload = inicio;
var cont = 0;
var tallaF;

function inicio() {
    if (cont < 5) {
        obtenerNombre();
        prenda();
        establecerPrecio();
        document.getElementById("talla").addEventListener("change", establecerPrecio, false);
        document.getElementById("siguiente").addEventListener("click", pujarLocalStorage);
        
    } else {
        location.href = "FDConfirmar.html";
    }
}

function obtenerNombre() {
    var ticket = new Array();
    if (JSON.parse(localStorage.getItem("Ticket")) != null) {
        var ticket = JSON.parse(localStorage.getItem("Ticket"));
    }
    var nombreAp = document.getElementById("nombreApellidos");
    
    nombreAp.innerText = ticket[0].nom;
}

function prenda() {
    var nombre = document.getElementById("nombreArticulo");
    nombre.setAttribute("value", pedido[cont].nombreArticulo);

    var precio = document.getElementById("precioArticulo");
    precio.setAttribute("value", pedido[cont].precioArticulo + " €");

    var talla = document.getElementById("talla");
    var cantidad = talla.childElementCount-1;
    for (let i = 0; i < cantidad; i++) {
        talla.lastElementChild.remove();
    }
    pedido[cont].tallas.forEach(element => {
        var option = document.createElement("option");
        var txt = document.createTextNode(element);
        option.appendChild(txt);
        talla.appendChild(option);
    });
    var img = document.getElementById("imagen");
    img.setAttribute("src", "img/" + pedido[cont].imagen)
}

function establecerPrecio() {
    var total = document.getElementById("total");
    var talla = document.getElementById("talla");
    var ticket = new Array();

    if (localStorage.getItem("Ticket") != null) {
        ticket = JSON.parse(localStorage.getItem("Ticket"));
    }

    var totalTicket = ticket[0].precioTotal;
    total.innerHTML = totalTicket + " €";
    
    if (talla.value != "Talla") {
        var precioArt = pedido[cont].precioArticulo;
        total.innerHTML = (totalTicket + precioArt) + " €";
    } else {
        total.innerHTML = totalTicket + " €";
    }
}

function subirLocalStorage() {
    var talla = document.getElementById("talla");
    var ticket = new Array();

    if (JSON.parse(localStorage.getItem("Ticket")) != null) {
        ticket = JSON.parse(localStorage.getItem("Ticket"));
    }
    if (talla.value != "Talla") {

        var producto = {
            "nombre":pedido[cont].nombreArticulo,
            "precio":pedido[cont].precioArticulo,
            "talla":talla.value,
            "foto":pedido[cont].imagen
        }
        ticket[0].productos.push(producto);

        var totalTicket = ticket[0].precioTotal;
        var precioArt = pedido[cont].precioArticulo;
        totalTicket = totalTicket + precioArt;
        ticket[0].precioTotal = totalTicket;

        localStorage.setItem("Ticket", JSON.stringify(ticket));
    }

    cont++;

    inicio();
}

function pujarLocalStorage(e) {
    e.preventDefault();
    subirLocalStorage();
}