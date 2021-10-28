window.onload = inici;

function inici() {
    mostrarArray();
    document.getElementById("ordenar").addEventListener("click", ordenar);
}

var arrayCoches = [
    "Toyota",
    "Mercedes-Benz",
    "BMW",
    "Honda",
    "Hyundai",
    "Tesla",
    "Ford",
    "Audi",
    "Volkswagen",
    "Porsche",
    "Nissan",
    "Ferrari",
    "KIA",
    "Land Rover",
    "Mini"
];

function mostrarArray() {

    arrayCoches.forEach(element => {
        var li = document.createElement("li");
        var txt = document.createTextNode(element);
        li.appendChild(txt);
        document.getElementById("llistaOrdenada").appendChild(li);
    });

}

function ordenar() {
    arrayCoches.sort();
    arrayCoches.forEach(element => {
        var elemento = document.querySelector("li");
        var pare = elemento.parentNode;
        pare.lastChild.remove(elemento);
    });
    mostrarArray();
}