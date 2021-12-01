let arrPoke = new Array;
window.onload = main;

function main() {
    console.log("Conttol Scrool", document.body.scrollHeight - window.innerHeight, window.scrollY)
        // cridar al api 
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1100&offset=0')
        .then(response => response.json())
        .then(data => {
            //console.log ( data.results);
            arrPoke = data.results;
            //console.log(arrPoke);
            cargarLista();
        });

    window.addEventListener('scroll', onScroll);
}
var aux = 0;

function cargarLista() {
    // recorrer Array
    for (let i = 0; i < 10; i++) {
        cargarPagina(arrPoke[i + aux], i + aux);
    };
    aux += 10;
}

const onScroll = () => {
    if (document.body.scrollHeight - window.innerHeight === window.scrollY) {
        cargarLista();
    }
}

function cargarPagina(element, ind) {

    fetch(element.url)
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            // Afegir dades
            document.getElementById("listado").innerHTML += '<div class="card mb-4">' +
                '<a href="#!"><img class="card-img-top" src="' + data.sprites.front_default + '" alt="..." /></a>' +
                '<div class="card-body">' +
                '<h2 class="card-title">' + data.name + '</h2>' +
                '<div class="row">' +
                '<div class="col p-3 text-center"><strong>Peso: ' + data.weight + ' </strong></div>' +
                '<div class="col p-3 text-center"><strong>Altura: ' + data.height + ' </strong></div>' +
                '</div>' +
                '</div>' +
                '</div>';


        });
};