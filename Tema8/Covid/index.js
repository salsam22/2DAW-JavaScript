window.onload = inici;

function inici() {
    var dataAct = dataActual();
    carregarCovid(dataAct);
}

function dataActual() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

function carregarCovid(dataAct) {
    var request = new XMLHttpRequest();
    request.open("GET", "https://api.covid19tracking.narrativa.com/api/" + dataAct + "/country/spain", true);
    request.send(null);

    request.onload = function () {
        data = JSON.parse(this.response);
        data.dates[dataAct].countries.Spain.regions[6].sub_regions.forEach((element, i) => {
            document.getElementById("total_infectats_" + i).innerText = element.today_confirmed;
            document.getElementById("total_defuncions_" + i).innerText = element.today_deaths;
            document.getElementById("nous_infectats_" + i).innerText = element.today_new_confirmed;
            document.getElementById("noves_defuncions_" + i).innerText = element.today_new_deaths;
            document.getElementById("ultima_act_" + i).innerText = element.date;
        });
    }


}