window.onload = inici;

function inici() {
    
    document.getElementById("inicio").addEventListener("click", inicio);
    document.getElementById("cancelar").addEventListener("click", cancelar);
    
}

function inicio() {
    var seg = 30;
    var novaP = document.createElement("p");
  
    setInterval(function(){
     
        var text = document.createTextNode(seg);

       
        novaP.appendChild(text);

        

        document.body.appendChild(novaP);
        
      
        console.log(seg);
        seg--;
       
        novaP.replaceChildren(text);
        
    },1000);

}