window.onload = iniciar;

var p0 = {
    B2: [0, 1],
    B3: [10, 11, 12],
    B4: [20, 21, 22, 23],
    B5: [30, 31, 32, 33, 34]
}

var p1 = {
    B2: [10, 20],
    B3: [7, 17, 27],
    B4: [44, 45, 46, 47],
    B5: [81, 82, 83, 84, 85]
}

var p2 = {
    B2: [1, 11],
    B3: [55, 56, 57],
    B4: [16, 26, 36, 46],
    B5: [99, 98, 97, 96, 95]
}

var partides = [p0, p1, p2];

var aleatorio;
var errors = 0;
var acerts = 0;
var jugades = 0;

function iniciar() {
    aleatorio = Math.floor(Math.random() * (partides.length));
    console.log(partides[aleatorio]);
    pintar_tablero();
    document.getElementById("disparar").addEventListener("click", miDisparo);
    document.getElementById("New").addEventListener("click", Nova_Partida);
}

function pintar_tablero() {

    var campo = document.getElementById("campo");
    var aux;
    aux = "<tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th><th>H</th><th>I</th><th>J</th></tr>";

    for (let i = 0; i < 10; i++) {
        aux += "<tr><th>" + (i + 1) + "</th>";
        campo.innerHTML += "<tr>";
        for (let j = 0; j < 10; j++) {
            aux += "<td id=" + i + j + ">X</td>";
        }
        aux += "</tr>";
    }

    campo.innerHTML = aux;

}

function miDisparo() {
    var horizontal = document.getElementById("horizontal");
    var vertical = document.getElementById("vertical");
    console.log(horizontal.value, vertical.value);
    document.getElementById(horizontal.value + vertical.value).innerHTML = "<td></td>";
    
    for (element in partides[aleatorio]) {
        partides[aleatorio][element].forEach(coordenades => {
            if (coordenades == horizontal.value + vertical.value) {
                document.getElementById(horizontal.value + vertical.value).innerHTML = element;
                acerts++;
            }
        });
    }

    jugades++;
    errors = jugades - acerts;
    document.getElementById("errors").innerHTML = errors;
    document.getElementById("acerts").innerHTML = acerts;

    if (acerts == 14) {
        window.alert("HAS GUANYAT, ENHORABONA!!! SI VOLS TORNAR A INTENTAR-HO, CLICA SOBRE NOVA PARTIDA")
    } else if (errors == 10) {
        window.alert("HAS PERDUT!!! SI VOLS TORNAR A INTENTAR-HO, CLICA SOBRE NOVA PARTIDA")
    }
}

function Nova_Partida() {
    location.reload();
}