window.onload = inicio;
var arrayProductos = new Array();

function inicio() {
    if (JSON.parse(localStorage.getItem("Productos")) != null) {
        arrayProductos = JSON.parse(localStorage.getItem("Productos"));
    }
    mostrar();
}

function mostrar() {
    arrayProductos.forEach((element,index) => {
    var primerDiv = document.createElement("div");
    primerDiv.setAttribute("class", "card mt-2");
    primerDiv.setAttribute("style", "width: 25rem;");
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
    img.setAttribute("src", "./img/" + element.imagen)
    img.setAttribute("class", "img-fluid img-thumbnail")
    quintoDiv.appendChild(img);
    
    });
}