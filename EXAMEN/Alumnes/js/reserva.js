window.onload = inicio;
var reserva = new Array();

function inicio() {
    if (JSON.parse(localStorage.getItem("reserva")) != null) {
        reserva = JSON.parse(localStorage.getItem("reserva"));
    }
    mostrarCoche();
    document.getElementById("enviar").addEventListener("click", validar, false);
}

function mostrarCoche() {
    var imagen = document.getElementsByTagName("img")[0];
    imagen.setAttribute("src", "img/"+reserva.coche[0].img);

    var modelo = document.getElementsByTagName("h2")[0];
    var txtModelo = document.createTextNode(reserva.coche[0].modelo)
    modelo.appendChild(txtModelo);

    var precio = document.getElementsByTagName("h2")[1];
    var txtPrecio = document.createTextNode(reserva.coche[0].precio + " €")
    precio.appendChild(txtPrecio);

    var anyo = document.getElementsByTagName("strong")[0];
    var txtAnyo = document.createTextNode(reserva.coche[0].anyo)
    anyo.appendChild(txtAnyo);

    var km = document.getElementsByTagName("strong")[1];
    var txtKm = document.createTextNode(reserva.coche[0].km)
    km.appendChild(txtKm);

    var cambio = document.getElementsByTagName("strong")[2];
    var txtCambio = document.createTextNode(reserva.coche[0].cambio)
    cambio.appendChild(txtCambio);

    var combustible = document.getElementsByTagName("strong")[3];
    var txtCombustible = document.createTextNode(reserva.coche[0].combustible)
    combustible.appendChild(txtCombustible);
}

function validarNombreApellido() {
    esborrarError();
    var element = document.getElementById("nombreApellidos");
    if (!element.checkValidity()) {
        if(element.validity.valueMissing) {
            error2(element, "Error: El nombre es requerido.");
        }
        if(element.validity.patternMismatch) {
            error2(element, "Error: El nombre tiene que tener entre 4 y 40 caracteres i no puede contener caracteres especiales.")
        }
        return false;
    }

    return true;
}

function validarEmail() {
    esborrarError();
    var element = document.getElementById("email");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Error: El correo electronico es requerido.");
        }
        if (element.validity.patternMismatch) {
            error2(element, "Error: El correo electronico tiene que seguir el ejemplo proporcionado.");
        }
        return false;
    }
    
    return true;
}

function validarChecked() {
    var element = document.querySelector("input[id='aceptar']:checked");
    if (!element) {
        error2(element, "Debes aceptar los Términos y condiciones.");
        return false;
    }
    
    return true;
}

function validar(e) {
    if (validarNombreApellido() && validarEmail() && validarChecked() && confirm("Seguro que quieres enviar el formulario?")) {
        pujarLocalStorage();
        location.href = "index.html";
        return true;
    }
    e.preventDefault();
    return false;
}

function error2(element, missatge) {
    document.getElementById("errorMensaje").innerHTML = missatge;
    element.focus();
}

function esborrarError() {
    var formulari = document.forms[0];
    for (var i = 0; i < formulari.elements.length - 1; i++) {
        formulari.elements[i].className = "form-control";
    }
}

function pujarLocalStorage() {
    var nombreApellido = document.getElementById("nombreApellidos").value;
    var email = document.getElementById("email").value;
    var telefono = document.getElementById("telefono").value;
    var nota = document.getElementById("nota").value;

    var cliente = {
        "nombreApellidos":nombreApellido,
        "email": email,
        "telefono": telefono,
        "nota": nota 
    }

    reserva.cliente.push(cliente);

    localStorage.setItem("reserva", JSON.stringify(reserva));

    
}