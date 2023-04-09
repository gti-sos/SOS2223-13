import express from "express";
import cors from "cors";
import {loadBackendJLB} from './Modularizado/apiJLB.js';
import {loadBackendJLBV2} from './Modularizado/v2/apiJLBV2.js';
import {loadBackendLMMG} from './Modularizado/api.js';
import {loadBackendLMMGV2} from './Modularizado/v2/apiLMMGV2.js';
import {loadBackendIFR} from './Modularizado/apiirene.js';

import {handler} from "./frontend/build/handler.js";


var app = express();
app.use(cors()); 
var port = process.env.PORT || 8080;
app.use(express.json());
//app.use("/",express.static("./public"));


loadBackendJLB(app);
loadBackendJLBV2(app);
loadBackendLMMG(app);
loadBackendLMMGV2(app);
loadBackendIFR(app);

app.use(handler);


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
  
// Manejador de rutas no encontradas
app.use((req, res) => {
  // Enviar una respuesta con un código de estado 404 Not Found si la ruta no se encuentra
  res.status(404).json('La ruta solicitada no existe');
});



