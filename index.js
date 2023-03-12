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

/*var express = require("express");
var cool = require("cool-ascii-faces");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 8080;
app.use(bodyParser.json());
const BASE_API_URL = "/api/v1";*/

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

app.get(BASE_API_URL + "/employment-stats/loadInitialData", (req, res) => {
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
app.get('/api/v1/employment-stats', (req, res) => {
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
app.post(rutaRaiz, (req,res) => {
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
app.put(rutaRaiz, (req, res) => {
  res.status(405).send('El método PUT no está permitido en esta ruta');
});

// Método DELETE para la ruta base
app.delete(rutaRaiz, (req, res) => {
  employment_stats = [];
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
  if (!req.body) {
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
app.get('/api/v1/employment-stats/:territory/:year', (req, res) => {
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
app.put('/api/v1/employment-stats/:city/:year', (req, res) => {
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
app.get("/samples/JLB", (request,response) => {
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








// ruta de /samples/index-IFR.js
app.get("/samples/IFR", (request,response) => {
  var datos = [
      {province:"Almeria" , landline:950351228 , first_name:"ANTONIO MANUEL" , second_name:"ORTIZ" , president_appointment_date:2015 , surface_extension: 45.24, population:1342.00, expense: 2224600.00, income: 2224600.00},
      {province:"Almeria" , landline:950350001 , first_name:"ANTONIO" , second_name:"TORRES" , president_appointment_date:2015 , surface_extension: 83.68 , population:1279.00, expense: 1602733.00 , income: 1602733.00 },
      {province:"Cordoba" , landline:957166002 , first_name:"MANUELA" , second_name:"BOLLERO" , president_appointment_date:2015 , surface_extension: 334.84, population:4317.00, expense: 4227447.74 , income: 4227447.74 },
      {province:"Almeria" , landline:950400400 , first_name:"MANUEL" , second_name:"CORTES" , president_appointment_date:2015 , surface_extension: 90.04 , population:24670.00, expense: 19128200.00 , income: 19128200.00 },
      {province:"Granada" , landline:958557379 , first_name:"MARIA DEL PILAR" , second_name:"LOPEZ" , president_appointment_date:2015 , surface_extension: 27.00 , population: 310.00, expense: 392000.00 , income: 392000.00},
      {province:"Sevilla" , landline:954816021 , first_name:"ESTRELLA" , second_name:"MONTA?O" , president_appointment_date:2015 , surface_extension: 13.69 , population: 2114.00, expense: 2137220.70 , income: 2137220.70 },
      {province:"Cordoba" , landline:957660000 , first_name:"FRANCISCO JUAN" , second_name:"MARTIN" , president_appointment_date:2015 , surface_extension: 166.48 , population: 13551.00, expense: 7222732.25 , income: 7257861.14 },
      {province:"Huelva" , landline:959125710 , first_name:"M? CARMEN" , second_name:"OSORNO" , president_appointment_date:2015 , surface_extension: 41.46 , population: 813.00, expense: 630073.18 , income: 630073.18 },
      {province:"Malaga" , landline:952710025 , first_name:"JUAN LORENZO" , second_name:"PINEDA" , president_appointment_date:2015 , surface_extension: 65.11 , population: 5403.00 , expense: 4325250.80 , income: 4325250.80 },
      {province:"Granada" , landline:958392520 , first_name:"TORCUATO" , second_name:"CABRERIZO" , president_appointment_date:2015 , surface_extension: 90.71 , population: 637.00 , expense: 779638.23 , income: 779638.23 },
      {province:"Sevilla" , landline:954885004 , first_name:"EVA CRISTINA" , second_name:"RUIZ" , president_appointment_date:2016 , surface_extension: 280.19 , population: 1820.00, expense: 1899419.45 , income: 1899419.45 }
    
    ];
    
    //console.log(localentities_stats);

    //Calculo de la media de personas de Almeria con más de 2.000.000 de ingresos 
    
    
    const ingresosAlmeria = datos.filter((data) => data.province === 'Almeria' && data.income > 2000000);
    
    const totalPoblacion = ingresosAlmeria.reduce((acc, data) => acc + data.population, 0);
    
    const mediaIngresos = totalPoblacion / ingresosAlmeria.length;
    
  response.send(`Media de personas de Almeria con más de 2 millones de ingresos: ${mediaIngresos}`);
  console.log("New request"); //console.log en el servidor    
});


  
  //API
  
  var localentities_stats = [
      {province:"Almeria" , landline:950351228 , first_name:"ANTONIO MANUEL" , second_name:"ORTIZ" , president_appointment_date:2015 , surface_extension: 45.24, population:1342.00, expense: 2224600.00, income: 2224600.00},
      {province:"Almeria" , landline:950350001 , first_name:"ANTONIO" , second_name:"TORRES" , president_appointment_date:2013 , surface_extension: 83.68 , population:1279.00, expense: 1602733.00 , income: 1602733.00 },
      {province:"Cordoba" , landline:957166002 , first_name:"MANUELA" , second_name:"BOLLERO" , president_appointment_date:2015 , surface_extension: 334.84, population:4317.00, expense: 4227447.74 , income: 4227447.74 },
      {province:"Almeria" , landline:950400400 , first_name:"MANUEL" , second_name:"CORTES" , president_appointment_date:2013 , surface_extension: 90.04 , population:24670.00, expense: 19128200.00 , income: 19128200.00 },
      {province:"Granada" , landline:958557379 , first_name:"MARIA DEL PILAR" , second_name:"LOPEZ" , president_appointment_date:2015 , surface_extension: 27.00 , population: 310.00, expense: 392000.00 , income: 392000.00},
      {province:"Sevilla" , landline:954816021 , first_name:"ESTRELLA" , second_name:"MONTA?O" , president_appointment_date:2014 , surface_extension: 13.69 , population: 2114.00, expense: 2137220.70 , income: 2137220.70 },
      {province:"Cordoba" , landline:957660000 , first_name:"FRANCISCO JUAN" , second_name:"MARTIN" , president_appointment_date:2015 , surface_extension: 166.48 , population: 13551.00, expense: 7222732.25 , income: 7257861.14 },
      {province:"Huelva" , landline:959125710 , first_name:"M? CARMEN" , second_name:"OSORNO" , president_appointment_date:2016 , surface_extension: 41.46 , population: 813.00, expense: 630073.18 , income: 630073.18 },
      {province:"Malaga" , landline:952710025 , first_name:"JUAN LORENZO" , second_name:"PINEDA" , president_appointment_date:2015 , surface_extension: 65.11 , population: 5403.00 , expense: 4325250.80 , income: 4325250.80 },
      {province:"Granada" , landline:958392520 , first_name:"TORCUATO" , second_name:"CABRERIZO" , president_appointment_date:2015 , surface_extension: 90.71 , population: 637.00 , expense: 779638.23 , income: 779638.23 },
      {province:"Sevilla" , landline:954885004 , first_name:"EVA CRISTINA" , second_name:"RUIZ" , president_appointment_date:2016 , surface_extension: 280.19 , population: 1820.00, expense: 1899419.45 , income: 1899419.45 }
          
  ];
  
  

//localentities me va, me sale el get

  app.post(BASE_API_URL + "/localentities-stats", (request,response) => {
  const province = request.body.province;
  const president_appointment_date = request.body.president_appointment_date;
  
  console.log("New POST to /localentities-stats"); //console.log en el servidor
  

//verifica que se envían todos los campos necesarios  
  if(request.originalUrl !== '/api/v1/localentities-stats'){
    res.status(405).send('Método no permitido');
    return;
  } else {
    const requiredFields = ['province', 'landline', 'first_name', 'second_name', 'president_appointment_date', 'surface_extension', 'population', 'expense', 'income'];
    for(const field of requiredFields){
      if(!request.body.hasOwnProperty(field)){
        response.status(400).send(`Missing required field: ${field}`);
        return;
      }
    }

//verifica si el recurso ya existe
  const existingObject = localentities_stats.find(obj =>obj.province === province && obj.president_appointment_date === president_appointment_date);
  if (existingObject){
    //si el recurso existe, devuelve error 409
      response.status(409).send(`El recurso ya existe.`);
  } else {
    //si el recurso no existe, devuelve 201 y lo añade a la lista
      localentities_stats.push(request.body);
      response.sendStatus(201);
  }
  
}
});
  
  //10 o más datos
  
  var datos_randomIFR = []
  
  app.get(BASE_API_URL + "/localentities-stats/loadInitialData", (req, res) => {
  if (datos_randomIFR.length === 0) {
      datos_randomIFR.push(
        {province:"Almeria" , landline:950350001 , first_name:"ANTONIO" , second_name:"TORRES" , president_appointment_date:2013 , surface_extension: 83.68 , population:1279.00, expense: 1602733.00 , income: 1602733.00 },
        {province:"Cordoba" , landline:957166002 , first_name:"MANUELA" , second_name:"BOLLERO" , president_appointment_date:2015 , surface_extension: 334.84, population:4317.00, expense: 4227447.74 , income: 4227447.74 },
        {province:"Almeria" , landline:950400400 , first_name:"MANUEL" , second_name:"CORTES" , president_appointment_date:2013 , surface_extension: 90.04 , population:24670.00, expense: 19128200.00 , income: 19128200.00 },
        {province:"Granada" , landline:958557379 , first_name:"MARIA DEL PILAR" , second_name:"LOPEZ" , president_appointment_date:2015 , surface_extension: 27.00 , population: 310.00, expense: 392000.00 , income: 392000.00},
        {province:"Sevilla" , landline:954816021 , first_name:"ESTRELLA" , second_name:"MONTA?O" , president_appointment_date:2014 , surface_extension: 13.69 , population: 2114.00, expense: 2137220.70 , income: 2137220.70 },
        {province:"Cordoba" , landline:957660000 , first_name:"FRANCISCO JUAN" , second_name:"MARTIN" , president_appointment_date:2015 , surface_extension: 166.48 , population: 13551.00, expense: 7222732.25 , income: 7257861.14 },
        {province:"Huelva" , landline:959125710 , first_name:"M? CARMEN" , second_name:"OSORNO" , president_appointment_date:2016 , surface_extension: 41.46 , population: 813.00, expense: 630073.18 , income: 630073.18 },
        {province:"Malaga" , landline:952710025 , first_name:"JUAN LORENZO" , second_name:"PINEDA" , president_appointment_date:2015 , surface_extension: 65.11 , population: 5403.00 , expense: 4325250.80 , income: 4325250.80 },
        {province:"Granada" , landline:958392520 , first_name:"TORCUATO" , second_name:"CABRERIZO" , president_appointment_date:2015 , surface_extension: 90.71 , population: 637.00 , expense: 779638.23 , income: 779638.23 },
        {province:"Sevilla" , landline:954885004 , first_name:"EVA CRISTINA" , second_name:"RUIZ" , president_appointment_date:2016 , surface_extension: 280.19 , population: 1820.00, expense: 1899419.45 , income: 1899419.45 }
        );
      res.json(datos_randomIFR)
      console.log("Se han creado datos")
  } else {
      res.json('El arreglo ya contiene datos');
      console.log('El arreglo ya contiene datos')
  }
  });
  


  
//Motrar las ciudades en un año concreto
  
  app.get('/api/v1/localentities-stats', (req, res) => {
  const from = req.query.from;
  const to = req.query.to;
//buscar todas las ciudades en el año especificado  
  if (from && to) {
      const ciudadesYear = localentities_stats.filter(c => {
      return c.president_appointment_date >= from && c.president_appointment_date <= to;
      });
  
      if (from >= to) {
      res.status(400).json("El rango de años especificado es inválido");
      }else{
      res.status(200);
      res.json(ciudadesYear);
      console.log(`/GET to /localentities-stats?from=${from}&to=${to}`); //console.log en el servidor
      }
      }else{
      const { president_appointment_date } = req.query;
  
      if (president_appointment_date) {
        const filteredStats = localentities_stats.filter(stat => stat.president_appointment_date === parseInt(president_appointment_date));
        console.log("New GET to /localentities-stats"); //console.log en el servidor
        res.status(200).json(filteredStats);
      } else {
        console.log("New GET to /localentities-stats"); //console.log en el servidor 
        res.status(200).json(localentities_stats);

      }
  
      }
  });
  
  
  //TABLITA AZUL
  const rutaIrene = '/api/v1/localentities-stats';
      
  // Método POST para la ruta base
  app.post(rutaIrene + "/localentities-stats", (request, response) => {
    const province = request.body.province;
    const president_appointment_date = request.body.president_appointment_date;
    console.log("New POST to /localentities-stats"); //console.log en el servidor  
  
    // Verificar que la solicitud se hizo en la ruta correcta
    if (request.originalUrl !== '/api/v1/localentities-stats') {
      res.status(405).json('Método no permitido');
      return;
    }else{
    // Validar que se envíen todos los campos necesarios
    const requiredFields = ['province', 'landline', 'first_name', 'second_name', 'president_appointment_date', 'surface_extension', 'population', 'expense', 'income'];
    for (const field of requiredFields) {
      if (!request.body.hasOwnProperty(field)) {
        response.status(400).json(`Missing required field: ${field}`);
        return;
      }
    }
  
    // Verificar si el recurso ya existe
    const existingObject = localentities_stats.find(obj => obj.province === province && obj.president_appointment_date === president_appointment_date);
  
    if (existingObject) {
      // Si el recurso ya existe, devolver un código de respuesta 409
      response.status(409).json(`El recurso ya existe.`);
    } else {
      // Si el recurso no existe, agregarlo a la lista y devolver un código de respuesta 201
      localentities_stats.push(request.body);
      response.sendStatus(201);
    }
  }
  });
  

  // Método PUT para la ruta base
  app.put(rutaIrene, (req, res) => {
      res.status(405).json('El método PUT no está permitido en esta ruta');
  });
  
  
  // Ruta específica que no permite el método POST
  const rutaEspecif = '/api/v1/localentities-stats/loadInitialData';
  app.post(rutaEspecif, (req, res) => {
      res.status(405).json('El método POST no está permitido en esta ruta');
  });
  
  // Ruta Específica Método GET
  app.get(rutaEspecif, (req, res) => {
      res.json(datos_randomIFR);
      res.status(200);
  });

  // Ruta Específica Método PUT
  app.put(rutaEspecif, (req, res) => {
      // Verificar que el cuerpo de la solicitud contenga datos
      if (!req.body) {
      // Enviar una respuesta con un código de estado 400 Bad Request si no se proporcionaron datos
      res.status(400).send('No se proporcionaron datos');
      } else {
      // Reemplazar los datos existentes con los nuevos datos
      datos_randomIFR = req.body;
      // Enviar una respuesta con un código de estado 200 OK
      res.status(200).json('Los datos se han actualizado correctamente');
      }
  });
  
  //Método DELETE de la ruta específica.
  app.delete(rutaEspecif, (req, res) => {
      datos_randomIFR = [];
      res.status(200).json('Los datos se han borrado correctamente');
  });
  




//CODIGO PARA PODER HACER GET A UNA CIUDAD ESPECÍFICA Y A UNA CIUDAD Y PERIODO CONCRETO.
  app.get('/api/v1/localentities-stats/:city', (req, res) => {
  const city = req.params.city.toLowerCase();
  const from = req.query.from;
  const to = req.query.to;

  if (from && to) {
      // Lógica para devolver los datos de la ciudad para el periodo especificado
      const filteredStats = localentities_stats.filter(
      stat => stat.province.toLowerCase() === city && stat.president_appointment_date >= from && stat.president_appointment_date <= to
      );
      res.json(filteredStats);
      console.log(`/GET to /localentities-stats/${city}?from=${from}&to=${to}`); //console.log en el servidor
      res.status(200);
  } else {
      // Lógica para devolver los datos de la ciudad
      const filteredStats = localentities_stats.filter(stat => stat.province.toLowerCase() === city);
      console.log(filteredStats);
      if(filteredStats.length === 0){
        res.status(404).json('La ruta solicitada no existe');
      }else{
      res.json(filteredStats);
      console.log("/GET a una ciudad concreta");
      res.status(200);
      }
  }
  });
  



//CODIGO PARA PODER HACER UN GET A UNA CIUDAD Y FECHA ESPECÍFICA.
  app.get('/api/v1/localentities-stats/:province/:year', (req, res) => {
  const { province, year } = req.params;

// Buscamos las estadísticas para el territorio y el año indicados
  const stats = localentities_stats.find(
      s => s.province.toLowerCase() === province.toLowerCase() && s.president_appointment_date === parseInt(year)
  );

  if (stats) {
      res.status(200).json(stats);
  } else {
    res.status(404).json('La ruta solicitada no existe');
   }
  console.log("Solicitud /GET")
  });



//CODIGO PARA ACCEDER A TODAS LAS ESTADISTICAS DE UN AÑO CONCRETO
//ESCRITO EN EL GET DE LA RUTA BASE.

//CODIGO PARA ACTUALIZAR MEDIANTE PUT UNA RUTA CONCRETA.
app.put('/api/v1/localentities-stats/:city/:year', (req, res) => {
  const city = req.params.city;
  const year = parseInt(req.params.year);
  const city_body = req.body.province;
  const year_body = req.body.president_appointment_date;

   const stat = localentities_stats.find(s => s.province === city && s.president_appointment_date === year);

  if (!stat || city!==city_body || year!==year_body) {
      return res.status(400).json('Estadística errónea');
  }else{
  stat.landline = req.body.landline || stat.landline;
  stat.first_name = req.body.first_name || stat.first_name;
  stat.second_name = req.body.second_name || stat.second_name;
  stat.surface_extension = req.body.surface_extension || stat.surface_extension;
  stat.population = req.body.population || stat.population;
  stat.expense = req.body.expense || stat.expense;
  stat.income = req.body.income || stat.income;


  res.json('Estadística actualizada correctamente');
  console.log("Estadística encontrada");
  }
});


//METODO DELETE PARA LA RUTA BASE PARA BORRAR DATO ESPECÍFICO.
app.delete(BASE_API_URL + "/localentities-stats", (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    localentities_stats = [];
    res.status(200).json('Los datos se han borrado correctamente');
  }else{
  const { province, president_appointment_date } = req.body;

  // Buscar el objeto en la matriz localentities
  const objectIndex = localentities_stats.findIndex(obj => obj.province === province && obj.president_appointment_date === president_appointment_date);

  if (objectIndex === -1) {
    // Si el objeto no se encuentra, devolver un código de respuesta 404 Not Found
    res.status(404).json('El objeto no existe');
  } else {
    // Si se encuentra el objeto, eliminarlo de la matriz y devolver un código de respuesta 200 OK
    localentities_stats.splice(objectIndex, 1);
    res.sendStatus(200);
  }
}
});

//DELETE PARA UNA RUTA ESPECÍFICA DE UNA CIUDAD.
app.delete('/api/v1/localentities-stats/:province', (req, res) => {
  const province = req.params.province;
  const filteredStats = localentities_stats.filter(stats => stats.province === province);
  
  if (filteredStats.length === 0) {
    res.status(404).json(`No se encontraron datos para ${province}`);
  } else {
    const newData = localentities_stats.filter(stats => stats.province !== province);
    const deleted = newData.length !== localentities_stats.length;
    localentities_stats = newData;

    if (deleted) {
      res.status(204).json(`Se ha borrado ${province}`);
    } else {
      res.status(404).json(`No se encontraron datos que coincidan con los criterios de eliminación para ${province}`);
    }
  }
});





//ARRANCAR EL SERVIDOR.
app.listen(port,()=>{
  console.log(`Server ready in port ${port}`);
});


