window.onload = inicio;

function inicio() {
    mostrarUsuario();
    mostrarIndex();
}

function mostrarIndex() {
    fetch("https://news.serverred.es/api/articles", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            var token = JSON.parse(localStorage.getItem("TK"))
            borrarTodo();

            var array = data.resultado
            array.reverse();

            array.forEach(element => {
                if (element.deleted == false) {


                    var divPare = document.createElement("div");
                    divPare.setAttribute("class", "card mb-2");

                    var div1 = document.createElement("div");
                    div1.setAttribute("class", "card-body");

                    var h5 = document.createElement("h5");
                    h5.setAttribute("class", "card-title");
                    h5.innerText = element.title;

                    var p = document.createElement("p");
                    p.setAttribute("class", "card-title");
                    p.innerText = element.body;

                    div1.appendChild(h5)
                    div1.appendChild(p)

                    var div2 = document.createElement("div");
                    div2.setAttribute("class", "card-body");

                    var span = document.createElement("span");
                    span.innerHTML = "&nbsp;<i class='bi bi-star-fill'></i>&nbsp;" + element.voteScore;
                    var span1 = document.createElement("span");
                    span1.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;<i class='bi bi-tag'></i> " + element.category;
                    var span2 = document.createElement("span");
                    span2.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;<i class='bi bi-person-fill'></i>" + element.author;
                    var span3 = document.createElement("span");
                    span3.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;<i class='bi bi-calendar-event'></i>" + fechaCorrecta(element.timestamp) + ", " + horaCorrecta(element.timestamp);

                    var a = document.createElement("a");
                    a.setAttribute("href", "#");
                    a.setAttribute("class", "text-decoration-none");
                    a.innerHTML = "&nbsp;&nbsp;&nbsp;<i class='bi bi-emoji-smile'></i>"
                    a.setAttribute("id", element._id);
                    a.setAttribute("onclick", "up(this)")
                    var a1 = document.createElement("a");
                    a1.setAttribute("href", "#");
                    a1.setAttribute("class", "text-decoration-none");
                    a1.innerHTML = "&nbsp;<i class='bi bi-emoji-angry'></i>&nbsp;&nbsp;"
                    a1.setAttribute("id", element._id);
                    a1.setAttribute("onclick", "down(this)")

                    div2.appendChild(span)
                    div2.appendChild(span1)
                    div2.appendChild(span2)
                    div2.appendChild(span3)
                    div2.appendChild(a)
                    div2.appendChild(a1)

                    if (token != null) {

                        var a2 = document.createElement("a");
                        a2.setAttribute("href", "#");
                        a2.setAttribute("class", "text-decoration-none");
                        a2.innerHTML = "<i class='bi bi-trash'></i>Eliminar"
                        a2.setAttribute("id", element._id);
                        a2.setAttribute("onclick", "eliminar(this)")
                        div2.appendChild(a2)

                    }

                    divPare.appendChild(div1)
                    divPare.appendChild(div2)

                    var root = document.getElementById("root");
                    root.appendChild(divPare)
                }
            });
        })
}

function eliminar(elem) {
    id = elem.id;

    fetch('https://news.serverred.es/api/articles/' + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            "auth-token": JSON.parse(localStorage.getItem("TK"))
        }
    })
        .then(response => response.json())
        .then(data => {
            mostrarIndex();
        })
        .catch((error) => {
            console.error('Error:', error);
        })
}

function down(elem) {
    id = elem.id;

    var down = {
        "vote": "downVote"
    }

    fetch('https://news.serverred.es/api/articles/' + id, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
            "auth-token": JSON.parse(localStorage.getItem("TK"))
        },
        body: JSON.stringify(down)
    })
        .then(response => response.json())
        .then(data => {
            mostrarIndex();
        })
        .catch((error) => {
            console.error('Error:', error);
        })
}

function up(elem) {
    id = elem.id;

    var up = {
        "vote": "upVote"
    }

    fetch('https://news.serverred.es/api/articles/' + id, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
            "auth-token": JSON.parse(localStorage.getItem("TK"))
        },
        body: JSON.stringify(up)
    })
        .then(response => response.json())
        .then(data => {
            mostrarIndex();
        })
        .catch((error) => {
            console.error('Error:', error);
        })
}

function fechaCorrecta(fecha) {
    var date = new Date(fecha);

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    if (month < 10) {
        if (day < 10) {
            return (0 + day + "/" + 0 + month + "/" + year)
        } else {
            return (day + "/" + 0 + month + "/" + year)
        }
    } else {
        return (day + "/" + month + "/" + year)
    }

}

function horaCorrecta(fecha) {
    var date = new Date(fecha);
    var horas = date.getHours();
    var minutos = date.getMinutes();
    if (horas < 10) {
        horas = "0" + horas;
    }
    if (minutos < 10) {
        minutos = "0" + minutos;
    }
    var hora = horas + ":" + minutos;
    return hora;
}

function borrarTodo() {
    var files = document.getElementById("root");
    do {
        files.firstChild.remove();
    } while (files.lastChild);
}

function mostrarUsuario() {
    fetch('https://news.serverred.es/api/areapersonal', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            "auth-token": JSON.parse(localStorage.getItem("TK"))
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.error == null) {
                let nom = document.getElementById("user");
                nom.innerHTML = data.data.user.name;
            } else {
                console.log("ERROR");
                console.log(data.error);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        })
}