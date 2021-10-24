window.onload = inici;

function inici() {
    document.getElementById("buscar").addEventListener("click",buscar);

}

function buscar(){
    var palabra = document.getElementById("palabra").value;
    var texto = document.getElementById("text").innerHTML;
    console.log(typeof(palabra));
    
    console.log(texto);
    var coor = texto.indexOf(palabra);
    console.log(coor);
}