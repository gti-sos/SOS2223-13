/*
//IMPORTACION DE MODULOS DE LUIS MIGUEL
const { express } = require('./Modularizado/api');
const { cool } = require('./Modularizado/api');
const { bodyParser } = require('./Modularizado/api');
const { app } = require('./Modularizado/api');
const { port } = require('./Modularizado/api');
const { evolution_stats } = require('./Modularizado/api');
const { BASE_API_URL } = require('./Modularizado/api');
const { datos_random } = require('./Modularizado/api');
const { rutaBase } = require('./Modularizado/api');


//MODULOS PARA MODULARIZADO DE JOSE
//const { express } = require('./Modularizado/apiJLB');
//const { cool } = require('./Modularizado/apiJLB');
//const { bodyParser } = require('./Modularizado/apiJLB');
//const { appJLB } = require('./Modularizado/apiJLB');
//const { portJLB } = require('./Modularizado/apiJLB');
const { employment_stats } = require('./Modularizado/apiJLB');
//const { BASE_API_URL } = require('./Modularizado/apiJLB');
const { datos_10 } = require('./Modularizado/apiJLB');
const { rutaRaiz } = require('./Modularizado/apiJLB');

//MODULOS IRENE
//const { express } = require('./Modularizado/apiirene');
//const { bodyParser } = require('./Modularizado/apiirene');
//const { appIFR } = require('./Modularizado/apiirene');
//const { portIFR } = require('./Modularizado/apiirene');
const { localentities_stats } = require('./Modularizado/apiirene');
//const { BASE_API_URL } = require('./Modularizado/apiirene');
const { datos_randomIFR } = require('./Modularizado/apiirene');
const { rutaIrene } = require('./Modularizado/apiirene');

*/

var express = require("express");
//var cool = require("cool-ascii-faces");
var bodyParser = require("body-parser");
var modulo_luis = require('./Modularizado/api');
var modulo_irene = require('./Modularizado/apiirene');
var modulo_jose = require('./Modularizado/apiJLB');
const { application } = require("express");


var app = express();
var port = process.env.PORT || 8080;
app.use(bodyParser.json());
const BASE_API_URL = "/api/v1";
app.use("/",express.static("./public"));

app.get(BASE_API_URL+"/employment-stats/docs2",(req,res)=>{
  //res.redirect(API_POSTMAN);
  res.sendStatus(200);
  console.log("Executed /employment-stats/docs(2) ");
});

modulo_irene(app);
modulo_jose(app);
modulo_luis(app);

//ARRANCAR EL SERVIDOR.
app.listen(port,()=>{
  console.log(`Server f06 ready in port ${port}`);
});



