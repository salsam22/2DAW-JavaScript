window.onload = inici;
var fontSize = 1; 

function inici() {   
    document.getElementById("agrandar").addEventListener("click",agrandar);
    document.getElementById("reduir").addEventListener("click",reduir);
    document.getElementById("original").addEventListener("click",original);
}

function textACanviar() {
    var text = document.querySelector("p");
    return text;
}

function agrandar() {
    var text = textACanviar();
    if (text.style.fontSize == 2.50 + "em") {
        window.alert("Ja no es pot agrandar mes, has arribat a 2.50em")
    } else {
        fontSize += 0.05;
        text.style.fontSize = fontSize + "em";
    }
}

function reduir() {
    var text = textACanviar();
    if (text.style.fontSize == 0.35 + "em") {
        window.alert("Ja no es pot reduir mes, has arribat a 0.35em");
    } else {
        fontSize -= 0.05;
        text.style.fontSize = fontSize + "em";
    }
}

function original() {
    var text = textACanviar();
    if (text.style.fontSize == 1 + "em") {
        window.alert("El text ja està al tamany original");
    } else {
        text.style.fontSize = "1em";
    }
}