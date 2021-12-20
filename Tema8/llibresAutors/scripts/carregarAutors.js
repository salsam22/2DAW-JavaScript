window.onload = inici;

function inici() {
    cargarAutores();
    document.getElementById("nouAutor").addEventListener("click", nouAutor);
}

function cargarAutores() {
    fetch("https://www.serverred.es/api/autores")
        .then(response => response.json())
        .then(data =>
            carregarAutors(data));
        //.catch(showError);
}

function nouAutor() {
    window.location.href = "altaAutors.html";
}

function carregarAutors(data) {
    data.resultado.forEach(element => {
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var buttonEsborrar = document.createElement("button");
        buttonEsborrar.setAttribute("class", "btn btn-primary btn-lg my-3");
        buttonEsborrar.setAttribute("id", element._id);
        buttonEsborrar.setAttribute("onclick", "esborrarAutor(this)")
        var txt = document.createTextNode("Esborrar");
        buttonEsborrar.appendChild(txt);
        td1.appendChild(buttonEsborrar);
        var td2 = document.createElement("td");
        var buttonModificar = document.createElement("button");
        buttonModificar.setAttribute("class", "btn btn-primary btn-lg my-3");
        buttonModificar.setAttribute("id", element._id);
        buttonModificar.setAttribute("onclick", "modificarAutor(this)");
        var txt = document.createTextNode("Modificar");
        buttonModificar.appendChild(txt);
        td2.appendChild(buttonModificar);
        var td3 = document.createElement("td");
        var txt1 = document.createTextNode(element.nombre)
        td3.appendChild(txt1);
        var td4 = document.createElement("td");
        var txt2 = document.createTextNode(element.año_nacimiento)
        td4.appendChild(txt2);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        var content = document.getElementById("files");
        content.appendChild(tr);
    });
}