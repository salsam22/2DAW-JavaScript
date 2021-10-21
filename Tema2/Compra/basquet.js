var valorFinal = 0.0;

// AFEGEIX ELS ELEMENTS QUE TU CREES A UN ARRAY I AL LOCALSTORAGE
function afegirProducte(elem) {

    var arrayProd = new Array();
    var descripcio = document.getElementById("desc").value;
    var preu = document.getElementById("preu").value;
    var quantitat = document.getElementById("quant").value;

    var producte = {
        "descripcio": descripcio,
        "preu": preu,
        "quantitat": quantitat
    }

    if (JSON.parse(localStorage.getItem("Productes")) != null) {
        arrayProd = JSON.parse(localStorage.getItem("Productes"));
    }
    arrayProd.push(producte);

    localStorage.setItem("Productes", JSON.stringify(arrayProd));

}

// AFEGEIX TANT LA TAULA DE PRODUCTES COM LA DE BASQUET DESDE EL LOCALSTORAGE
function afegirTaula() {

    var arrayProd = new Array();
    var arrayBasq = new Array();

    if (JSON.parse(localStorage.getItem("Productes")) != null) {
        arrayProd = JSON.parse(localStorage.getItem("Productes"));
    }
    var taula1 = document.getElementById("taula");
    var aux1 = "";
    arrayProd.forEach((elem, index) => {
        aux1 = "<tr><td><button onclick='addBasquet(this), contador()' id=" + index + ">Add</button></td><td>" + elem.descripcio + "</td><td>" + elem.preu + "</td><td>" + elem.quantitat + "</td></tr>";
        taula1.innerHTML += aux1;
    });

    if (JSON.parse(localStorage.getItem("Basquets")) != null) {
        arrayBasq = JSON.parse(localStorage.getItem("Basquets"));
    }
    var taula2 = document.getElementById("taula2");
    var aux2 = "";
    arrayBasq.forEach((elem) => {
        aux2 = "<tr><td>" + elem.descripcio + "</td><td>1</td><td>" + elem.preu + "</td></tr>";
        taula2.innerHTML += aux2;
        valor = parseFloat(elem.preu);
        valorFinal = valorFinal + valor;
        document.getElementById("preuTotal").innerHTML = valorFinal;
    });

}

// OBRI LA PLANA ON ESTAN LES TAULES AL PRESIONAR EL BOTO DE MOSTRAR
function mostrarBasquet() {

    window.open("basquetTenda.html", "_self");

}

// AFEGEIX UN ELEMENT AL ARRAY DE BASQUETS I AL LOCALSTORAGE
function addBasquet(element) {
    var arrayProd = new Array();
    var arrayBasq = new Array();
    var id = element.id;
    if (comprovarStock(id) == true) {
        if (JSON.parse(localStorage.getItem("Basquets")) != null) {
            arrayBasq = JSON.parse(localStorage.getItem("Basquets"));
        }
        arrayProd = JSON.parse(localStorage.getItem("Productes"));
        arrayBasq.push(arrayProd[id]);
        var aux2 = "";
        var taula2 = document.getElementById("taula2");
        aux2 = "<tr><td>" + arrayProd[id].descripcio + "</td><td>1</td><td>" + arrayProd[id].preu + "</td></tr>";
        taula2.innerHTML += aux2;
        localStorage.setItem("Basquets", JSON.stringify(arrayBasq));
        valor = parseFloat(arrayProd[id].preu);
        valorFinal = valorFinal + valor;
        document.getElementById("preuTotal").innerHTML = valorFinal;
        location.reload();
    }

}

// COMPROVA SI ENCARA HI HA STOCK A LA TENDA I BORRA 1
function comprovarStock(id) {
    var arrayProd = new Array();
    arrayProd = JSON.parse(localStorage.getItem("Productes"));
    arrayProd[id].quantitat--;
    if (arrayProd[id].quantitat != 0) {
        localStorage.setItem("Productes", JSON.stringify(arrayProd));
        return true;
    }
    localStorage.setItem("Productes", JSON.stringify(arrayProd));
    //alert("El producte " + arrayProd[id].descripcio + " s'ha acabat!");
    location.reload();
    return false;
}

// CONTADOR DE QUE QUAN PASEN 20 MIN, ES BORRA EL BASQUET
function contador() {

    var count;
    var minuts = localStorage.getItem("Minuts", minuts);
    var segons = localStorage.getItem("Segons", segons);

    if (minuts == null && segons == null) {
        minuts = 20;
        segons = 00;
    }

    if (localStorage.length > 1) {
        count = setInterval(function () {
            if (minuts == 0 && segons == 0) {

                localStorage.removeItem("Basquets");
                localStorage.removeItem("Minuts");
                localStorage.removeItem("Segons");
                location.reload();
                clearInterval(count);

            } else {

                segons--;
                if (segons < 0) {
                    minuts--;
                    segons = 59;
                    if (minuts < 10) {
                        minuts = '0' + minuts;
                    }
                }
                if (segons < 10) {
                    segons = '0' + segons;
                }
                document.getElementById("temps").innerHTML = "Tens de temps " + minuts + ":" + segons + " fins que es borre el basquet";
                localStorage.setItem("Minuts", minuts);
                localStorage.setItem("Segons", segons);
            }

        }, 1000);
    }
}

// NETEJA TOT EL LOCALSTORAGE
function netejarLocal() {

    localStorage.clear();
    location.reload();

}