window.onload = inici;

function inici() {
    cargarReservas();

}

function cargarReservas() {
    fetch("https://serverred.es/api/reservas")
        .then(Response => Response.json())
        .then(data => mostrarReservas(data));
}

function mostrarReservas(data) {
    data.resultado.forEach((element, index) => {
        var tr = document.createElement("tr");
        var td2 = document.createElement("td");
        var txt1 = document.createTextNode(element.usuario);
        td2.appendChild(txt1);
        var td3 = document.createElement("td");
        var txt2 = document.createTextNode(element.libro)
        td3.appendChild(txt2);
        var td4 = document.createElement("td");
        var txt3 = document.createTextNode(element.fecha)
        td4.appendChild(txt3);
        var td5 = document.createElement("td");
        var txt4 = document.createTextNode(element.fechaDevolucion)
        td5.appendChild(txt4);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        var files = document.getElementById("files");
        files.appendChild(tr);
        function checkboxSelected() {
            var checked = check.checked;
            if (checked) {
                localStorage.setItem("Usuario", JSON.stringify(element));
                window.location.href = "reservarLlibre.html";
            }
        }
    });
}