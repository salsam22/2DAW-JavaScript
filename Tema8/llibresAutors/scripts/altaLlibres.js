window.onload = inici;

function inici() {
    mostrarAutors();
    document.getElementById("btnGravar").addEventListener("click", gravar, false);
}

function mostrarAutors() {
    
    var select = document.getElementById("autor");
    
    fetch("https://serverred.es/api/autores/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        
    })
        .then(response => response.json())
        .then(data => 
            data.resultado.forEach(element => {
                var option = document.createElement("option");
                var txt = document.createTextNode(element.nombre);
                option.appendChild(txt);
                option.setAttribute("id", element._id);
                select.appendChild(option)
        }))
        .catch(error=>console.log(error));
}

function validarTitol() {
    esborrarError();
    var element = document.getElementById("titol");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Error: El titol es requerit.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "Error: El titol ha de tindre mes de 3 caracters i no pot contenir caracters especials.")
        }
        return false;
    }
    borrarError();
    return true;
}

function validarPreu() {
    esborrarError();
    var element = document.getElementById("preu");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Error: El any es requerit.");
        }
        if (element.validity.rangeUnderflow){
            error2(element, "L'any no pot ser menor de 0.");
        }
        return false;
    }
    borrarError();
    return true;
}

function gravar(e) {
    e.preventDefault();
    if (validarTitol() && validarPreu() && confirm("¿Segur que vols crear a este llibre?")) {
        gravarAPI();
        /*setTimeout(function(){
            tornar();
        },50);*/
        return true;
    } else {
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
    var editorial = " ";
    if (document.getElementById("editorial").value != null) {
        editorial = document.getElementById("editorial").value;
    }
    fetch("https://serverred.es/api/autores/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        
    })
        .then(response => response.json())
        .then(data => 
            data.resultado.forEach(element => {
                var id="";
                if (document.getElementById("autor") == element.nombre) {
                    id = element._id
                }
                var libro = {
                    _id:id,
                    titulo: document.getElementById("titol").value,
                    editorial: editorial,
                    precio: document.getElementById("preu").value
                }
                fetch("https://serverred.es/api/libros/", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'                        
                    },
                    body: JSON.stringify(libro)
                })
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .catch(error=>console.log(error));
        }))
        .catch(error=>console.log(error));
    
    
    
}