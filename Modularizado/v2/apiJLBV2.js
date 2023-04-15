/*
var express = require("express");
var cool = require("cool-ascii-faces");
var bodyParser = require("body-parser");
var appJLB = express();
var portJLB = process.env.PORT || 8082;
appJLB.use(bodyParser.json());
const BASE_API_URL = "/api/v1";

*/

import Datastore from 'nedb';
var db = new Datastore();



function loadBackendJLBV2(app){

//Redirect /docs
app.get("/api/v2/employment/docs",(req,res)=>{
  res.redirect("https://documenter.getpostman.com/view/26023285/2s93XsWkKp#25f6d261-72b7-452f-8afe-aa9ceae2968e");
});


//Código Jose López tarea F05
var employment_stats = [
  {year:2017 , period:"T1" , date:"2017-T1" , region:"Almeria" , employed_person:347.3 , inactive_person:220.8 , unemployed_person:74.2 },
  {year:2019 , period:"T1" , date:"2019-T1" , region:"Almeria" , employed_person:340.7 , inactive_person:233.6 , unemployed_person:54.7 },
  {year:2020 , period:"T1" , date:"2020-T1" , region:"Almeria" , employed_person:354.4 , inactive_person:227.1 , unemployed_person:69.9 },
  {year:2017 , period:"T1" , date:"2017-T1" , region:"Cordoba" , employed_person:380.6 , inactive_person:273.8 , unemployed_person:104.8},
  {year:2018 , period:"T1" , date:"2018-T1" , region:"Cordoba" , employed_person:371.7 , inactive_person:280.1 , unemployed_person:94.6},
  {year:2019 , period:"T1" , date:"2019-T1" , region:"Cordoba" , employed_person:367.1 , inactive_person:284.9 , unemployed_person:77.3},
  {year:2017 , period:"T1" , date:"2017-T1" , region:"Granada" , employed_person:443 , inactive_person:313 , unemployed_person:113.7 },
  {year:2018 , period:"T1" , date:"2018-T1" , region:"Granada" , employed_person:435.8 , inactive_person:321.7 , unemployed_person:109.9 },
  {year:2019 , period:"T1" , date:"2019-T1" , region:"Granada" , employed_person:424.5 , inactive_person:337.5 , unemployed_person:92 },
  {year:2017 , period:"T1" , date:"2017-T1" , region:"Huelva" , employed_person:243.6 , inactive_person:184.8 , unemployed_person:63.9 },
  {year:2018 , period:"T1" , date:"2018-T1" , region:"Huelva" , employed_person:243 , inactive_person:187.4 , unemployed_person:53.4 },
  {year:2019 , period:"T1" , date:"2019-T1" , region:"Huelva" , employed_person:251.1 , inactive_person:183.1 , unemployed_person:57.7 },
  {year:2017 , period:"T1" , date:"2017-T1" , region:"Jaen" , employed_person:299.6 , inactive_person:238.7 , unemployed_person:76.1 },
  {year:2018 , period:"T1" , date:"2018-T1" , region:"Jaen" , employed_person:287.8 , inactive_person:245.4 , unemployed_person:64.7 },
  {year:2019 , period:"T1" , date:"2019-T1" , region:"Jaen" , employed_person:281.8 , inactive_person:248.6 , unemployed_person:57.3 },
  {year:2017 , period:"T1" , date:"2017-T1" , region:"Malaga" , employed_person:764.8 , inactive_person:589.4 , unemployed_person:200.4 },
  {year:2017 , period:"T1" , date:"2017-T1" , region:"Sevilla" , employed_person:924.7 , inactive_person:655.7 , unemployed_person:243.9 },
  {year:2018 , period:"T4" , date:"2018-T4" , region:"Almeria" , employed_person:339.4 , inactive_person:232.6 , unemployed_person:63.7 },
  {year:2017 , period:"T1" , date:"2017-T1" , region:"Cadiz" , employed_person:577.1 , inactive_person:443.2 , unemployed_person:195.5 },
  {year:2018 , period:"T1" , date:"2018-T1" , region:"Cadiz" , employed_person:556.5 , inactive_person:465.1 , unemployed_person:173.9 }
 ];

 db.insert(employment_stats);
 console.log("Datos insertados al inicio");


 const BASE_API_URL = "/api/v2";

//Tarea crear 10 datos 

app.get("/api/v2/employment/loadInitialData", (req, res) => {
  db.find({}, function(err,filteredList){

    if(err){
        res.sendStatus(500, "Error cliente");
    
    }
    if (filteredList.length === 0){
      db.insert(employment_stats);
      res.sendStatus(200);
      console.log("Se han insertado datos")
    } else {
      res.sendStatus(200);
      console.log(`Ya contiene datos`)
    }
}); 
});

//CODIGO PARA MOSTRAR TODAS LAS ESTADÍSTICAS 
app.get('/api/v2/employment', (req, res) => {
  console.log("/GET employment");
  

  // Empezamos viendo los registros de la db y eliminamos el _id.
  db.find({}, {_id: 0}, (err, filteredList) => {

              // Comprobamos los errores que han podido surgir
              if(err){

                  console.log(`Error para obtener employment`);

                  // El estado es el 500 de Internal Server Error
                  res.sendStatus(500);

              // Comprobamos si existen datos:
              }else{

                  // Tenemos que inicializar los valores necesarios para filtrar: tenemos que ver el limit y offset
                  let i = -1;
                  if(!req.query.offset){ 
                    var offset = -1;
                  }else{ 
                    var offset = parseInt(req.query.offset);
                  }

                  // Tenemos que filtrar los datos, para ver cada posible campo y devolver true si no se pasa en la query, 
                  // y si es un parámetro en la query se comprueba la condicion
                  let datos = filteredList.filter((x) => {
                    return (((req.query.year == undefined)||(parseInt(req.query.year) === x.year))&&
                    ((req.query.from == undefined)||(parseInt(req.query.from) <= x.year))&&
                    ((req.query.to == undefined)||(parseInt(req.query.to) >= x.year))&&
                    ((req.query.period == undefined)||(req.query.period === x.period))&&
                    ((req.query.date == undefined)||(req.query.date === x.date))&&
                    ((req.query.region == undefined)||(req.query.region === x.region))&&
                    ((req.query.employed_person == undefined)||(parseInt(req.query.employed_person) <= x.employed_person))&&
                    ((req.query.inactive_person == undefined)||(parseInt(req.query.inactive_person) <= x.inactive_person))&&
                    ((req.query.unemployed_person == undefined)||(parseInt(req.query.unemployed_person) <= x.unemployed_person)));
                }).filter((x) => {
                      // La paginación
                      i = i+1;
                      if(req.query.limit==undefined){ 
                        var cond = true;
                      }else{ 
                        var cond = (parseInt(offset) + parseInt(req.query.limit)) >= i;
                      }
                      return (i>offset)&&cond;
                  });

                  // Comprobamos si tras el filtrado sigue habiendo datos, si no hay:
                
                  

                  if(datos.length == 0){

                    console.log(`employment no encontrado`);
                    // Estado 404: Not Found
                    res.status(404).json(datos);

                  //}else if(datos.region != ){

                  //}

                // Si por el contrario encontramos datos
                }else{


                    console.log(`Datos de employment devueltos: ${datos.length}`);
                    // Devolvemos dichos datos, estado 200: OK
                    res.json(datos);

                }

                

                  
              }
      })
});

//CODIGO PARA PODER HACER GET A UNA CIUDAD ESPECÍFICA Y A UNA CIUDAD Y PERIODO CONCRETO.
app.get('/api/v2/employment/:city', (req, res) => {
  const city = req.params.city.toLowerCase();
  const from = req.query.from;
  const to = req.query.to;
  const year = req.query.year;
  const period = req.query.period;
  const date = req.query.date;
  const employed_person = req.query.employed_person;
  const inactive_person = req.query.inactive_person;
  const unemployed_person = req.query.unemployed_person;

  db.find({},function(err, filteredList){

    if(err){
        res.sendStatus(500, "Error cliente");   
    }
  if (from && to) {
    // Lógica para devolver los datos de la ciudad para el periodo especificado
    filteredList = filteredList.filter((obj)=>
                {
                    return(obj.region.toLowerCase() == city && obj.year >= from && obj.year<= to);
                });
    console.log(`/GET to /employment/${city}?from=${from}&to=${to}`); //console.log en el servidor
    res.status(200);
                filteredList.forEach((e)=>{
                  delete e._id;
                });
                res.send(JSON.stringify(filteredList,null,2));
  }else if(year){
    filteredList = filteredList.filter((obj)=>
                {
                    return(obj.year == year && obj.region.toLowerCase() == city);
                });
                console.log(`/GET to /employment/${city}?${year}`); //console.log en el servidor
                res.status(200);
                filteredList.forEach((e)=>{
                  delete e._id;
                });
                res.send(JSON.stringify(filteredList,null,2));
  }else if(employed_person){
    filteredList = filteredList.filter((obj)=>
                {
                    return(obj.employed_person >= employed_person && obj.region.toLowerCase() == city);
                });
                console.log(`/GET to /employment/${city}?${employed_person}`); //console.log en el servidor
                res.status(200);
                filteredList.forEach((e)=>{
                  delete e._id;
                });
                res.send(JSON.stringify(filteredList,null,2));
  }else if(inactive_person){
    filteredList = filteredList.filter((obj)=>
                {
                    return(obj.inactive_person >= inactive_person && obj.region.toLowerCase() == city);
                });
                console.log(`/GET to /employment/${city}?${inactive_person}`); //console.log en el servidor
                res.status(200);
                filteredList.forEach((e)=>{
                  delete e._id;
                });
                res.send(JSON.stringify(filteredList,null,2));
  }else if(unemployed_person){
    filteredList = filteredList.filter((obj)=>
                {
                    return(obj.unemployed_person >= unemployed_person && obj.region.toLowerCase() == city);
                });
                console.log(`/GET to /employment/${city}?${unemployed_person}`); //console.log en el servidor
                res.status(200);
                filteredList.forEach((e)=>{
                  delete e._id;
                });
                res.send(JSON.stringify(filteredList,null,2));
  }else if(period){
    filteredList = filteredList.filter((obj)=>
                {
                    return(obj.period >= period && obj.region.toLowerCase() == city);
                });
                console.log(`/GET to /employment/${city}?period=${period}`); //console.log en el servidor
                res.status(200);
                filteredList.forEach((e)=>{
                  delete e._id;
                });
                res.send(JSON.stringify(filteredList,null,2));
  }else if(date){
    filteredList = filteredList.filter((obj)=>
                {
                    return(obj.date >= date && obj.region.toLowerCase() == city);
                });
                console.log(`/GET to /employment/${city}?date=${date}`); //console.log en el servidor
                res.status(200);
                filteredList.forEach((e)=>{
                  delete e._id;
                });
                res.send(JSON.stringify(filteredList,null,2));
  }
  else {
    // Lógica para devolver los datos de la ciudad
    filteredList = filteredList.filter((obj)=>
                {
                    return(obj.region.toLowerCase() == city);
                });
    if(filteredList.length === 0){
      res.status(404).json('La ruta solicitada no existe');
    }else{
      console.log("/GET a una ciudad concreta");
    filteredList.forEach((e)=>{
      delete e._id;
    });                                                                               
    if(req.query.limit != undefined || req.query.offset != undefined){
      filteredList = pagination(req,filteredList);
  }
    res.send(JSON.stringify(filteredList,null,2));
    }
  }
});
});

//HACER UN GET A UNA CIUDAD Y FECHA ESPECÍFICA.
app.get('/api/v2/employment/:region/:year', (req, res) => {
  const { region, year } = req.params;
  db.find({},function(err, filteredList){

    if(err){
        res.sendStatus(500, "Client Error");   
    }
  // Buscamos las estadísticas para el territorio y el año indicados
  filteredList = filteredList.filter((obj)=>
                {
                    return(obj.region.toLowerCase() == region.toLowerCase() && obj.year === parseInt(year));
                });
  if(filteredList==0){
    res.status(404).json('La ruta solicitada no existe');
  }else if (filteredList) {
    filteredList.forEach((e)=>{
      delete e._id;
    });
    if(req.query.limit != undefined || req.query.offset != undefined){
      filteredList = pagination(req,filteredList);
  }
    res.status(200).json(filteredList[0]);
  } else {
    res.status(404).json('La ruta solicitada no existe');
  }
});
});


//Implementacion de buenas practicas en la API
const rutaRaiz = '/api/v2/employment';

// Método POST para la ruta base
app.post(rutaRaiz, (request, response) => {
  const region = request.body.region;
  const year = request.body.year;
  console.log("New POST to /employment"); //console.log en el servidor  
  db.find({},function(err, filteredList){

    if(err){
        res.sendStatus(500, "Error cliente");   
    }
    // Validar que se envíen todos los campos necesarios
  const requiredFields = ['year', 'period', 'date', 'region', 'employed_person', 'inactive_person', 'unemployed_person'];
  for (const field of requiredFields) {
    if (!request.body.hasOwnProperty(field)) {
      response.status(400).json(`Falta el campo: ${field}`);
      return;
    }
  }
  // Verificar que la solicitud se hizo en la ruta correcta
  if (request.originalUrl !== '/api/v2/employment') {
    res.status(405).json('Método no permitido');
    return;
  }else{

  // Verificar si el recurso ya existe
  //const existingObject = employment_stats.find(obj => obj.region === region && obj.year === year);
  filteredList = filteredList.filter((obj)=>
                {
                    return(region == obj.region && year == obj.year)
                });
  //const existingObject = db.find({region : NewEvolution.region, year : NewEvolution.year});
  if (filteredList.length !=0) {
    // Si el recurso ya existe, devolver un código de respuesta 409
    response.status(409).json(`El recurso ya existe.`);
  } else {
    // Si el recurso no existe, agregarlo a la lista y devolver un código de respuesta 201
    db.insert(request.body);
    //employment_stats.push(request.body);
    response.sendStatus(201);
  }
}
});
});


// Método PUT para la ruta base
app.put(rutaRaiz, (req, res) => {
  res.status(405).send('El método PUT no está permitido en esta ruta');
});


// Ruta específica que no permite el método POST
const rutaEsp = '/api/v2/employment/loadInitialData';
app.post(rutaEsp, (req, res) => {
  res.status(405).send('El método POST no está permitido en esta ruta');
});


//CODIGO PARA PODER HACER GET A UNA CIUDAD ESPECÍFICA Y A UNA CIUDAD Y PERIODO CONCRETO.



//CODIGO PARA PODER HACER UN GET A UNA CIUDAD Y FECHA ESPECÍFICA.
app.get('/api/v2/employment/:region/:year', (req, res) => {
  const { region, year } = req.params;
  db.find({},function(err, filteredList){

    if(err){
        res.sendStatus(500, "Error cliente");   
    }
  // Buscamos las estadísticas para el territorio y el año indicados
  filteredList = filteredList.filter((obj)=>
                {
                    return(obj.region.toLowerCase() == region.toLowerCase() && obj.year === parseInt(year));
                });
  
  if (filteredList) {
    filteredList.forEach((e)=>{
      delete e._id;
    });
    if(req.query.limit != undefined || req.query.offset != undefined){
      filteredList = pagination(req,filteredList);
  }
    res.send(JSON.stringify(filteredList,null,2));
  } else {
    res.status(404).json('La ruta solicitada no existe');
  }
  console.log("Solicitud /GET")
});
});



//CODIGO PARA ACCEDER A TODAS LAS ESTADISTICAS DE UN AÑO CONCRETO
//ESCRITO EN EL GET DE LA RUTA BASE.

//CODIGO PARA ACTUALIZAR MEDIANTE PUT UNA RUTA CONCRETA.

app.put('/api/v2/employment/:city/:year', (req, res) => {
  const city = req.params.city;
  const year = parseInt(req.params.year);
  const citybody = req.body.region;
  const yearbody = req.body.year;
  const body = req.body;
  const tam = Object.keys(req.body).length;
  db.find({},function(err, filteredList){

    if(err){
        res.sendStatus(500, "Error cliente");   
    }
  filteredList = filteredList.filter((obj)=>
                {
                    return(obj.region === city && obj.year === year);
                });
  if (!filteredList || city!==citybody || year!==yearbody) {
    return res.status(400).json('Estadística errónea');
  }else if(tam != 7){
    return res.status(400).json('Estadística errónea');
  }else{
    filteredList.period = req.body.period || filteredList.period;
    filteredList.date = req.body.date || filteredList.date;
    filteredList.employed_person = req.body.employed_person || filteredList.employed_person;
    filteredList.inactive_person = req.body.inactive_person|| filteredList.inactive_person;
    filteredList.unemployed_person = req.body.unemployed_person || filteredList.unemployed_person;

  db.update({ $and: [{ region: String(city) }, { year: parseInt(year) }] }, { $set: body }, {}, function (err, numUpdated) {
    if (err) {
        res.sendStatus(500, "Internal server error");
    } else {
        res.sendStatus(200, "Updated");
    }
});
  }
});
});

//CODIGO PARA ACTUALIZAR MEDIANTE PUT UNA CIUDAD
app.put('/api/v2/employment/:city', (req, res) => {
  const city = req.params.city;
  const citybody = req.body.region;
  const body = req.body;
  db.find({},function(err, filteredList){

    if(err){
        res.sendStatus(500, "Error cliente");   
    }
  filteredList = filteredList.filter((obj)=>
                {
                    return(obj.region === city);
                });
  if (filteredList.length === 0 || city !== citybody) {
    return res.status(400).json('Estadística errónea');
  } else {
    filteredList.period = req.body.period || filteredList.period;
    filteredList.date = req.body.date || filteredList.date;
    filteredList.employed_person = req.body.employed_person || filteredList.employed_person;
    filteredList.inactive_person = req.body.inactive_person|| filteredList.inactive_person;
    filteredList.unemployed_person = req.body.unemployed_person || filteredList.unemployed_person;
    
    db.update({ territory: String(city) }, { $set: body }, { multi: true }, function (err, numUpdated) {
      if (err) {
          res.sendStatus(500, "INTERNAL SERVER ERROR");
      } else {
          res.sendStatus(200, "Updated");
      }
  });
  }
});
});



//METODO DELETE PARA LA RUTA BASE PARA BORRAR TODOS LOS DATOS.
app.delete("/api/v2/employment", (req, res) => {
  db.remove({}, { multi: true }, (err, numRemoved) => {
    if (err) {
      console.log("Error para borrar todos los datos");
      res.sendStatus(500);
    } else if (numRemoved == 0) {
      res.status(404).send("No hay más datos para borrar");
      console.log("No se encuentran más datos para borrar");
    } else {
      console.log("Borrados todos los datos");
      res.status(200).send("Borrados todos los datos");
      console.log(numRemoved);
    }
  });
});

//DELETE EN RUTA EMPLOYMENT DE UNA CIUDAD.
app.delete('/api/v2/employment/:region', (req, res) => {
  const region = req.params.region;
  db.find({},function(err, filteredList){

    if(err){
        res.sendStatus(500, "Error cliente");   
    }
  filteredList = filteredList.filter((obj)=>
                {
                    return(obj.region === region);
                });
  if (filteredList.length === 0) {
    res.status(404).json(`No se encontraron datos para ${region}`);
  } else {
    filteredList = filteredList.filter((obj)=>{return(obj.region === region);});

    if (filteredList) {
      db.remove({region: region}, {multi : true}, (err, numRemoved)=>{
        if (err){
            res.sendStatus(500,"Error cliente");
            return;
        }
      else {
        res.sendStatus(200,"Deleted");
        return;
      }
        
    });
    } else {
      res.status(404).json(`No se encontraron datos que coincidan con los criterios de eliminación para ${region}`);
    }
  }
});
});



//DELETE PARA UNA CIUDAD Y PERIOD.
app.delete('/api/v2/employment/:city/:period', (req, res) => {
  const city = req.params.city;
  const period = req.params.period;
  db.find({},function(err, filteredList){

    if(err){
        res.sendStatus(500, "Client Error");   
    }
  //const filteredStats = evolution_stats.filter(stats => stats.territory === territory);
  filteredList = filteredList.filter((obj)=>
                {
                    return(obj.region === city && obj.year === parseInt(period));
                });
  if (filteredList.length === 0) {
    res.status(404).json(`No se encontraron datos para ${city} y ${period}`);
  } else {
    filteredList = filteredList.filter((obj)=>{return(obj.region === city && obj.year === parseInt(period));});
    if (filteredList) {
      db.remove({ $and: [{ region: city }, { year: parseInt(period) }] }, {multi : true}, (err, numRemoved)=>{
        if (err){
            res.sendStatus(500,"Error cliente");
            return;
        }else if (numRemoved === 0) {
          res.sendStatus(404, "Error cliente: Documentos no encontrados");
          return;
        }
      else {
        res.sendStatus(200,"Deleted");
        return;
      }
        
    });
    } else {
      res.status(404).json(`No se encontraron datos que coincidan con los criterios de eliminación para ${city}`);
    }
  }
});
});



function pagination(req, lista){

  var res = [];
  const limit = req.query.limit;
  const offset = req.query.offset;
  
  if(limit < 1 || offset < 0 || offset > lista.length){
      res.push("ERROR EN PARAMETROS LIMIT Y/O OFFSET");
      return res;
  }
  res = lista.slice(offset,parseInt(limit)+parseInt(offset));
  return res;

};





}

export {loadBackendJLBV2};

/*

//EXPORTACION
module.exports = {
  express,
  cool,
  bodyParser,
  appJLB,
  portJLB,
  datos_10,
  BASE_API_URL,
  datos_10,
  rutaRaiz
};

*/






