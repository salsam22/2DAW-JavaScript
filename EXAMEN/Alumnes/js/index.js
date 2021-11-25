window.onload = inici;
var fechasDuplicadas = new Array();
var fechasSinDuplicar = new Array();

function inici() {
    cargarCoches();
    quitarRepeticiones();
    selectFechas();
    document.getElementById("ir").addEventListener("click", buscador);
    document.getElementById("anyoDesde").addEventListener("change", mostrarCochesFecha);
    document.getElementById("anyoHasta").addEventListener("change", mostrarCochesFecha);
    document.getElementById("kmDesde").addEventListener("change", mostrarCochesKM);
    document.getElementById("kmHasta").addEventListener("change", mostrarCochesKM);
    document.getElementById("combustible").addEventListener("change", mostrarCochesCombustinble);
    document.getElementById("filtrar").addEventListener("click", filtrar);
}

function cargarCoches() {
    var listado = document.getElementById("listado");
    var text;
    data.cars.forEach((element, index) => {
        text =
            "<div class='card mb-4' id='div" + index + "'>" +
            "<a href='#!'><img class='card-img-top' src='img/" + element.img + "' alt='...' /></a>" +
            "<div class='card-body'>" +
            "<h2 class='card-title'>" + element.modelo + "</h2>" +

            "<div class='row justify-content-end'>" +
            "<div class='p-2 mb-1  col-md-3 offset-md-3 bg-warning rounded text-center'>" +
            "<h2 class='font-weight-bold'>" + element.precio + " €</h2>" +
            "</div>" +
            "</div>" +

            "<div class='row'>" +
            "<div class='col p-3 text-center border-bottom border-dark'>Año</div>" +
            "<div class='col p-3 text-center border-bottom border-dark'>Kilometros</div>" +
            "<div class='col p-3 text-center border-bottom border-dark'>Cambio</div>" +
            "<div class='col p-3 text-center border-bottom border-dark'>Combustible</div>" +
            "<div class='w-100'></div>" +
            "<div class='col p-3 text-center'><strong>" + element.anyo + "</strong></div>" +
            "<div class='col p-3 text-center'><strong>" + element.km + " Km.</strong></div>" +
            "<div class='col p-3 text-center'><strong>" + element.cambio + "</strong></div>" +
            "<div class='col p-3 text-center'><strong>" + element.combustible + "</strong></div>" +
            "</div>" +
            "<a class='btn btn-primary m-3' href='#!' id="+index+" onclick='pujarLocalStorage(this)'>Reservar</a>" +
            "</div>" +
            "</div>";
        listado.innerHTML += text;
        fechasDuplicadas.push(element.anyo);
    });
}

function buscador() {
    let input = document.getElementById("marcaModelo");

    data.cars.forEach((element, index) => {
        if (!element.marca.toLowerCase().includes(input.value.toLowerCase())) {
            let div = document.getElementById("div" + index);
            div.style = "display:none";
            if (!element.modelo.toLowerCase().includes(input.value.toLowerCase())) {
                let div = document.getElementById("div" + index);
                div.style = "display:none";
            } else {
                let div = document.getElementById("div" + index);
                div.style = "display:block";
            }
        } else {
            let div = document.getElementById("div" + index);
            div.style = "display:block";
        }
    });
}

function selectFechas() {
    fechasSinDuplicar.sort();
    var anyoDesde = document.getElementById("anyoDesde");
    var anyoHasta = document.getElementById("anyoHasta");
    fechasSinDuplicar.forEach(element => {
        var option = document.createElement("option");
        option.setAttribute("value", element)
        var txt = document.createTextNode(element);
        option.appendChild(txt);
        anyoDesde.appendChild(option);
    });
    fechasSinDuplicar.forEach(element => {
        var option = document.createElement("option");
        option.setAttribute("value", element)
        var txt = document.createTextNode(element);
        option.appendChild(txt);
        anyoHasta.appendChild(option);
    });
}

function quitarRepeticiones() {
    for (var i = 0; i < fechasDuplicadas.length; i++) {
        var elemento = fechasDuplicadas[i];
        if (!fechasSinDuplicar.includes(fechasDuplicadas[i])) {
            fechasSinDuplicar.push(elemento);
        }
    }
}

function mostrarCochesFecha() {
    let anyoDesde = document.getElementById("anyoDesde");
    let anyoHasta = document.getElementById("anyoHasta");
    console.log(anyoDesde.value);
    console.log(anyoHasta.value);
    if (anyoDesde.value <= anyoHasta.value) {
        data.cars.forEach((element, index) => {
            if (element.anyo < anyoDesde.value) {
                let div = document.getElementById("div" + index);
                div.style = "display:none";
            } else if (element.anyo > anyoHasta.value){
                let div = document.getElementById("div" + index);
                div.style = "display:none";
            } else {
                let div = document.getElementById("div" + index);
                div.style = "display:block";
            }
        });
    } else {
        console.log("La data maxima ha de ser superior a la minima");
    }
}

function mostrarCochesKM() {
    let kmDesde = document.getElementById("kmDesde");
    let kmHasta = document.getElementById("kmHasta");
    kmDesde = parseInt(kmDesde.value);
    kmHasta = parseInt(kmHasta.value);
    if (kmDesde < kmHasta) {
        data.cars.forEach((element, index) => {
            if (element.km < kmDesde) {
                let div = document.getElementById("div" + index);
                div.style = "display:none";
            } else if (element.km > kmHasta){
                let div = document.getElementById("div" + index);
                div.style = "display:none";
            } else {
                let div = document.getElementById("div" + index);
                div.style = "display:block";
            }
        });
    } else {
        console.log("Els KM maxims han de ser superior als minims.");
    }
}

function mostrarCochesCombustinble() {
    let combustible = document.getElementById("combustible");
    
    data.cars.forEach((element, index) => {
        if (element.combustible != combustible.value) {
            let div = document.getElementById("div" + index);
            div.style = "display:none";
        } else {
            let div = document.getElementById("div" + index);
            div.style = "display:block";
        }
    });
}

function filtrar() {
    mostrarCochesFecha();
    mostrarCochesKM();
    mostrarCochesCombustinble();
}

function pujarLocalStorage(elem) {
    var arrayCoches = new Array();
    var marca = data.cars[elem.id].marca;
    var modelo = data.cars[elem.id].modelo;
    var precio = data.cars[elem.id].precio;
    var anyo = data.cars[elem.id].anyo;
    var km = data.cars[elem.id].km;
    var cambio = data.cars[elem.id].cambio;
    var combustible = data.cars[elem.id].combustible;
    var img = data.cars[elem.id].img;

    var cotxe = {
        "marca":marca,
        "modelo":modelo,
        "precio":precio,
        "anyo":anyo,
        "km":km,
        "cambio":cambio,
        "combustible":combustible,
        "img":img
    };

    var reserva = {
        "coche":[],
        "cliente":[]
    };

    reserva.coche.push(cotxe);

    localStorage.setItem("reserva", JSON.stringify(reserva));
    
    location.href = "reserva.html";
}
