window.onload = inici;

function inici() {
    cargarAutores();
}

function cargarAutores() {
    fetch("https://www.serverred.es/api/autores")
        .then(response => response.json())
        .then(data =>
            carregarAutors(data));
        //.catch(showError);
}

function carregarAutors(data) {
    
    console.log(data);
    data.resultado.forEach(element => {
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var buttonEsborrar = createButton("Esborrar");
        td1.appendChild(buttonEsborrar);
        var td2 = document.createElement("td");
        var buttonModificar = createButton("Modificar");
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

function createButton(message) {
    var button = document.createElement("button");
    button.setAttribute("class", "btn btn-primary btn-lg my-3");
    button.setAttribute("id", message);
    var txt = document.createTextNode(message);
    button.appendChild(txt);
    return button;
}