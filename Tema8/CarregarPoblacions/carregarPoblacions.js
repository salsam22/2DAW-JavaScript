
// ALACANT 03
// VALENCIA 46
// CASTELLO 12

window.onload = inici;

const arrayPobl = new Array();

function inici() {
    document.getElementById("carregar").addEventListener("click", carregarPoblacions);
    autocomplete(arrayPobl);
}

function carregarPoblacions() {
    carregar('03');
    carregar('46');
    carregar('12');
}

function carregar(codPobl) {
    var request = new XMLHttpRequest();
    request.open("GET", "https://apiv1.geoapi.es/municipios?CPRO="+ codPobl +"&type=JSON&key=&sandbox=1", true);
    request.send(null);
    request.onload = function () {
        data = JSON.parse(this.response);
        data.data.forEach(element => {
            arrayPobl.push(element.DMUN50)
        });
        console.log(arrayPobl.length);
        
    }
}

function autocomplete(arrayPobl) {
    $("#poblacions").autocomplete({
        source: arrayPobl
    });
}


