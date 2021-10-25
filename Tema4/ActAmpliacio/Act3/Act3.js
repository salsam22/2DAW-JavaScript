window.onload = inici;

var visitas = 0;

function inici() {
    contador();
}

function contador (){
    
    var aux = 0;

    if (JSON.parse(localStorage.getItem("visitas")) != null) {
        aux = JSON.parse(localStorage.getItem("visitas"));    
    }

    visitas = aux;

    visitas++;    
    
    var h1 = document.createElement("h1");
    var text = document.createTextNode(visitas);
    h1.appendChild(text);
    document.body.appendChild(h1);

    localStorage.setItem("visitas",visitas);

}