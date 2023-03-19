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


 const BASE_API_URL = "/api/v1";

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
  const region = req.query.region;
  const year = req.query.year;
  const employed_person = req.query.employed_person;
  const inactive_person = req.query.inactive_person;
  const unemployed_person = req.query.woman;

  db.find({},function(err, filteredList){

    if(err){
        res.sendStatus(500, "Error cliente");   
    }
  // Lógica para buscar todas las ciudades en el período especificado
  if (from && to) {
    if (from > to) {
      res.status(400).json("El rango de años especificado es inválido");
    }else{
      console.log(`/GET to /employment-stats?from=${from}&to=${to}`); //console.log en el servidor
      filteredList = filteredList.filter((ciudad) => {
        return (ciudad.year >= from && ciudad.year <= to);
     });
     res.status(200).json(filteredList.map((e)=>{
      delete e._id;
      return e;
    }));
    }

  }else if(region && employed_person){
    filteredList = filteredList.filter((stat) => {
      return (stat.region === region && stat.employed_person >= employed_person);
   });
   console.log("New GET to /evolution-stats with region and employed person"); //console.log en el servidor 
   filteredList.map((e)=>{
     delete e._id;
     return e;
   });
   res.send(JSON.stringify(filteredList,null,2));
  }else if(region && inactive_person){
    filteredList = filteredList.filter((stat) => {
      return (stat.region === region && stat.inactive_person >= inactive_person);
   });
   console.log("New GET to /employment-stats with region and inactive person"); //console.log en el servidor 
   res.status(200).json(filteredList.map((e)=>{
     delete e._id;
     return e;
   }));
   res.send(JSON.stringify(filteredList,null,2));
  }
  else if(region && unemployed_person){
    filteredList = filteredList.filter((stat) => {
      return (stat.region === region && stat.unemployed_person >= unemployed_person);
   });
   console.log("New GET to /employment-stats with region and unemployed person"); //console.log en el servidor 
   filteredList.map((e)=>{
     delete e._id;
     return e;
   });
   res.send(JSON.stringify(filteredList,null,2));
  }
  else if(year && employed_person){
    filteredList = filteredList.filter((stat) => {
      return (stat.year === parseInt(year) && stat.employed_person >= employed_person);
   });
   console.log("New GET to /employment-stats with year and employed_person"); //console.log en el servidor 
   res.status(200).json(filteredList.map((e)=>{
     delete e._id;
     return e;
   }));
   //res.send(JSON.stringify(filteredList,null,2));
  }else if(year && inactive_person){
    filteredList = filteredList.filter((stat) => {
      return (stat.year === parseInt(year) && stat.inactive_person >= inactive_person);
   });
   console.log("New GET to /employment-stats with year and inactive person"); //console.log en el servidor 
   res.status(200).json(filteredList.map((e)=>{
     delete e._id;
     return e;
   }));
   //res.send(JSON.stringify(filteredList,null,2));
  }
  else if(year && unemployed_person){
    filteredList = filteredList.filter((stat) => {
      return (stat.year === parseInt(year) && stat.unemployed_person >= unemployed_person);
   });
   console.log("New GET to /employment-stats with year and unemployed_person"); //console.log en el servidor 
   res.status(200).json(filteredList.map((e)=>{
     delete e._id;
     return e;
   }));
   //res.send(JSON.stringify(filteredList,null,2));
  } 
  else{

    const { year } = req.query;

  if (year) {
    filteredList = filteredList.filter((stat) => {
       return (stat.year === parseInt(year));
    });
    console.log("New GET to /employment-stats with year"); //console.log en el servidor 
    res.status(200).json(filteredList.map((e)=>{
      delete e._id;
      return e;
    }));
    if(req.query.limit != undefined || req.query.offset != undefined){
      filteredList = pagination(req,filteredList);
  }
  //res.send(JSON.stringify(filteredList,null,2));
  } else {
    console.log("New GET to /employment-stats"); //console.log en el servidor
        filteredList.map((e)=>{
          delete e._id;
          return e;
        });
        if(req.query.limit != undefined || req.query.offset != undefined){
          filteredList = pagination(req,filteredList);
      }
      res.send(JSON.stringify(filteredList,null,2));
      //res.json(filteredList);
      //}
    //});
  }

  }
  });
});

