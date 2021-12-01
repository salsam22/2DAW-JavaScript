var worker = new Worker("worker.js");

worker.addEventListener("message", function(e) {
    alert("el meu treballador diu que son les " + e.data)
})

worker.postMessage("quina hora és??");