window.onload = inici;

function inici() {
    document.getElementById("crearAdresa").addEventListener("click", enviarContingut);
    afegirAdreces();
}

function enviarContingut() {
    var arrayAdreces = new Array();
    
    var nom = document.getElementById("nomAdresa").value;
    var url = document.getElementById("urlAdresa").value;

    var adresa = {
        "nom": nom,
        "url": url
    }

    if (JSON.parse(localStorage.getItem("Adreces")) != null) {
        arrayAdreces = JSON.parse(localStorage.getItem("Adreces"));
    }
    arrayAdreces.push(adresa);

    localStorage.setItem("Adreces", JSON.stringify(arrayAdreces));


    mostrarElements(adresa, arrayAdreces.length-1);
    
}

function mostrarElements(adresa, index) {
    var nouLi = document.createElement("li");
    var inputPar = document.createElement("input");
    var aPar = document.createElement("a");
    var text = document.createTextNode(adresa.nom);
    inputPar.setAttribute("type","checkbox");
    inputPar.setAttribute("id","adr"+index);
    inputPar.setAttribute("onclick", "borrarAdresa(this);");
    aPar.setAttribute("href", adresa.url);
    aPar.setAttribute("target", "_blanck");
    aPar.appendChild(text);
    nouLi.appendChild(inputPar);
    nouLi.appendChild(aPar);
    llista.appendChild(nouLi);
}

function afegirAdreces() {
    var arrayAdreces = new Array();

    if (JSON.parse(localStorage.getItem("Adreces")) != null) {
        arrayAdreces = JSON.parse(localStorage.getItem("Adreces"));
    }
    var llista = document.getElementById("llista");
    arrayAdreces.forEach((elem, index) => {
        var nouLi = document.createElement("li");
        var inputPar = document.createElement("input");
        var aPar = document.createElement("a");
        var text = document.createTextNode(elem.nom);
        inputPar.setAttribute("type","checkbox");
        inputPar.setAttribute("id","adr"+index);
        inputPar.setAttribute("onclick", "borrarAdresa(this);");
        aPar.setAttribute("href", elem.url);
        aPar.setAttribute("target", "_blanck");
        aPar.appendChild(text);
        nouLi.appendChild(inputPar);
        nouLi.appendChild(aPar);
        llista.appendChild(nouLi);
    })
}

function borrarAdresa(elem) {
    var id = elem.id;
    var arrayAdreces = new Array();
    var eliminar = document.getElementById(id);
    eliminar.parentNode.remove(eliminar);

    if (JSON.parse(localStorage.getItem("Adreces")) != null) {
        arrayAdreces = JSON.parse(localStorage.getItem("Adreces"));
    }
    id = id.substr(3);
    arrayAdreces.splice(id,1);

    localStorage.setItem("Adreces", JSON.stringify(arrayAdreces));
}