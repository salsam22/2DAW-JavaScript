window.onload = inicio;

var comunitats = [{
    "comunitat": "Andalucía",
    "provincies": [
        "Almería",
        "Cádiz",
        "Córdoba",
        "Granada",
        "Jaén",
        "Huelva",
        "Málaga",
        "Sevilla"
    ]
},
{
    "comunitat": "Aragón",
    "provincies": [
        "Huesca",
        "Teruel",
        "Zaragoza"
    ]
},
{
    "comunitat": "Canarias",
    "provincies": [
        "Las Palmas",
        "Santa Cruz de Tenerife"
    ]
},
{
    "comunitat": "Cantabria",
    "provincies": [
        "Cantabria"
    ]
},
{
    "comunitat": "Castilla y León",
    "provincies": [
        "Ávila",
        "Burgos",
        "León",
        "Palencia",
        "Salamanca",
        "Segovia",
        "Soria",
        "Toledo",
        "Zamora"
    ]
},
{
    "comunitat": "Castilla-La Mancha",
    "provincies": [
        "Albacete",
        "Ciudad Real",
        "Cuenca",
        "Guadalajara",
        "Valladolid",
    ]
},
{
    "comunitat": "Cataluña",
    "provincies": [
        "Barcelona",
        "Girona",
        "Lleida",
        "Tarragona"
    ]
},
{
    "comunitat": "Ceuta",
    "provincies": [
        "Ceuta"
    ]
},
{
    "comunitat": "Comunidad Valenciana",
    "provincies": [
        "Alicante",
        "Castellón",
        "Valencia"
    ]
},
{
    "comunitat": "Comunidad de Madrid",
    "provincies": [
        "Madrid"
    ]
},
{
    "comunitat": "Extremadura",
    "provincies": [
        "Badajoz",
        "Cáceres"
    ]
},
{
    "comunitat": "Galicia",
    "provincies": [
        "La Coruña",
        "Lugo",
        "Orense",
        "Pontevedra"
    ]
},
{
    "comunitat": "Islas Baleares",
    "provincies": [
        "Islas Baleares"

    ]
},
{
    "comunitat": "La Rioja",
    "provincies": [
        "La Rioja"

    ]
},
{
    "comunitat": "País Vasco",
    "provincies": [
        "Álava",
        "Guipúzcoa",
        "Vizcaya"
    ]
},
{
    "comunitat": "Navarra",
    "provincies": [
        "Navarra"
    ]
},
{
    "comunitat": "Melilla",
    "provincies": [
        "Melilla"
    ]
},
{
    "comunitat": "Principado de Asturias",
    "provincies": [
        "Asturias"
    ]
},
{
    "comunitat": "Región de Murcia",
    "provincies": [
        "Murcia"
    ]
},
];

function inicio() {
    mostrarComunitats();
}

function mostrarComunitats() {
    
    var select = document.getElementById("comunitats");
    comunitats.forEach((element,index) => {
        var option = document.createElement("option");
        option.setAttribute("value", index);
        var txt = document.createTextNode(element.comunitat);
        option.appendChild(txt);
        select.appendChild(option);
    });
    obtenirComunitat()
}

function obtenirComunitat() {
    document.getElementById("comunitats").addEventListener("change", mostrarProvincies);
}

function mostrarProvincies(){
    var num = document.getElementById("comunitats").value;
    eliminarProvinciesAnteriors();
    var select = document.getElementById("provincies");
    comunitats[num].provincies.forEach((element,index) => {
        var option = document.createElement("option");
        option.setAttribute("value", index);
        var txtOption = document.createTextNode(element);
        option.appendChild(txtOption);
        select.appendChild(option);
    });
}

function eliminarProvinciesAnteriors() {
    var select = document.getElementById("provincies");
    for (let i = select.options.length; i >= 0; i--) {
        select.remove(i);
    }
}
