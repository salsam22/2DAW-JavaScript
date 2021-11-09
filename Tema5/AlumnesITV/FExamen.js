// inici
window.onload = inici;

function inici() {
    document.getElementById("alc").addEventListener("change", prova, false);
    document.getElementById("vlc").addEventListener("change", prova, false);
    document.getElementById("ctl").addEventListener("change", prova, false);
}

function prova() {
    var provincia = document.getElementsByName("provincia");
    var select = document.getElementById("estacio");
    eliminarEstacionsAnteriors();
    for (var i = 0; i < 3; i++) {
        if(provincia[i].checked) {
            estacions[i].estacio.forEach((element,index) => {
                var option = document.createElement("option");
                option.setAttribute("value", index);
                var txtOption = document.createTextNode(element);
                option.appendChild(txtOption);
                select.appendChild(option);
            });
        }
    }
}

function estacionsAlacant() {
    var select = document.getElementById("estacio");
    eliminarEstacionsAnteriors();
    estacions[0].estacio.forEach((element,index) => {
        var option = document.createElement("option");
        option.setAttribute("value", index);
        var txtOption = document.createTextNode(element);
        option.appendChild(txtOption);
        select.appendChild(option);
    });
}

function estacionsValencia() {
    var select = document.getElementById("estacio");
    eliminarEstacionsAnteriors();
    estacions[1].estacio.forEach((element,index) => {
        var option = document.createElement("option");
        option.setAttribute("value", index);
        var txtOption = document.createTextNode(element);
        option.appendChild(txtOption);
        select.appendChild(option);
    });
}

function estacionsCastello() {
    var select = document.getElementById("estacio");
    eliminarEstacionsAnteriors();
    estacions[2].estacio.forEach((element,index) => {
        var option = document.createElement("option");
        option.setAttribute("value", index);
        var txtOption = document.createTextNode(element);
        option.appendChild(txtOption);
        select.appendChild(option);
    });
}

function eliminarEstacionsAnteriors() {
    var select = document.getElementById("estacio");
    for(let i = select.options.length; i>= 0; i--) {
        select.remove(i);
    }
}