window.onload = inici;
var openedWindow;
var openedWindow2;

function inici() {
    titol();
    tamanyFinestra();
    document.getElementById("obrir").addEventListener("click",newWindow);
    document.getElementById("prompt").addEventListener("click",newWindowConcret);
}

function div() {
    var div = document.getElementById("div");
    return div;
}

function titol() {
    var idDiv = div();
    var titol = document.createElement("h3");
    var nomNavegador = navigator.appCodeName;
    var contingut = document.createTextNode("El navegador que esta utilitzant es \"" + nomNavegador + "\".");
    titol.appendChild(contingut);
    idDiv.appendChild(titol);
}

function tamanyFinestra() {
    var idDiv = div();
    var finestraWidth = window.innerWidth;
    var finestraHeight = window.innerHeight;
    var tamanyPantalla = document.createElement("p");
    var contingut = document.createTextNode("El tamany de la finestra es de " + finestraWidth + " de width per " + finestraHeight + " de height.");
    tamanyPantalla.appendChild(contingut);
    idDiv.appendChild(tamanyPantalla);
}

function newWindow() {
    if (openedWindow != null) {
        openedWindow.close();
    }
    openedWindow = window.open("crono.html","Reloj", "width=200px,height=200px,scrollbars=NO");
}

function newWindowConcret() {
    if (openedWindow != null){
        openedWindow.close();
    }
    var width = prompt("Indica el width de la finestra: ");
    var height = prompt("Indica el height de la finestra: ");
    openedWindow = window.open("crono.html","Reloj", "width="+width+"px,height="+height+"px,scrollbars=NO");
}