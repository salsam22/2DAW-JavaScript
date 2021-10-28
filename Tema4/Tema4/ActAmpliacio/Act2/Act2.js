window.onload = inici;
var arrayTxt = new Array();

function inici() {
    document.getElementById("enviar").addEventListener("click", enviar);
}

function enviar() {
    var ol = document.getElementById("ol");
    var li = document.getElementsByTagName("li");
    arrayTxt = li;

    var numValue = document.getElementById("numValue").value;
    var txtValue = document.getElementById("txtValue").value;
    var array = arrayTxt[numValue];

    var liNou = document.createElement("li");
    var txt = document.createTextNode(txtValue);
    liNou.appendChild(txt);
    ol.appendChild(liNou)

    ol.insertBefore(liNou,array);
    
}
