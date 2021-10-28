window.onload = inici;
var interval = null;

function inici() {

    document.getElementById("inicio").addEventListener("click", inicio);
    document.getElementById("cancelar").addEventListener("click", cancelar);

}

function inicio() {
    var seg = 30;
    var novaP = document.createElement("p");

    interval = setInterval(function () {

        var text = document.createTextNode(seg);
        novaP.appendChild(text);
        document.body.appendChild(novaP);
        seg--;
        novaP.replaceChildren(text);
        if (seg == -1) {
            window.open("https://uniwebsidad.com/");
            clearInterval(interval);
        }

    }, 1000);

}

function cancelar() {
    clearInterval(interval);
}