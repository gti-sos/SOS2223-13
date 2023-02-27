// Tener una ruta dinámica “/cool” que muestre una cara ascii tal como se vió en el L05.
var express = require("express");
var cool = require("cool-ascii-faces");

var app = express();
var port = process.env.PORT || 12345;

app.get("/cool", (request,response) => {
    response.send(cool());
    console.log("New request"); //console.log en el servidor    
});

app.listen(port,()=>{
    console.log(`Server ready in port ${port}`);
});

// ruta de /samples/index-LMG.js
var { luis } = require("./index-LMG.js");
app.get("/samples/index-LMG", (request,response) => {
    response.send(luis());
    console.log("New request"); //console.log en el servidor    
});

// ruta de /samples/index-JLB.js
var { jose } = require("./index-JLB.js");
app.get("/samples/index-JLB", (request,response) => {
    response.send(jose());
    console.log("New request"); //console.log en el servidor    
});

// ruta de /samples/index-IFR.js
var { irene } = require("./index-IFR.js");
app.get("/samples/index-IFR", (request,response) => {
    response.send(irene());
    console.log("New request"); //console.log en el servidor    
});