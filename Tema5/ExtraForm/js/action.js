// la imatge de la esquerra ha de canviar quan canvia el desplegable. 
window.onload = inici;

function inici() {
    document.getElementById("tipo").addEventListener("change", cambiarImagen, false);
    document.getElementById("serie").addEventListener("blur", validarNumeroSerie, false);
    document.getElementById("mostrarDescripcio").addEventListener("click", mostrarDescripcio, false);
    document.getElementById("descripcio").addEventListener("keyup", contarPalabras, false);
    document.getElementById("descripcio").addEventListener("blur", validarDescripcio, false);
    document.getElementById("enviar").addEventListener("click", validar, false);
    
}

function cambiarImagen() {
    var img = document.getElementById("imagen");
    var select = document.getElementById("tipo").value;
    img.setAttribute("src", "img/"+select+".jpg");
}
//s'hha de validar el número de serie per a que el numero cumplisca 
// les seguent regles : 3 numeros inicials, 4 lletres en majúscules
// i acabar amb el níumero 1 o 2 , o amb la lletra A

function validarNumeroSerie() {
    esborrarError();
    var pattern = /^\d{3}[A-Z]{4}([1-2]|[A])$/;
    var element = document.getElementById("serie");
    if (pattern.test(element.value)) {
        borrarError();
        return true;
    } else {
        error2(element, "Error: Numero de serie incompleto o invalido. Comprueba que sea: 3 numeros, 4 letras mayusculas y un 1, o un 2, o una A mayuscula.")
        return false;
    }
}

function error2(element, missatge) {
    document.getElementById("capaError").innerHTML = missatge;
    element.className = "error";
    element.focus();
}

function esborrarError() {
    var formulari = document.forms[0];
    for (let i = 0; i < formulari.elements.length; i++) {
        formulari.elements[i].className = "";
    }
}

//  Al clickar en mostrar Descripció apareixà el text area per poder excriure les dades.
// cada vegada que s'escriga una paraula al text area s'ha de contar el númerode paraules.
 
function mostrarDescripcio() {
    var element = document.getElementById("fDescripcio");
    element.setAttribute("style", "display:block;");
    var element2 = document.getElementById("descripcio");
    element2.setAttribute("required", "required");
}

function contarPalabras() {
    var texto = document.getElementById("descripcio").value;
    texto = texto.replace (/\r?\n/g," ");
    texto = texto.replace (/[ ]+/g," ");
    texto = texto.replace (/^ /,"");
    texto = texto.replace (/ $/,"");
    var textoTroceado = texto.split (" ");
    var numero = textoTroceado.length;
    var numeroPalabras = document.getElementById("descripcion");
    var text = document.createTextNode("Descripció. " + numero + " palabras.");
    numeroPalabras.removeChild(numeroPalabras.lastChild);
    numeroPalabras.appendChild(text);
}

function validarDescripcio() {
    esborrarError();
    var element = document.getElementById("descripcio");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Error: La descripcion es requerida.");
        }
        return false;
    }
    borrarError();
    return true;
}

function validar(e) {
    esborrarError();
    if (validarNumeroSerie() && validarDescripcio() && confirm("Seguro que quieres enviar el formulario???")) {
        return true;
    } else {
        e.preventDefault();
        return false;
    }
}

function borrarError() {
    document.getElementById("capaError").innerHTML = "";
}