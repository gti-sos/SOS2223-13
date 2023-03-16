/*
var express = require("express");
var cool = require("cool-ascii-faces");
var bodyParser = require("body-parser");
var appJLB = express();
var portJLB = process.env.PORT || 8082;
appJLB.use(bodyParser.json());
const BASE_API_URL = "/api/v1";

*/

var Datastore = require('nedb');
var db = new Datastore();

module.exports =(app)=>{


//Código Jose López tarea F05
var employment_stats = [
  {year:2017 , period:"T1" , date:"2017-T1" , region:"Almeria" , employed_person:347.3 , inactive_person:220.8 , unemployed_person:74.2 },
  {year:2017 , period:"T2" , date:"2017-T2" , region:"Almeria" , employed_person:345.2 , inactive_person:223.6 , unemployed_person:79.5},
  {year:2017 , period:"T3" , date:"2017-T3" , region:"Almeria" , employed_person:348.5 , inactive_person:220.7 , unemployed_person:96.4 },
  {year:2017 , period:"T4" , date:"2017-T4" , region:"Almeria" , employed_person:356 , inactive_person:213.2 , unemployed_person:90.5 },
  {year:2018 , period:"T1" , date:"2018-T1" , region:"Almeria" , employed_person:349.1 , inactive_person:219.8 , unemployed_person:82 },
  {year:2018 , period:"T2" , date:"2018-T2" , region:"Almeria" , employed_person:332 , inactive_person:236.7 , unemployed_person:74.8 },
  {year:2018 , period:"T3" , date:"2018-T3" , region:"Almeria" , employed_person:336.2 , inactive_person:233.2 , unemployed_person:85.8 },
  {year:2018 , period:"T4" , date:"2018-T4" , region:"Almeria" , employed_person:339.4 , inactive_person:232.6 , unemployed_person:63.7 },
  {year:2017 , period:"T1" , date:"2017-T1" , region:"Cadiz" , employed_person:577.1 , inactive_person:443.2 , unemployed_person:195.5 },
  {year:2017 , period:"T2" , date:"2017-T2" , region:"Cadiz" , employed_person:567.2 , inactive_person:453.1 , unemployed_person:168 }
 ];

 db.insert(employment_stats);
 console.log("Datos insertados al inicio");




//Tarea crear 10 datos 

app.get(BASE_API_URL + "/employment-stats/loadInitialData", (req, res) => {
  db.find({}, function(err,filteredList){

    if(err){
        res.sendStatus(500, "Error cliente");
    
    }
    if (filteredList === 0){
      for(var i = 0; i<employment_stats.length;i++){
        db.insert(employment_stats[i]);
    }
      res.sendStatus(200);
      console.log("Se han insertado datos")
    } else {
      res.json('Ya contiene datos');
      console.log('Ya contiene datos')
    }
}); 
});

//CODIGO PARA MOSTRAR LAS ESTADÍSTICAS DE TODAS LAS CIUDADES EN UN PERIODO CONCRETO.
app.get('/api/v1/employment-stats', (req, res) => {
  const from = req.query.from;
  const to = req.query.to;
  db.find({},function(err, filteredList){

    if(err){
        res.sendStatus(500, "Error cliente");   
    }

  // Lógica para buscar todas las ciudades en el período especificado
  if (from && to) {

  if (from > to) {
    res.status(400).send("El rango de años especificado es inválido");
  }else{

  res.status(200);
  console.log(`/GET to /employment-stats?from=${from}&to=${to}`); //console.log en el servidor
  filteredList = filteredList.filter((ciudad) => {
    return (ciudad.year >= from && ciudad.year <= to);
 });
  }
  }else{
    const { year } = req.query;

  if (year) {
    filteredList = filteredList.filter((stat) => {
      return (stat.year === parseInt(year));
   });
   console.log("New GET to /employment-stats");
   res.status(200).json(filteredList.map((e)=>{
    delete e._id;
    return e;
  }));
  } else {
    console.log("New GET to /employment-stats"); //console.log en el servidor 
    res.status(200).json(filteredList.map((e)=>{
      delete e._id;
      return e;
    }));
  }

  }
});
});

//Implementacion de buenas practicas en la API
const rutaRaiz = '/api/v1/employment-stats';

// Método POST para la ruta base
app.post(rutaRaiz, (req,res) => {
  const keys = Object.keys(req.body);
  if(keys.length<7){
    res.status(400).send("No se han introducido datos suficientes");
  } else{
    const exists = datos_10.some(ob => ob.region === req.body.region && ob.year === req.body.year)
    if (exists) {
      // Enviar una respuesta con un código de estado 409 Conflict si el objeto ya existe
      res.status(409).send('Conflicto: Este objeto ya existe');
    } else {
      // Agregar los nuevos datos a la variable
      datos_10.push(req.body);
      // Enviar una respuesta con un código de estado 201 Created
      res.status(201).send('Los datos se han creado correctamente');
    }
  }
  });


// Método PUT para la ruta base
app.put(rutaRaiz, (req, res) => {
  res.status(405).send('El método PUT no está permitido en esta ruta');
});

// Método DELETE para la ruta base
app.delete(rutaRaiz, (req, res) => {
  datos_10 = [];
  res.status(200).send('Los datos se han borrado correctamente');
});

// Ruta específica que no permite el método POST
const rutaEsp = '/api/v1/employment-stats/loadInitialData';
app.post(rutaEsp, (req, res) => {
  res.status(405).send('El método POST no está permitido en esta ruta');
});

// Ruta Específica Método GET
app.get(rutaEsp, (req, res) => {
  res.json(datos_10);
  res.status(200);
});

// Ruta Específica Método PUT
app.put(rutaEsp, (req, res) => {
  // Verificar que el cuerpo de la solicitud contenga datos
  if (Object.keys(req.body).length === 0) {
    // Enviar una respuesta con un código de estado 400 Bad Request si no se proporcionaron datos
    res.status(400).send('No se proporcionaron datos');
  } else {
    // Reemplazar los datos existentes con los nuevos datos
    datos_10 = req.body;
    // Enviar una respuesta con un código de estado 200 OK
    res.status(200).send('Los datos se han actualizado correctamente');
  }
});

//Método DELETE de la ruta específica.
app.delete(rutaEsp, (req, res) => {
  datos_10 = [];
  res.status(200).send('Los datos se han borrado correctamente');
});


//CODIGO PARA PODER HACER GET A UNA CIUDAD ESPECÍFICA Y A UNA CIUDAD Y PERIODO CONCRETO.
app.get('/api/v1/employment-stats/:city', (req, res) => {
  const city = req.params.city.toLowerCase();
  const from = req.query.from;
  const to = req.query.to;
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
    console.log(`/GET to /employment-stats/${city}?from=${from}&to=${to}`); //console.log en el servidor
    res.status(200);
    filteredList.forEach((e)=>{
      delete e._id;
    });
    res.send(JSON.stringify(filteredList,null,2));
  } else {
    // Lógica para devolver los datos de la ciudad
    filteredList = filteredList.filter((obj)=>
                {
                    return(obj.region.toLowerCase() == city);
                });
    if(filteredList.length === 0){
      res.status(404).send('La ruta solicitada no existe');
    }else{
    res.send(JSON.stringify(filteredList,null,2));
    console.log("/GET a una ciudad concreta");
    res.status(200);
    }
  }
  });
});

