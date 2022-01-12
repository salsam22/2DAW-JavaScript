window.onload = inici;
var arrayAutores = new Array();

function inici() {
    cargarAutores();
    document.getElementById("titol").addEventListener("keyup", carregarFiltre);
}

function carregarFiltre() {
    var filtro = document.getElementById("titol").value;
    if (filtro == "") {
        cargarLlibros();
    } else {
        fetch("https://www.serverred.es/api/libros/titulo/" + filtro)
            .then(response => response.json())
            .then(data => mostrarLibros(data));
    }
}

function cargarAutores() {
    fetch("https://www.serverred.es/api/autores")
        .then(response => response.json())
        .then(data => {
            arrayAutores = data.resultado;
            carregarFiltre();
        });
}

function cargarLlibros() {
    fetch("https://www.serverred.es/api/libros")
        .then(response => response.json())
        .then(data => mostrarLibros(data));
}

function mostrarLibros(data) {
    var usuario = "";

    //document.getElementById("files").lastChild.parentNode.removeChild(document.getElementById("files").lastChild)

    var files = document.getElementById("files");
    var cantidad = files.childElementCount - 1;
    do {
        files.firstChild.remove();
    } while (files.lastChild)

    if (JSON.parse(localStorage.getItem("Usuario")) != null) {
        usuario = JSON.parse(localStorage.getItem("Usuario"));
    }
    var nombre = document.getElementById("usuari");
    nombre.innerText = usuario.nombre + " - " + usuario.email;
    data.resultado.forEach((element, index) => {
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var check = document.createElement("input");
        check.setAttribute("type", "checkbox");
        check.setAttribute("id", index)
        check.addEventListener("change", checkboxSelected, false);
        td1.appendChild(check);
        var td2 = document.createElement("td");
        var txt1 = document.createTextNode(element.titulo);
        td2.appendChild(txt1);
        var td3 = document.createElement("td");
        var txt2 = document.createTextNode(element.editorial)
        td3.appendChild(txt2);
        var td4 = document.createElement("td");
        var txt3 = document.createTextNode(element.precio)
        td4.appendChild(txt3);
        var td5 = document.createElement("td");
        var txt4 = document.createTextNode(obtenerNombreAutor(element.autor))
        td5.appendChild(txt4);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        var files = document.getElementById("files");
        files.appendChild(tr);
        function checkboxSelected() {
            var checked = check.checked;
            if (checked) {
                localStorage.setItem("Libro", JSON.stringify(element));
                window.location.href = "reservarConfirmar.html";
            }
        }
    });
}

function obtenerNombreAutor(id) {
    var aux = "Autor no encontrado";
    arrayAutores.forEach(element => {
        if (element._id == id) {
            aux = element.nombre;
        }
    });
    return aux;
}