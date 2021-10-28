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
    nomComunitats();
}

function nomComunitats() {
    var div = document.createElement("div");
    var select = document.createElement("select");
    select.setAttribute("id", "comunitat");
    comunitats.forEach((element,index) => {
        var option = document.createElement("option");
        option.setAttribute("value", index);
        var txt = document.createTextNode(element.comunitat);
        option.appendChild(txt);
        select.appendChild(option);
    });
    div.appendChild(select);
    document.body.appendChild(div);
    nomProvincies()
}

function nomProvincies() {
    var select = document.getElementById("comunitat");
    var num;
    var div = document.createElement("div");
    var newSelect = document.createElement("select");
    select.addEventListener("change", function () {
        var selectedOption = this.options[select.selectedIndex];
        num = selectedOption.value;
        console.log(num)
        for (let i = 0; i < comunitats[num].provincies.length; i++) {
            var option = document.createElement("option");
            option.setAttribute("value", i);
            var txt = document.createTextNode(comunitats[num].provincies[i]);
            option.appendChild(txt);
            select.appendChild(option);
            
        }
        



    });
    div.appendChild(newSelect);
    document.body.appendChild(div);


















    /*select.addEventListener("change", function () {
        var selectedOption = this.options[select.selectedIndex];
        console.log(selectedOption.text);
        nomComunitat = selectedOption.text;
    });*/
    console.log();











    /*var div = document.createElement("div");
    var select = document.createElement("select");
    for (let j = 0; j < comunitats[j].provincies.length; j++) {   
        var id = document.getElementById(comunitats[j].comunitat);
        console.log(id);
        var option = document.createElement("option");
        var txt = document.createTextNode(comunitats[j].provincies);
        option.appendChild(txt);
        select.appendChild(option);
    }  
    div.appendChild(select);
    document.body.appendChild(div);*/
}