//CODIGO PARA PODER HACER UN GET A UNA CIUDAD Y FECHA ESPECÍFICA.
app.get('/api/v1/employment-stats/:territory/:year', (req, res) => {
  const { territory, year } = req.params;
  
  // Buscamos las estadísticas para el territorio y el año indicados
  const stats = datos_10.find(
    s => s.region.toLowerCase() === territory.toLowerCase() && s.year === parseInt(year)
  );
  
  if (stats) {
    res.status(200).json(stats);
  } else {
    res.status(404).send('La ruta solicitada no existe');;
  }
  console.log("Solicitud /GET")
});



//CODIGO PARA ACCEDER A TODAS LAS ESTADISTICAS DE UN AÑO CONCRETO
//ESCRITO EN EL GET DE LA RUTA BASE.

//CODIGO PARA ACTUALIZAR MEDIANTE PUT UNA RUTA CONCRETA.
app.put('/api/v1/employment-stats/:city/:year', (req, res) => {
  const city = req.params.city;
  const year = parseInt(req.params.year);
  const citybody = req.body.region;
  const yearbody = req.body.year;
  
  const stat = datos_10.find(s => s.region === city && s.year === year);
  
  if (!stat || city!==citybody || year!==yearbody) {
    return res.status(400).json('Estadística errónea');
  }else{
    stat.period = req.body.period || stat.period;
  stat.date = req.body.date || stat.date;
  stat.employed_person = req.body.employed_person || stat.employed_person;
  stat.inactive_person = req.body.inactive_person|| stat.inactive_person;
  stat.unemployed_person = req.body.unemployed_person || stat.unemployed_person;

  res.json('Estadística actualizada correctamente');
  console.log("Estadística encontrada");
  }
});
 




}

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






