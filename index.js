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

import express from "express";
import cors from "cors";
//var modulo_luis = require('./Modularizado/api');
//var modulo_irene = require('./Modularizado/apiirene');
import {loadBackendJLB} from './Modularizado/apiJLB.js';
import {loadBackendJLBV2} from './Modularizado/v2/apiJLBV2.js';
import {loadBackendLMMG} from './Modularizado/api.js';
//const { application } = require("express");
import {handler} from "./frontend/build/handler.js";


var app = express();
app.use(cors()); 
var port = process.env.PORT || 8080;
app.use(express.json());
const BASE_API_URL = "/api/v1";
//app.use("/",express.static("./public"));


loadBackendJLB(app);
loadBackendJLBV2(app);
loadBackendLMMG(app);

app.use(handler);


//ARRANCAR EL SERVIDOR.
app.listen(port,()=>{
  console.log(`Server ready in port ${port}`);
});



