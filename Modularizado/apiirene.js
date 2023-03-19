/*
var express = require("express");
var bodyParser = require("body-parser");
var appIFR = express();
var portIFR = process.env.PORT || 8081;
appIFR.use(bodyParser.json());
const BASE_API_URL = "/api/v1";
*/

//NeDB
const res = require('express/lib/response');
var Datastore = require('nedb');
var db = new Datastore();




module.exports =(app)=>{
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
  

db.insert(localentities_stats);

BASE_API_URL = "/api/v1";

app.get(BASE_API_URL + "/localentities-stats/docs", (req,res)=>{
  res.redirect(API_DOC_PORTAL);
});



app.post(BASE_API_URL + "/localentities-stats", (request,response) => {
  const province = request.body.province;
  const president_appointment_date = request.body.president_appointment_date;
  
  console.log("New POST to /localentities-stats"); //console.log en el servidor
  db.find({}, function(error, filteredList){
    if(error){
      res.sendStatus(500, "ERROR CLIENTE");
    }

    const requiredFields = ['province', 'landline', 'first_name', 'second_name', 'president_appointment_date', 'surface_extension', 'population', 'expense', 'income'];
    for(const field of requiredFields){
      if(!request.body.hasOwnProperty(field)){
        response.status(400).json(`Missing required field: ${field}`);
        return;
      }
    }

    if(request.originalUrl !== '/api/v1/localentities-stats'){
      res.status(405).json('Método no permitido');
    } else {
      filteredList = filteredList.filter((obj)=>{
          return(province == obj.province && president_appointment_date == obj.president_appointment_date)
      });
      if (filteredList.length !=0) {
      response.status(409).json(`El recurso ya existe.`);
      } else {
      db.insert(request.body);
      response.sendStatus(201);
      }
    }
  });
  });


  
  //10 o más datos

  
  app.get(BASE_API_URL + "/localentities-stats/loadInitialData", (req, res) => {
    db.find({}, function(error,filteredList){

      if(error){
          res.sendStatus(500, "ERROR CLIENTE");
      }
      console.log(filteredList);
    if (filteredList.length === 0) {
      for(var i = 0; i<localentities_stats.length;i++){
        db.insert(localentities_stats[i]);
    }
      res.sendStatus(200);
      console.log("Se han creado datos")
    } else {
      res.json('El arreglo ya contiene datos');
      console.log('El arreglo ya contiene datos')
    }
  });
  });
  


  
//Motrar las ciudades en un año concreto
  
app.get('/api/v1/localentities-stats', (req, res) => {
  const from = req.query.from;
  const to = req.query.to;

  const province = req.query.province;
  const landline = req.query.landline;
  const first_name = req.query.first_name;
  const second_name = req.query.second_name;
  const president_appointment_date = req.query.president_appointment_date;
  const surface_extension = req.query.surface_extension;
  const population = req.query.population;
  const expense = req.query.expense;
  const income = req.query.income;


  db.find({}, function(error, filteredList){

    if(error){
      res.sendStatus(500, "ERROR CLIENTE");
    }

    if (from && to) {
      if (from >= to) {
        res.status(400).json("El rango de años especificado es inválido");
      }else{
        console.log(`/GET to /localentities-stats?from=${from}&to=${to}`); //console.log en el servidor
        filteredList = filteredList.filter((ciudad) => {
          return (ciudad.president_appointment_date >= from && ciudad.president_appointment_date <= to);
       });
       res.status(200).json(filteredList.map((e)=>{
        delete e._id;
        return e;
      }));
      }

    }

    //PROVINCIA Y TELEFONO
    else if(province && landline){
      filteredList = filteredList.filter((stat) => {
        return (stat.province === province && stat.landline >= landline);
     });
     console.log("New GET to /localentities-stats with province and landlines"); //console.log en el servidor 
     filteredList.map((e)=>{
       delete e._id;
       return e;
     });
     res.send(JSON.stringify(filteredList,null,2));
    }
    
    //PROVINCIA Y NOMBRE
    else if(province && first_name){
      filteredList = filteredList.filter((stat) => {
        return (stat.province === province && stat.first_name >= first_name);
     });
     console.log("New GET to /localentities-stats with province and first_name"); //console.log en el servidor 
     res.status(200).json(filteredList.map((e)=>{
       delete e._id;
       return e;
     }));
     res.send(JSON.stringify(filteredList,null,2));
    }
    
    //PROVINVIA Y APELLIDOS
    else if(province && second_name){
      filteredList = filteredList.filter((stat) => {
        return (stat.province === province && stat.second_name >= second_name);
     });
     console.log("New GET to /localentities-stats with province and second_name"); //console.log en el servidor 
     filteredList.map((e)=>{
       delete e._id;
       return e;
     });
     res.send(JSON.stringify(filteredList,null,2));   
    }
    
    //PROVINCIA Y SUPERFICIE
    else if(province && surface_extension){
      filteredList = filteredList.filter((stat) => {
        return (stat.province === province && stat.surface_extension >= surface_extension);
     });
     console.log("New GET to /localentities-stats with province and surface_extension"); //console.log en el servidor 
     res.status(200).json(filteredList.map((e)=>{
       delete e._id;
       return e;
     }));
     //res.send(JSON.stringify(filteredList,null,2));
    }

    //PROVINCIA Y POBLACION
    else if(province && population){
      filteredList = filteredList.filter((stat) => {
        return (stat.province === province && stat.population >= population);
     });
     console.log("New GET to /localentities-stats with province and population"); //console.log en el servidor 
     res.status(200).json(filteredList.map((e)=>{
       delete e._id;
       return e;
     }));
     //res.send(JSON.stringify(filteredList,null,2));
    }

    //PROVINCIA Y GASTOS
    else if(province && expense){
      filteredList = filteredList.filter((stat) => {
        return (stat.province === province && stat.expense >= expense);
     });
     console.log("New GET to /localentities-stats with province and expense"); //console.log en el servidor 
     res.status(200).json(filteredList.map((e)=>{
       delete e._id;
       return e;
     }));
     //res.send(JSON.stringify(filteredList,null,2));
    }
    //PROVINCIA E INGRESOS
    else if(province && income){
      filteredList = filteredList.filter((stat) => {
        return (stat.province === province && stat.income >= income);
    });
    console.log("New GET to /localentities-stats with province and income"); //console.log en el servidor 
    res.status(200).json(filteredList.map((e)=>{
      delete e._id;
      return e;
    }));
    //res.send(JSON.stringify(filteredList,null,2));
    }

    //FECHA PRESENTE Y TELÉFONO
    else if(president_appointment_date && landline){
      filteredList = filteredList.filter((stat) => {
        return (stat.president_appointment_date === parseInt(president_appointment_date) && stat.landline >= landline);
    });
    console.log("New GET to /localentities-stats with president_appointment_date and landline"); //console.log en el servidor 
    res.status(200).json(filteredList.map((e)=>{
      delete e._id;
      return e;
    }));
    //res.send(JSON.stringify(filteredList,null,2));
    }
    
    //FECHA PRESENTE Y NOMBRE
    else if(president_appointment_date && first_name){
      filteredList = filteredList.filter((stat) => {
        return (stat.president_appointment_date === parseInt(president_appointment_date) && stat.first_name >= first_name);
    });
    console.log("New GET to /localentities-stats with president_appointment_date and first_name"); //console.log en el servidor 
    res.status(200).json(filteredList.map((e)=>{
      delete e._id;
      return e;
    }));
    //res.send(JSON.stringify(filteredList,null,2));
    }

    //FECHA PRESENTE Y APELLIDOS  
    else if(president_appointment_date && second_name){
      filteredList = filteredList.filter((stat) => {
        return (stat.president_appointment_date === parseInt(president_appointment_date) && stat.second_name >= second_name);
    });
    console.log("New GET to /localentities-stats with president_appointment_date and second_name"); //console.log en el servidor 
    res.status(200).json(filteredList.map((e)=>{
      delete e._id;
      return e;
    }));
    //res.send(JSON.stringify(filteredList,null,2));
    }

    //FECHA PRESENTE Y ENTENSIÓN
    else if(president_appointment_date && surface_extension){
      filteredList = filteredList.filter((stat) => {
        return (stat.president_appointment_date === parseInt(president_appointment_date) && stat.surface_extension >= surface_extension);
    });
    console.log("New GET to /localentities-stats with president_appointment_date and surface_extension"); //console.log en el servidor 
    res.status(200).json(filteredList.map((e)=>{
      delete e._id;
      return e;
    }));
    //res.send(JSON.stringify(filteredList,null,2));
    }

    //FECHA PRESENTE Y POBLACION
    else if(president_appointment_date && population){
      filteredList = filteredList.filter((stat) => {
        return (stat.president_appointment_date === parseInt(president_appointment_date) && stat.population >= population);
    });
    console.log("New GET to /localentities-stats with president_appointment_date and population"); //console.log en el servidor 
    res.status(200).json(filteredList.map((e)=>{
      delete e._id;
      return e;
    }));
    //res.send(JSON.stringify(filteredList,null,2));
    }

    //FECHA PRESENTE Y GASTOS
    else if(president_appointment_date && expense){
      filteredList = filteredList.filter((stat) => {
        return (stat.president_appointment_date === parseInt(president_appointment_date) && stat.expense >= expense);
    });
    console.log("New GET to /localentities-stats with president_appointment_date and expense"); //console.log en el servidor 
    res.status(200).json(filteredList.map((e)=>{
      delete e._id;
      return e;
    }));
    //res.send(JSON.stringify(filteredList,null,2));
    }

    //FECHA PRESENTE E INGRESOS
    else if(president_appointment_date && income){
      filteredList = filteredList.filter((stat) => {
        return (stat.president_appointment_date === parseInt(president_appointment_date) && stat.income >= income);
    });
    console.log("New GET to /localentities-stats with president_appointment_date and income"); //console.log en el servidor 
    res.status(200).json(filteredList.map((e)=>{
      delete e._id;
      return e;
    }));
    //res.send(JSON.stringify(filteredList,null,2));
    }
    else{

      const { president_appointment_date } = req.query;

    if (president_appointment_date) {
      filteredList = filteredList.filter((stat) => {
        return (stat.president_appointment_date === parseInt(president_appointment_date));
      });
      console.log("New GET to /localentities-stats with president_appointment_date"); //console.log en el servidor 
      res.status(200).json(filteredList.map((e)=>{
        delete e._id;
        return e;
      }));
      if(req.query.limit != undefined || req.query.offset != undefined){
        filteredList = paginar(req,filteredList);
    }
    //res.send(JSON.stringify(filteredList,null,2));
    } else {
      console.log("New GET to /localentities-stats"); //console.log en el servidor
          filteredList.map((e)=>{
            delete e._id;
            return e;
          });
          if(req.query.limit != undefined || req.query.offset != undefined){
            filteredList = paginar(req,filteredList);
        }
        res.send(JSON.stringify(filteredList,null,2));
        //res.json(filteredList);
        //}
      //});
    }

    }
    });
  });

  
  //TABLITA AZUL
  const rutaIrene = '/api/v1/localentities-stats';
      
  // Método POST para la ruta base
  app.post(rutaIrene + "/localentities-stats", (request, response) => {
    const province = request.body.province;
    const president_appointment_date = request.body.president_appointment_date;
    console.log("New POST to /localentities-stats"); //console.log en el servidor  
    db.find({}, function(error, filteredList){

      if(error){
        res.sendStatus(500, "ERROR CLIENTE");   
      }
      // Validar que se envíen todos los campos necesarios
      const requiredFields = ['province', 'landline', 'first_name', 'second_name', 'president_appointment_date', 'surface_extension', 'population', 'expense', 'income'];
      for (const field of requiredFields) {
        if (!request.body.hasOwnProperty(field)) {
          response.status(400).json(`Missing required field: ${field}`);
          return;
        }
      }
      // Verificar que la solicitud se hizo en la ruta correcta
      if (request.originalUrl !== '/api/v1/localentities-stats') {
        res.status(405).json('Método no permitido');
        return;
      }else{

      // Verificar si el recurso ya existe
      filteredList = filteredList.filter((obj)=>
                    {
                        return(province == obj.province && president_appointment_date == obj.president_appointment_date)
                    });
      if (filteredList.length !=0) {
        response.status(409).json(`El recurso ya existe.`);
      } else {
        db.insert(request.body);
        response.sendStatus(201);
      }
    }
    });
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
  
  /*
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
  

*/


//CODIGO PARA PODER HACER GET A UNA CIUDAD ESPECÍFICA Y A UNA CIUDAD Y PERIODO CONCRETO.
app.get('/api/v1/localentities-stats/:city', (req, res) => {
  const city = req.params.city.toLowerCase();
  const from = req.query.from;
  const to = req.query.to;

  //const province = req.query.province;
  const landline = req.query.landline;
  const first_name = req.query.first_name;
  const second_name = req.query.second_name;
  const president_appointment_date = req.query.president_appointment_date;
  const surface_extension = req.query.surface_extension;
  const population = req.query.population;
  const expense = req.query.expense;
  const income = req.query.income;

  db.find({},function(error, filteredList){

    if(error){
        res.sendStatus(500, "ERROR CLIENTE");   
    }
    if (from && to) {
      filteredList = filteredList.filter((obj)=>
                  {
                      return(obj.province.toLowerCase() == city && obj.president_appointment_date >= from && obj.president_appointment_date<= to);
                  });
      console.log(`/GET to /localentities-stats/${city}?from=${from}&to=${to}`); //console.log en el servidor
      res.status(200).jsonfilteredList.forEach((e)=>{
      delete e._id;
      });
      //res.send(JSON.stringify(filteredList,null,2));
    }
    
    // TELEFONOS
    else if(landline){
      filteredList = filteredList.filter((obj)=>
                  {
                      return(obj.landline == landline);
                  });
                  console.log(`/GET to /localentities-stats/${city}?${landline}`); //console.log en el servidor
                  res.status(200);
                  filteredList.forEach((e)=>{
                    delete e._id;
                  });
                  res.send(JSON.stringify(filteredList,null,2));
    }
    
    // POBLACION
    else if(first_name){
      filteredList = filteredList.filter((obj)=>
                  {
                      return(obj.first_name == first_name);
                  });
                  console.log(`/GET to /localentities-stats/${city}?${first_name}`); //console.log en el servidor
                  res.status(200);
                  filteredList.forEach((e)=>{
                    delete e._id;
                  });
                  res.send(JSON.stringify(filteredList,null,2));
    }
    
    //SEGUNDO NOMBRE
    else if(second_name){
      filteredList = filteredList.filter((obj)=>
                  {
                      return(obj.second_name == second_name);
                  });
                  console.log(`/GET to /localentities-stats/${city}?${second_name}`); //console.log en el servidor
                  res.status(200);
                  filteredList.forEach((e)=>{
                    delete e._id;
                  });
                  res.send(JSON.stringify(filteredList,null,2));
    }
    
    //PRESIDENTE
    else if(president_appointment_date){
      filteredList = filteredList.filter((obj)=>
                  {
                      return(obj.president_appointment_date == president_appointment_date);
                  });
                  console.log(`/GET to /localentities-stats/${city}?${president_appointment_date}`); //console.log en el servidor
                  res.status(200);
                  filteredList.forEach((e)=>{
                    delete e._id;
                  });
                  res.send(JSON.stringify(filteredList,null,2));
    }
    
    //EXTENSION
    else if(surface_extension){
      filteredList = filteredList.filter((obj)=>
                  {
                      return(obj.surface_extension == surface_extension);
                  });
                  console.log(`/GET to /localentities-stats/${city}?${surface_extension}`); //console.log en el servidor
                  res.status(200);
                  filteredList.forEach((e)=>{
                    delete e._id;
                  });
                  res.send(JSON.stringify(filteredList,null,2));
    }
    
    //POBLACION
    else if(population){
      filteredList = filteredList.filter((obj)=>
                  {
                      return(obj.population == population);
                  });
                  console.log(`/GET to /localentities-stats/${city}?${population}`); //console.log en el servidor
                  res.status(200);
                  filteredList.forEach((e)=>{
                    delete e._id;
                  });
                  res.send(JSON.stringify(filteredList,null,2));
    }
    
    //GASTOS
    else if(expense){
      filteredList = filteredList.filter((obj)=>
                  {
                      return(obj.expense == expense);
                  });
                  console.log(`/GET to /localentities-stats/${city}?${expense}`); //console.log en el servidor
                  res.status(200);
                  filteredList.forEach((e)=>{
                    delete e._id;
                  });
                  res.send(JSON.stringify(filteredList,null,2));
    }
    
    //INGRESOS
    else if(income){
      filteredList = filteredList.filter((obj)=>
                  {
                      return(obj.income == income);
                  });
                  console.log(`/GET to /localentities-stats/${city}?${income}`); //console.log en el servidor
                  res.status(200);
                  filteredList.forEach((e)=>{
                    delete e._id;
                  });
                  res.send(JSON.stringify(filteredList,null,2));
    } else {
     // Lógica para devolver los datos de la ciudad
    filteredList = filteredList.filter((obj)=>
                {
                    return(obj.province.toLowerCase() == city);
                });
    if(filteredList.length === 0){
      res.status(404).json('La ruta solicitada no existe');
    }else{
      console.log("/GET a una ciudad concreta");
    filteredList.forEach((e)=>{
      delete e._id;
    });                                                                               
    if(req.query.limit != undefined || req.query.offset != undefined){
      filteredList = paginar(req,filteredList);
  }
    res.send(JSON.stringify(filteredList,null,2));
    }
  }
});
});
  



//CODIGO PARA PODER HACER UN GET A UNA CIUDAD Y FECHA ESPECÍFICA.
app.get('/api/v1/localentities-stats/:province/:year', (req, res) => {
  const { province, year } = req.params;
  db.find({}, function(error, filteredList){

    if(error){
     res.sendStatus(500, "ERROR CLIENTE");
    }
  // Buscamos las estadísticas para el territorio y el año indicados
  filteredList = filteredList.filter((obj)=>
                {
                    return(obj.province.toLowerCase() == province.toLowerCase() && obj.president_appointment_date === parseInt(year));
                });
  
  if (filteredList) {
    filteredList.forEach((e)=>{
      delete e._id;
    });
    if(req.query.limit != undefined || req.query.offset != undefined){
      filteredList = paginar(req,filteredList);
  }
    res.send(JSON.stringify(filteredList,null,2));
  } else {
    res.status(404).json('La ruta solicitada no existe');
  }
  console.log("Solicitud /GET")
});
});



//CODIGO PARA ACTUALIZAR MEDIANTE PUT UNA RUTA CONCRETA.
app.put('/api/v1/localentities-stats/:city/:year', (req, res) => {
  const city = req.params.city;
  const year = parseInt(req.params.year);
  const city_body = req.body.province;
  const year_body = req.body.president_appointment_date;
  const body = req.body;

  db.find({},function(error, filteredList){

    if(error){
        res.sendStatus(500, "ERROR CLIENTE");   
    }
  filteredList = filteredList.filter((obj)=>
                {
                    return(obj.province === city && obj.president_appointment_date === year);
                });
  if (!filteredList || city!==city_body || year!==year_body) {
    return res.status(400).json('Estadística errónea');
  }else{
    filteredList.landline = req.body.landline || filteredList.landline;
    filteredList.first_name = req.body.first_name || filteredList.first_name;
    filteredList.second_name = req.body.second_name || filteredList.second_name;
    filteredList.surface_extension = req.body.surface_extension || filteredList.surface_extension;
    filteredList.population = req.body.population || filteredList.population;
    filteredList.expense = req.body.expense || filteredList.expense;
    filteredList.income = req.body.income || filteredList.income;
  
    db.update({ $and: [{ province: String(city) }, { president_appointment_date: parseInt(year) }] }, { $set: body }, {}, function (error, numUpdated) {
      if (error) {
          res.sendStatus(500, "INTERNAL SERVER ERROR");
      } else {
          res.sendStatus(200, "UPDATED");
      }
  });
  }
});
});



//CODIGO PARA ACTUALIZAR MEDIANTE PUT UNA CIUDAD
app.put('/api/v1/localentities-stats/:city', (req, res) => {
  const city = req.params.city;
  const citybody = req.body.province;
  const body = req.body;

  db.find({},function(error, filteredList){

  if(error){
    res.sendStatus(500, "ERROR CLIENTE");   
  }
  filteredList = filteredList.filter((obj)=>
                {
                    return(obj.territory === city);
                });
  if (filteredList.length === 0 || city !== citybody) {
    return res.status(400).json('Estadística errónea');
  } else {
    /*for (let i = 0; i < statsToUpdate.length; i++) {
      const stat = statsToUpdate[i];
      stat.landline = req.body.landline || stat.landline;
      stat.first_name = req.body.first_name || stat.first_name;
      stat.second_name = req.body.second_name || stat.second_name;
      stat.surface_extension = req.body.surface_extension || stat.surface_extension;
      stat.population = req.body.population || stat.population;
      stat.expense = req.body.expense || stat.expense;
      stat.income = req.body.income || stat.income;
}*/
  db.update({ province: String(city) }, { $set: body }, { multi: true }, function (error, numUpdated) {
    if (error) {
        res.sendStatus(500, "INTERNAL SERVER ERROR");
    } else {
        res.sendStatus(200, "UPDATED");
    }
  });
  }
});
});






//METODO DELETE PARA LA RUTA BASE PARA BORRAR DATO ESPECÍFICO.
app.delete(BASE_API_URL + "/localentities-stats", (req, res) => {
  db.remove({}, {multi : true}, (error, numRemoved) =>{

    if(error){
        res.sendStatus(500, "ERROR CLIENTE");   
    }
  if (!req.body || Object.keys(req.body).length === 0) {
    db.remove({}, {multi : true}, (error, numRemoved)=>{
      if (error){
          res.sendStatus(500,"ERROR CLIENTE");
          return;
      } else {
      res.sendStatus(200,"DELETED");
    }
      
  });
  }else{
  const { president_appointment_date, province } = req.body;
  db.find({},function(error, filteredList){

    if(error){
        res.sendStatus(500, "ERROR CLIENTE");   
    }
  // Buscar el objeto en la matriz localentities_stats
  filteredList = filteredList.filter((obj)=>
                {
                    return(obj.province === province && obj.president_appointment_date === president_appointment_date);
                });
  db.remove({province: province, president_appointment_date: president_appointment_date}, {}, (error, numRemoved)=>{
    if (error){
        res.sendStatus(500,"ERROR CLIENTE");
        return;
    }
  if (filteredList === []) {
    // Si el objeto no se encuentra, devolver un código de respuesta 404 Not Found
    res.status(404).json('El objeto no existe');
  } else {
    res.sendStatus(200,"DELETED");
    return;
  }
  });   
});
}


});
});


//DELETE PARA UNA RUTA ESPECÍFICA DE UNA CIUDAD.
app.delete('/api/v1/localentities-stats/:province', (req, res) => {
  const province = req.params.province;
  db.find({},function(error, filteredList){

    if(error){
        res.sendStatus(500, "ERROR CLIENTE");   
    }

  filteredList = filteredList.filter((obj)=>
                {
                    return(obj.province === province);
                });
  if (filteredList.length === 0) {
    res.status(404).json(`No se encontraron datos para ${province}`);
  } else {
    filteredList = filteredList.filter((obj)=>{return(obj.province === province);});

    if (filteredList) {
      db.remove({province: province}, {multi : true}, (error, numRemoved)=>{
        if (error){
            res.sendStatus(500,"ERROR CLIENTE");
            return;
        }
      else {
        res.sendStatus(200,"DELETED");
        return;
      }
        
    });
    } else {
      res.status(404).json(`No se encontraron datos que coincidan con los criterios de eliminación para ${territory}`);
    }
  }
});
});



function paginar(req, lista){

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


/*
module.exports = {
  express,
  bodyParser,
  appIFR,
  portIFR,
  localentities_stats,
  BASE_API_URL,
  datos_randomIFR,
  rutaIrene
};
*/