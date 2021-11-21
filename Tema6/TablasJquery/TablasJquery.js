$(document).ready(inicio);

var contador1 = 1;
var contador2 = 1;

function inicio() {
    $("#main").append("<table>");
    $("table").append("<td id=titulo colspan=5>Tablas de multiplicar");
    for (var i = 1; i <= 100; i++) {
        if (i % 2 != 0) {
            $("table").append("<tr class=impar id=fila" + i + ">");
        } else {
            $("table").append("<tr id=fila" + i + ">");
        }
    }

    for (var j = 0; j < 3; j++) {
        $("tr").append("<td id=columna" + j + ">");
    }

    for (var i = 1; i <= 100; i++) {
        for (var j = 0; j < 3; j++) {
            if (j == 0) {
                $("#fila" + i + "").children("#columna" + j + "").text(contador1);
                if (i % 10 == 0) {
                    contador1++;
                }
            } else if (j == 1) {
                if (contador2 > 10) {
                    contador2 = 1;
                }
                $("#fila" + i + "").children("#columna" + j + "").text(contador2);
                contador2++;
            } else if (j == 2) {
                $("#fila" + i + "").children("#columna" + j + "").text(parseInt($("#fila" + i + "").children("#columna0").text()) * parseInt($("#fila" + i + "").children("#columna1").text()));
            }
        }
    }
}