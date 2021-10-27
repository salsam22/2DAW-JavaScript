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
    selects();
}

function selects() {
    var div = document.createElement("div");
    var select = document.createElement("select");
    for (let i = 0; i < comunitats.length; i++) {
        for (let j = 0; j < comunitats.length; j++) {
            var option = document.createElement("option");
            /*var value = document.createAttribute("value", comunitats[0]);
            option.appendChild(value);*/
            var txt = document.createTextNode(comunitats.comunitat);    
            option.appendChild(txt);
            select.appendChild(option);
        }
        
    }
    div.appendChild(select);
    document.body.appendChild(div);
        

    
}