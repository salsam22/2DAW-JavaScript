window.onload = inici;

function inici() {
    cargarAutores();
    document.getElementById("nouLlibre").addEventListener("click", nouLlibre);
}

function cargarAutores() {
    fetch("https://www.serverred.es/api/libros")
        .then(response => response.json())
        .then(data =>
            carregarAutors(data));
        //.catch(showError);
}

function nouLlibre() {
    window.location.href = "altaLlibres.html";
}

function carregarAutors(data) {
    
    console.log(data);
    data.resultado.forEach((element,index) => {
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
        var txt1 = document.createTextNode(element.titulo)
        td3.appendChild(txt1);
        var td4 = document.createElement("td");
        var txt2 = document.createTextNode(element.editorial)
        td4.appendChild(txt2);
        var td5 = document.createElement("td");
        var txt3 = document.createTextNode(element.precio)
        td5.appendChild(txt3);
        var td6 = document.createElement("td");
        var txt4 = document.createTextNode(element.autor)
        td6.appendChild(txt4);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        var content = document.getElementById("files");
        content.appendChild(tr);
    });
}