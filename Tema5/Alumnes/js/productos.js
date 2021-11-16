window.onload = inicio;
var cont = 0;
var totalAbans = 0;
var nombreF;
var precioF;
var tallaF;

function inicio() {
    //obtenerPrecio();
    obtenerNombre();
    nombrePrenda();
    precioPrenda();
    tallasPrenda();
    cambiarImagen();
    establecerPrecio();
    document.getElementById("talla").addEventListener("change", establecerPrecio, false);
    document.getElementById("siguiente").addEventListener("click", validar)
}

function obtenerNombre() {
    var nombreTxt = JSON.parse(localStorage.getItem("Usuario"));
    var h2 = document.getElementById("nombreApellidos");
    var txt = document.createTextNode(nombreTxt.nom);
    h2.appendChild(txt);
}

function nombrePrenda() {
    var nombre = document.getElementById("nombreArticulo");
    nombre.setAttribute("value", pedido[cont].nombreArticulo);
    nombreF = pedido[cont].nombreArticulo;
}

function precioPrenda() {
    var precio = document.getElementById("precioArticulo");
    precio.setAttribute("value", pedido[cont].precioArticulo + " €");
    precioF = pedido[cont].precioArticulo;
}

function tallasPrenda() {
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

/*function obtenerTalla() {
    document.getElementById("talla").addEventListener("click", function() {
        var tallas = document.getElementById("talla");
        var selectedOption = this.options[tallas.selectedIndex];
        if (selectedOption.text == "Talla") {
            return false;
        }
        
        precioSumado();
        tallaF = selectedOption.text;
        return true;
    });
    
}
*/

function establecerPrecio() {
    var total = document.getElementById("total");
    precio = 0;
    if (localStorage.getItem("Productos") != null) {
        var precio = JSON.parse(localStorage.getItem("PrecioTotal"));
    }
    if (document.getElementById("talla").value == "Talla") {
        total.innerHTML = precio + " €";
    } else {
        total.innerHTML = precio + parseInt(document.getElementById("precioArticulo").value) + " €";
    } 
}


/*function obtenerPrecio() {
    var arrayProductos = new Array();

    if (JSON.parse(localStorage.getItem("Productos")) != null) {
        arrayProductos = JSON.parse(localStorage.getItem("Productos"));
        for (let i = 0; i < arrayProductos.length; i++) {
            suma = suma + arrayProductos.producto.precio;
        }
    } else {
        suma = 0;
    }

    var total = document.getElementById("total");
    var txt = document.createTextNode(suma + " €");
    total.innerHTML = suma + " €";
}

function precioSumado() {
    var total = document.getElementById("total");
    total = total.outerText;
    var totalSplit = total.split(" ");
    var totalPrecio = parseInt(totalSplit[0]) + pedido[cont].precioArticulo;
    var txt = document.createTextNode(totalPrecio + " €")
    console.log(totalPrecio);
    total.innerHTML = totalPrecio;
}*/

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
    if (tallaF != "Talla") {
        localStorage.setItem("Productos", JSON.stringify(arrayProductos));
        localStorage.setItem('PrecioTotal', JSON.stringify(parseInt(document.getElementById("total").outerText.split(" ")[0])));
    }
}

function validar() {
    if (obtenerTalla() && confirm("¿Seguro que quieres guardar este producto?")) {
        subirLocalStorage();
    }
}