window.onload = inici;


function inici() {
    document.getElementById("nom").addEventListener("blur", validarNom, false)
    document.getElementById("anynaix").addEventListener("blur", validarAny, false)
    document.getElementById("btnGravar").addEventListener("click", gravar, false);
}

function validarNom() {
    esborrarError();
    var element = document.getElementById("nom");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Error: El nom es requerit.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "Error: El nom ha de tindre entre 2 y 60 caracters i no pot contindre caracters especials.")
        }
        return false;
    }

    borrarError();
    return true;
}

function validarAny() {
    esborrarError();
    var element = document.getElementById("anynaix");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Error: El any es requerit.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "Error: El any ha de tenir el seguent format: dd-mm-yyyy o dd/mm/yyyy.")
        }
        
        return false;
    }

    borrarError();
    return true;
}

function gravar(e) {
    if (validarNom() && validarAny() && confirm("¿Segur que vols crear a este autor?")) {
        gravarAPI();
        return true;
    } else {
        console.log("no");
        e.preventDefault();
        return false;
    }
}                                                           

function error2(element, missatge) {
    document.getElementById("missatgeError").innerHTML = missatge;
    element.className = "form-control border-danger";
    element.focus();
}

function esborrarError() {
    var formulari = document.forms[0];
    for (var i = 0; i < formulari.elements.length - 1; i++) {
        formulari.elements[i].className = "form-control";
    }
}

function borrarError() {
    document.getElementById("missatgeError").innerHTML = "";
}

function gravarAPI() {
    console.log("jpald");
    autor = {

        nombre: document.getElementById("nom").value,
        año_nacimiento: document.getElementById("any").value
    }

    fetch('https://serverred.es/api/autores/', {


        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(autor)


    })


    .then(response => response.json())
        .then(data => {



        })
        .catch((error) => {
            location.href = "Error.html";
        });

}