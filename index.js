import express from "express";
import cors from "cors";
import {loadBackendJLB} from './Modularizado/apiJLB.js';
import {loadBackendJLBV2} from './Modularizado/v2/apiJLBV2.js';
import {loadBackendLMMG} from './Modularizado/api.js';
import {loadBackendLMMGV2} from './Modularizado/v2/apiV2.js';
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
loadBackendLMMGV2(app);

app.use(handler);


//ARRANCAR EL SERVIDOR.
app.listen(port,()=>{
  console.log(`Server ready in port ${port}`);
});



