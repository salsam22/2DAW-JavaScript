window.onload = iniciar;

function iniciar() {
    document.getElementById("enviar").addEventListener("click",validar,false);
}

function validarNom() {
    var element = document.getElementById("nom");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element,"Deus introduïr un nom.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "El nom ha de tindre entre 2 i 14 caracters.")
        }
        //error(element);
        return false;
    }
    return true;
}    

function validarNeix() {
    var element = document.getElementById("neix");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element,"Deus introduïr una data.");
        }
        if (element.validity.rangeOverflow) {
            error2(element, "La data mínima ha de ser superior al 01/01/1900.")
        }
        if (element.validity.rangeUnderflow) {
            error2(element, "La data màxima ha de ser inferior al 31/12/2020.")
        }
        //error(element);
        return false;
    }
    return true;
}

function validarTel() {
    var element = document.getElementById("tel");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Deus introduïr un telèfon.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "El telèfon ha de tindre el format 999 999 999.")
        }
        //error(element);
        return false;
    }
    return true;
}

function validar(e) {
    esborrarError();
    if (validarNom() && validarNeix() && validarTel() && confirm("Confirma si vols enviar el formulari")) {
        return true;
    } else {
        e.preventDefault();
        return false;
    }
}

function error2(element, missatge) {
    document.getElementById("missatgeError").innerHTML = missatge;
    element.className = "error";
    element.focus();
}

function esborrarError() {
    var formulari = document.forms[0];
    for (let i = 0; i < formulari.elements.length; i++) {
        formulari.elements[i].className = "";
        
    }
}