window.onload = inici;

function inici() {
    document.getElementById("Mostrar1").addEventListener("click", mostrar1);
    document.getElementById("Mostrar2").addEventListener("click", mostrar2);
}

function text1() {
    var txt = document.getElementById("1");
    return txt;
}

function text2() {
    var txt = document.getElementById("2");
    return txt;
}

function mostrar1() {
    var txt = text1();
    if (txt.style.visibility == "hidden") {
        txt.style.visibility = "visible";   
    } else if (txt.style.visibility == "visible") {
        txt.style.visibility = "hidden";
    }
}

function mostrar2() {
    var txt = text2();
    if (txt.style.visibility == "hidden") {
        txt.style.visibility = "visible";   
    } else if (txt.style.visibility == "visible") {
        txt.style.visibility = "hidden";
    }
}
