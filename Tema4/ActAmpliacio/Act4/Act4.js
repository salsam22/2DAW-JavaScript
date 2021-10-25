window.onload = inici;

function inici() {
    document.getElementById("buscar").addEventListener("click",buscar);

}

function buscar(){
    var palabra = document.getElementById("palabra").value;
    var texto = document.getElementById("text").innerText;
    console.log(typeof(palabra));
    
    console.log(texto);
    var coor = texto.search(palabra);
    console.log(coor);
    
}