//CODIGO PARA PODER HACER GET A UNA CIUDAD ESPECÍFICA Y A UNA CIUDAD Y PERIODO CONCRETO.
app.get('/api/v1/employment-stats/:city', (req, res) => {
  const city = req.params.city.toLowerCase();
  const from = req.query.from;
  const to = req.query.to;
  const year = req.query.year;
  const employed_person = req.query.employed_person;
  const inactive_person = req.query.inactive_person;
  const unemployed_person = req.query.woman;

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
  }else if(year){
    filteredList = filteredList.filter((obj)=>
                {
                    return(obj.year == year && obj.region.toLowerCase() == city);
                });
                console.log(`/GET to /employment-stats/${city}?${year}`); //console.log en el servidor
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
                console.log(`/GET to /employment-stats/${city}?${employed_person}`); //console.log en el servidor
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
                console.log(`/GET to /employment-stats/${city}?${inactive_person}`); //console.log en el servidor
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
                console.log(`/GET to /employment-stats/${city}?${unemployed_person}`); //console.log en el servidor
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
app.get('/api/v1/employment-stats/:city/:year', (req, res) => {
  const { city, year } = req.params;
  db.find({},function(err, filteredList){

    if(err){
        res.sendStatus(500, "Error cliente");   
    }
  // Buscamos las estadísticas para el territorio y el año indicados
  filteredList = filteredList.filter((obj)=>
                {
                    return(obj.region.toLowerCase() == city.toLowerCase() && obj.year === parseInt(year));
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

//Implementacion de buenas practicas en la API
const rutaRaiz = '/api/v1/employment-stats';

// Método POST para la ruta base
app.post(rutaRaiz, (request, response) => {
  const region = request.body.region;
  const year = request.body.year;
  console.log("New POST to /employment-stats"); //console.log en el servidor  
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
  if (request.originalUrl !== '/api/v1/employment-stats') {
    res.status(405).json('Método no permitido');
    return;
  }else{

  // Verificar si el recurso ya existe
  //const existingObject = evolution_stats.find(obj => obj.territory === territory && obj.period === period);
  filteredList = filteredList.filter((obj)=>
                {
                    return(region == obj.region && year == obj.year)
                });
  //const existingObject = db.find({territory : NewEvolution.territory, period : NewEvolution.period});
  if (filteredList.length !=0) {
    // Si el recurso ya existe, devolver un código de respuesta 409
    response.status(409).json(`El recurso ya existe.`);
  } else {
    // Si el recurso no existe, agregarlo a la lista y devolver un código de respuesta 201
    db.insert(request.body);
    //evolution_stats.push(request.body);
    response.sendStatus(201);
  }
}
});
});


// Método PUT para la ruta base
app.put(rutaRaiz, (req, res) => {
  res.status(405).send('El método PUT no está permitido en esta ruta');
});

// Método DELETE para la ruta base
//app.delete(rutaRaiz, (req, res) => {
//  datos_10 = [];
//  res.status(200).send('Los datos se han borrado correctamente');
//});

// Ruta específica que no permite el método POST
const rutaEsp = '/api/v1/employment-stats/loadInitialData';
app.post(rutaEsp, (req, res) => {
  res.status(405).send('El método POST no está permitido en esta ruta');
});

// Ruta Específica Método GET
//app.get(rutaEsp, (req, res) => {
//  res.json(datos_10);
//  res.status(200);
//});

// Ruta Específica Método PUT
//app.put(rutaEsp, (req, res) => {
  // Verificar que el cuerpo de la solicitud contenga datos
//  if (Object.keys(req.body).length === 0) {
    // Enviar una respuesta con un código de estado 400 Bad Request si no se proporcionaron datos
//    res.status(400).send('No se proporcionaron datos');
//  } else {
    // Reemplazar los datos existentes con los nuevos datos
//    datos_10 = req.body;
    // Enviar una respuesta con un código de estado 200 OK
//    res.status(200).send('Los datos se han actualizado correctamente');
//  }
//});

//Método DELETE de la ruta específica.
//app.delete(rutaEsp, (req, res) => {
//  datos_10 = [];
//  res.status(200).send('Los datos se han borrado correctamente');
//});


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
app.get('/api/v1/employment-stats/:region/:year', (req, res) => {
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
app.put('/api/v1/employment-stats/:city/:year', (req, res) => {
  const city = req.params.city;
  const year = parseInt(req.params.year);
  const citybody = req.body.region;
  const yearbody = req.body.year;
  const body = req.body;
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
app.put('/api/v1/employment-stats/:city', (req, res) => {
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
    /*for (let i = 0; i < filteredList.length; i++) {
      const stat = filteredList[i];
      stat.period = req.body.period || stat.period;
      stat.total_population = req.body.total_population || stat.total_population;
      stat.man = req.body.man || stat.man;
      stat.woman = req.body.woman || stat.woman;
      stat.under_sixteen_years = req.body.under_sixteen_years || stat.under_sixteen_years;
      stat.from_sixteen_to_sixty_four_years = req.body.from_sixteen_to_sixty_four_years || stat.from_sixteen_to_sixty_four_years;
      stat.sixty_five_and_over = req.body.sixty_five_and_over || stat.sixty_five_and_over;
    }*/
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

//METODO DELETE PARA LA RUTA BASE PARA BORRAR DATO ESPECÍFICO.
app.delete(BASE_API_URL + "/employment-stats", (req, res) => {
  db.remove({}, {multi : true}, (err, numRemoved) =>{

    if(err){
        res.sendStatus(500, "Error cliente");   
    }
  if (!req.body || Object.keys(req.body).length === 0) {
    db.remove({}, {multi : true}, (err, numRemoved)=>{
      if (err){
          res.sendStatus(500,"Error cliente");
          return;
      } else {
      res.sendStatus(200,"Deleted");
    }
      
  });
  }else{
  const { year, region } = req.body;
  db.find({},function(err, filteredList){

    if(err){
        res.sendStatus(500, "Error cliente");   
    }
  // Buscar el objeto en la matriz evolution_stats
  filteredList = filteredList.filter((obj)=>
                {
                    return(obj.region === region && obj.year === year);
                });
  db.remove({region: region, year: year}, {}, (err, numRemoved)=>{
    if (err){
        res.sendStatus(500,"Error cliente");
        return;
    }
  if (filteredList === []) {
    // Si el objeto no se encuentra, devolver un código de respuesta 404 Not Found
    res.status(404).json('El objeto no existe');
  } else {
    res.sendStatus(200,"Deleted");
    return;
  }
  });   
});
}


});
});

//DELETE EN RUTA EMPLOYMENT-STATS DE UNA CIUDAD.
app.delete('/api/v1/employment-stats/:region', (req, res) => {
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
app.delete('/api/v1/employment-stats/:city/:period', (req, res) => {
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

//Redirect /docs
app.get(BASE_API_URL+"/evolution-stats/docs",(req,res)=>{
  res.redirect("https://documenter.getpostman.com/view/26023285/2s93JzLgAB");
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






