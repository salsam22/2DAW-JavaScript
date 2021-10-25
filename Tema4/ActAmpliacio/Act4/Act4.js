window.onload = inici;

function inici() {
    document.getElementById("buscar").addEventListener("click",buscar);

}

function buscar(){
    var palabra = document.getElementById("palabra").value;
    var texto = document.getElementById("text");
    var text = texto.textContent;
    
    console.log(text);
    var coor = text.indexOf(palabra); //retorna la cantitat de caracters que hi ha fins la primera paraula que troba que correspon a la que introdueixes
    console.log(coor);
    
}