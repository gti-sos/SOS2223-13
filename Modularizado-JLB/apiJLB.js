var express = require("express");
var cool = require("cool-ascii-faces");
var bodyParser = require("body-parser");
var appJLB = express();
var portJLB = process.env.PORT || 8082;
appJLB.use(bodyParser.json());
const BASE_API_URL = "/api/v1";

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



//app.get(BASE_API_URL + "/employment-stats",(request,response) => {
//  response.json(employment_stats);
//  console.log("New GET to /employment-stats");
//});

//app.post(BASE_API_URL + "/employment-stats",(request,response) => {
//  var newEmployment = request.body; 
//
//  console.log(`newEmployment = <${newEmployment}>`);
//  console.log("New POST to /employment-stats");
//
//}); 

//Tarea crear 10 datos 

var datos_10 = [];

appJLB.get(BASE_API_URL + "/employment-stats/loadInitialData", (req, res) => {
  if (datos_10.length === 0) {
    datos_10.push(
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
      
    );
    res.json(datos_10)
    console.log("Se han creado 10 datos")
  } else {
    res.send('Ya hay datos contenido');
    console.log('Ya hay datos contenido')
  }
});

//CODIGO PARA MOSTRAR LAS ESTADÍSTICAS DE TODAS LAS CIUDADES EN UN PERIODO CONCRETO.
appJLB.get('/api/v1/employment-stats', (req, res) => {
  const from = req.query.from;
  const to = req.query.to;

  // Lógica para buscar todas las ciudades en el período especificado
  if (from && to) {
  const ciudadesEnPeriodo = employment_stats.filter(ciudad => {
    return ciudad.year >= from && ciudad.year <= to;
  });

  if (from > to) {
    res.status(400).send("El rango de años especificado es inválido");
  }else{

  res.status(200);
  res.json(ciudadesEnPeriodo);
  console.log(`/GET to /employment-stats?from=${from}&to=${to}`); //console.log en el servidor
  }
  }else{
    const { year } = req.query;

  if (year) {
    const filteredStats = employment_stats.filter(stat => stat.year === parseInt(year));
    console.log(`New GET to /employment-stats?year=${year}`); //console.log en el servidor
    res.json(filteredStats);  
    res.sendStatus(200);
  } else {
    console.log("New GET to /employment-stats"); //console.log en el servidor 
    res.json(employment_stats);
    res.status(200);
  }

  }
});

//Implementacion de buenas practicas en la API
const rutaRaiz = '/api/v1/employment-stats';

// Método POST para la ruta base
appJLB.post(rutaRaiz, (req,res) => {
  const keys = Object.keys(req.body);
  if(keys.length<7){
    res.status(400).send("No se han introducido datos suficientes");
  } else{
    const exists = employment_stats.some(ob => ob.region === req.body.region && ob.year === req.body.year)
    if (exists) {
      // Enviar una respuesta con un código de estado 409 Conflict si el objeto ya existe
      res.status(409).send('Conflicto: Este objeto ya existe');
    } else {
      // Agregar los nuevos datos a la variable
      employment_stats.push(req.body);
      // Enviar una respuesta con un código de estado 201 Created
      res.status(201).send('Los datos se han creado correctamente');
    }
  }
  });


// Método PUT para la ruta base
appJLB.put(rutaRaiz, (req, res) => {
  res.status(405).send('El método PUT no está permitido en esta ruta');
});

// Método DELETE para la ruta base
appJLB.delete(rutaRaiz, (req, res) => {
  employment_stats = [];
  res.status(200).send('Los datos se han borrado correctamente');
});

// Ruta específica que no permite el método POST
const rutaEsp = '/api/v1/employment-stats/loadInitialData';
appJLB.post(rutaEsp, (req, res) => {
  res.status(405).send('El método POST no está permitido en esta ruta');
});

// Ruta Específica Método GET
appJLB.get(rutaEsp, (req, res) => {
  res.json(datos_10);
  res.status(200);
});

// Ruta Específica Método PUT
appJLB.put(rutaEsp, (req, res) => {
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
appJLB.delete(rutaEsp, (req, res) => {
  datos_10 = [];
  res.status(200).send('Los datos se han borrado correctamente');
});


//CODIGO PARA PODER HACER GET A UNA CIUDAD ESPECÍFICA Y A UNA CIUDAD Y PERIODO CONCRETO.
appJLB.get('/api/v1/employment-stats/:city', (req, res) => {
  const city = req.params.city.toLowerCase();
  const from = req.query.from;
  const to = req.query.to;

  if (from && to) {
    // Lógica para devolver los datos de la ciudad para el periodo especificado
    const filteredStats = employment_stats.filter(
      stat => stat.region.toLowerCase() === city &&
      stat.year >= from && stat.year <= to
    );
    res.json(filteredStats);
    console.log(`/GET to /employment-stats/${city}?from=${from}&to=${to}`); //console.log en el servidor
    res.status(200);
  } else {
    // Lógica para devolver los datos de la ciudad
    const filteredStats = employment_stats.filter(stat => stat.region.toLowerCase() === city);
    console.log(filteredStats);
    if(filteredStats.length === 0){
      res.status(404).send('La ruta solicitada no existe');
    }else{
    res.json(filteredStats);
    console.log("/GET a una ciudad concreta");
    res.status(200);
    }
  }
});

//CODIGO PARA PODER HACER UN GET A UNA CIUDAD Y FECHA ESPECÍFICA.
appJLB.get('/api/v1/employment-stats/:territory/:year', (req, res) => {
  const { territory, year } = req.params;
  
  // Buscamos las estadísticas para el territorio y el año indicados
  const stats = employment_stats.find(
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
appJLB.put('/api/v1/employment-stats/:city/:year', (req, res) => {
  const city = req.params.city;
  const year = parseInt(req.params.year);
  const citybody = req.body.region;
  const yearbody = req.body.year;
  
  const stat = employment_stats.find(s => s.region === city && s.year === year);
  
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
 

//ruta de /samples/index-JLB.js
appJLB.get("/samples/JLB", (request,response) => {
    var datos = [
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
      
      //console.log(datos);
      
      //Calculo de la cantidad de personas de Almeria con un empleo 
      var datos_ciudad = datos.filter( n => n.region == "Almeria");
      
      cantidad = 0
      
      for (let i = 0; i<datos_ciudad.length; i++){
      
          cantidad += datos_ciudad[i].employed_person
          
      
      
      };
      
      var media = cantidad / datos_ciudad.length
    response.send(`Media es: ${media}`);
    console.log("New request"); //console.log en el servidor    
});

//EXPORTACION
module.exports = {
  express,
  cool,
  bodyParser,
  appJLB,
  portJLB,
  employment_stats,
  BASE_API_URL,
  datos_10,
  rutaRaiz
};







