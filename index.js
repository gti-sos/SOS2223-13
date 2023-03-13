//IMPORTACION DE MODULOS DE LUIS MIGUEL
const { express } = require('./Modularizado-LMG/api');
const { cool } = require('./Modularizado-LMG/api');
const { bodyParser } = require('./Modularizado-LMG/api');
const { app } = require('./Modularizado-LMG/api');
const { port } = require('./Modularizado-LMG/api');
const { evolution_stats } = require('./Modularizado-LMG/api');
const { BASE_API_URL } = require('./Modularizado-LMG/api');
const { datos_random } = require('./Modularizado-LMG/api');
const { rutaBase } = require('./Modularizado-LMG/api');
/*
//MODULOS PARA MODULARIZADO DE JOSE
//const { express } = require('./Modularizado-JLB/apiJLB');
//const { cool } = require('./Modularizado-JLB/apiJLB');
//const { bodyParser } = require('./Modularizado-JLB/apiJLB');
//const { appJLB } = require('./Modularizado-JLB/apiJLB');
//const { portJLB } = require('./Modularizado-JLB/apiJLB');
const { employment_stats } = require('./Modularizado-JLB/apiJLB');
//const { BASE_API_URL } = require('./Modularizado-JLB/apiJLB');
const { datos_10 } = require('./Modularizado-JLB/apiJLB');
const { rutaRaiz } = require('./Modularizado-JLB/apiJLB');

//MODULOS IRENE
//const { express } = require('./Modularizado-IFR/apiirene');
//const { bodyParser } = require('./Modularizado-IFR/apiirene');
//const { appIFR } = require('./Modularizado-IFR/apiirene');
//const { portIFR } = require('./Modularizado-IFR/apiirene');
const { localentities_stats } = require('./Modularizado-IFR/apiirene');
//const { BASE_API_URL } = require('./Modularizado-IFR/apiirene');
const { datos_randomIFR } = require('./Modularizado-IFR/apiirene');
const { rutaIrene } = require('./Modularizado-IFR/apiirene');*/




/*var express = require("express");
var cool = require("cool-ascii-faces");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 8080;
app.use(bodyParser.json());
const BASE_API_URL = "/api/v1";*/




//ARRANCAR EL SERVIDOR.
app.listen(port,()=>{
  console.log(`Server ready in port ${port}`);
});



