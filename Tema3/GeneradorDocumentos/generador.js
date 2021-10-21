arrBD = new Array();
arrAux = new Array();
var primerCamp = "";
var segonCamp = "";
var plantilla = "Plantilla.txt";
var basedades = "basedades.csv";

const fs = require("fs")

fs.mkdir("./resultat/",function (err){
    if (err) {
        console.log(err);
    }
});

function obtener(plantilla) {
    return fs.readFileSync(plantilla,"utf-8");
}
var aux = obtener(plantilla);

fs.readFileSync(basedades,"utf8").split(/\r?\n/).forEach(function(line, index){
    if (index == 0) {
        arrBD = line.split(";");
    } else {
        arrAux = line.split(";");
        //procesarFitx(arrBD,arrAux,aux);
    }
});

for (let i = 0; i < arrBD.length; i++) {
    aux = aux.replace(arrBD[i], arrAux[i]);
}

var numRand = Math.floor(Math.random()*1000);
primerCamp = arrAux[0];
segonCamp = arrAux[1];

fs.appendFile("./resultat/"+primerCamp+"_"+segonCamp+"_"+numRand+".txt", aux + "\n", function (err) {
    if (err) {
        console.log(err);
    }
});

function procesarFitx(arrayBD,array,aux) {
    arrayBD.forEach((element,index) => {
        aux.replace(element,array[index]);
        //console.log(element,array[index]);
    })
}
