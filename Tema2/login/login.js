
function dades(){
    var nickname = document.getElementById("usuari").value;
    var passwd = document.getElementById("passwd").value;

    var usu = JSON.parse(localStorage.getItem("Usuari"));
    if (usu == null || usu["nickname"] != nickname) {
        var usuari = {
            nickname: nickname,
            password: passwd
        }
        
        localStorage.setItem("Usuari", JSON.stringify(usuari));
        document.getElementById("h2").innerHTML = "Usuari creat correctament.";
    }
    else if (usu["nickname"] == nickname){
        if (usu["password"] != passwd) {
            document.getElementById("h2").innerHTML = "Contrasenya incorrecta";
            
        } else {
            document.getElementById("h2").innerHTML= "Usuari i contrasenya correcta. BENVINGUT!!";
            document.getElementById("log").style.visibility = "hidden";
        }
    } 
    
}