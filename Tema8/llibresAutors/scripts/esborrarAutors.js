function esborrarAutor(element) {
    console.log(element);
    fetch("https://serverred.es/api/autores/" + element.id, {
        method: "DELETE"
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error=>console.log(error));

    }

