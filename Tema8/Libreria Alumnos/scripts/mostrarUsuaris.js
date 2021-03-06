window.onload = inici;

function inici() {
    cargarUsuarios();

}

function cargarUsuarios() {
    fetch("https://serverred.es/api/usuarios")
        .then(Response => Response.json())
        .then(data => mostrarUsuarios(data));
}

function mostrarUsuarios(data) {
    data.resultado.forEach((element, index) => {
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var check = document.createElement("input");
        check.setAttribute("type", "checkbox");
        check.setAttribute("id", index)
        check.addEventListener("change", checkboxSelected, false);
        td1.appendChild(check);
        var td2 = document.createElement("td");
        var txt1 = document.createTextNode(element.nombre);
        td2.appendChild(txt1);
        var td3 = document.createElement("td");
        var txt2 = document.createTextNode(element.telefono)
        td3.appendChild(txt2);
        var td4 = document.createElement("td");
        var txt3 = document.createTextNode(element.email)
        td4.appendChild(txt3);
        var td5 = document.createElement("td");
        var txt4 = document.createTextNode(element.direccion)
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
                localStorage.setItem("Usuario", JSON.stringify(element));
                window.location.href = "reservarLlibre.html";
            }
        }
    });
}

