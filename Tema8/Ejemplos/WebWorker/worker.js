

self.addEventListener("message", function(e) {
    console.log("el jefe diu " + e.data);
    hora = new Date();
    this.self.postMessage("Hola jefe bonico l'hora actual és" + hora);
})