window.onload = inicio;
var ticket = new Array();
var total = 0;

ticket = JSON.parse(localStorage.getItem("Ticket"));

function inicio() {
    mostrarNombre();
    mostrarArticulos();
    eliminarProducto();
}

function mostrarNombre() {
    var nombre = document.getElementById("nombreApellidos");
    nombre.innerText = ticket[0].nom;
}

function mostrarArticulos() {
    var pare = document.getElementById("articulos");
    var arrayProductos = new Array();
    arrayProductos = ticket[0].productos;
    arrayProductos.forEach((element,index) => {
        var primerDiv = document.createElement("div");
        primerDiv.setAttribute("class", "card mt-2");
        primerDiv.setAttribute("style", "width: 25rem;");
        primerDiv.setAttribute("id", "primerDiv" + index);
        var h5 = document.createElement("h5");
        h5.setAttribute("class", "card-header");
        var nombreProducto = document.createTextNode(element.nombre);
        h5.appendChild(nombreProducto);
        var segundoDiv = document.createElement("div");
        segundoDiv.setAttribute("class", "card-body");
        var tercerDiv = document.createElement("div");
        tercerDiv.setAttribute("class", "row");
        var quartoDiv = document.createElement("div");
        quartoDiv.setAttribute("class", "col");
        var h3 = document.createElement("h3");
        h3.setAttribute("class", "card-title");
        var precioProducto = document.createTextNode(element.precio + " €");
        h3.appendChild(precioProducto);
        var p = document.createElement("p");
        p.setAttribute("class", "card-text");
        var tallaProducto = document.createTextNode("Talla " + element.talla);
        p.appendChild(tallaProducto);
        var a = document.createElement("a");
        a.setAttribute("href", "#");
        a.setAttribute("class", "btn btn-primary text-end");
        a.setAttribute("id", index);
        var i = document.createElement("i");
        i.setAttribute("class", "fa fa-trash-o");
        i.setAttribute("aria-hidden", "true")
        a.appendChild(i);
        quartoDiv.appendChild(h3);
        quartoDiv.appendChild(p);
        quartoDiv.appendChild(a);
        var quintoDiv = document.createElement("div");
        quintoDiv.setAttribute("class", "col");
        var img = document.createElement("img");
        img.setAttribute("src", "./img/" + element.foto)
        img.setAttribute("class", "img-fluid img-thumbnail")
        quintoDiv.appendChild(img);
        tercerDiv.appendChild(quartoDiv);
        tercerDiv.appendChild(quintoDiv);
        segundoDiv.appendChild(tercerDiv);
        primerDiv.appendChild(h5);
        primerDiv.appendChild(segundoDiv);
        pare.appendChild(primerDiv);
        total += element.precio;
    });
    var totalTexto = document.getElementById("total");
    
    totalTexto.innerText = total + " €";
    
    
}

function eliminarProducto() {
    var botons = document.querySelectorAll(".btn.btn-primary.text-end");
    
    botons.forEach(element => {
        element.addEventListener("click", clic);
    });

    function clic() {
        var selected = document.getElementById("primerDiv" + this.id);
        selected.remove();
        ticket[0].productos.splice(this.id, 1);
        ticket[0].precioTotal = total;
        localStorage.setItem("Ticket", JSON.stringify(ticket));
        location.reload();
    }
    
}