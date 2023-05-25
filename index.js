console.log("A"); import express from "express";
import cors from "cors";
import request from "request";
import {loadBackendJLB} from './Modularizado/apiJLB.js';
import {loadBackendJLBV2} from './Modularizado/v2/apiJLBV2.js';
import {loadBackendLMMG} from './Modularizado/api.js';
import {loadBackendLMMGV2} from './Modularizado/v2/apiLMMGV2.js';
import {loadBackendIFR} from './Modularizado/apiirene.js';
import {loadBackendIFRV2} from './Modularizado/v2/apiireneV2.js';

import {handler} from "./frontend/build/handler.js";

console.log("B");
var app = express();
app.use(cors()); 
var port = process.env.PORT || 8080;
app.use(express.json()); //bodyParser
//Proxy LUIS MIGUEL:
var paths = "/agro";
var apiServerHost = "https://sos2223-12.ew.r.appspot.com/api/v2/agroclimatic";
app.use(paths, function(req, res) {
  //console.log("C"); 
  var url = apiServerHost + req.url;
  req.pipe(request(url)).pipe(res);
});
console.log("D");
//app.use("/",express.static("./public"));



//Proxy Jose López
//"http://localhost:8080/job" para testear sin hacer push que el proxy funciona
var paths2 = "/job";
var apiServerHost2 = "https://sos2223-15.appspot.com/api/v1/jobseekers-studies";

app.use(paths2, function(req2, res2) {
    var url2 = apiServerHost2 + req2.url;
    req2.pipe(request(url2)).pipe(res2);
});



//Proxy Irene:
var paths3 = "/hire";
var apiServerHost3 = "https://sos2223-23.appspot.com/api/v2/hired-people";
app.use(paths3, function(req3, res3) {
  //console.log("C"); 
  var url3 = apiServerHost3 + req.url3;
  req3.pipe(request(url3)).pipe(res3);
});


loadBackendJLB(app);
loadBackendJLBV2(app);
loadBackendLMMG(app);
loadBackendLMMGV2(app);
loadBackendIFR(app);
loadBackendIFRV2(app);

app.use(handler);


//VERIFICAR SI METODO POST ES A ESA URL
app.use((req, res, next) => {
  // Verificar si la solicitud es un POST y si no es en la ruta correcta
  if (req.method === 'POST' && req.originalUrl !== '/api/v2/evolution-stats') {
    res.status(405).json('Método no permitido');
    return;
  }

  // Enviar una respuesta con un código de estado 404 Not Found si la ruta no se encuentra
  res.status(404).json('La ruta solicitada no existe');
});

//ARRANCAR EL SERVIDOR.
app.listen(port,()=>{
  console.log(`Server ready in port ${port}`);
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
  // Enviar una respuesta con un código de estado 400 Bad Request si hay un error de sintaxis en el JSON
  res.status(400).json('La solicitud contiene un JSON no válido');
  } else if (err.status === 401) {
  // Enviar una respuesta con un código de estado 401 Unauthorized si no se proporcionó un token de autenticación válido
  res.status(401).json('No se proporcionó un token de autenticación válido');
  } else {
  // Enviar una respuesta con un código de estado 500 Internal Server Error si ocurrió un error no previsto
  res.status(500).json('Ha ocurrido un error interno en el servidor');
  }
  });

  
// Manejador de rutas no encontradas
app.use((req, res) => {
  // Enviar una respuesta con un código de estado 404 Not Found si la ruta no se encuentra
  res.status(404).json('La ruta solicitada no existe');
});



