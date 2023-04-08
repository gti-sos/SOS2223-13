import Datastore from 'nedb';
var db = new Datastore();
const API_DOC_PORTAL = "https://documenter.getpostman.com/view/25977296/2s93XsXRSY";

function loadBackendLMMGV2(app){


// CODIGO LUIS MIGUEL PARA ENTREGA F05.
var evolution_stats = [
  {period:1980 , territory:"Almería" , total_population:407049 , man:200870 , woman:206179 , under_sixteen_years:126573 , from_sixteen_to_sixty_four_years:237986, sixty_five_and_over:42490},
  {period:1980 , territory:"Cádiz" , total_population:978033 , man:486193 , woman:491840 , under_sixteen_years:336323 , from_sixteen_to_sixty_four_years:564655, sixty_five_and_over:77056},
  {period:1980 , territory:"Córdoba" , total_population:723500 , man:353491 , woman:370009 , under_sixteen_years:211329 , from_sixteen_to_sixty_four_years:429267, sixty_five_and_over:82904},
  {period:1980 , territory:"Granada" , total_population:757908 , man:372127 , woman:385781 , under_sixteen_years:228777 , from_sixteen_to_sixty_four_years:448458, sixty_five_and_over:80673},
  {period:1980 , territory:"Huelva" , total_population:416795 , man:205034 , woman:211762 , under_sixteen_years:124960 , from_sixteen_to_sixty_four_years:242563, sixty_five_and_over:49272},
  {period:1980 , territory:"Jaén" , total_population:642418 , man:316540 , woman:325878 , under_sixteen_years:189355 , from_sixteen_to_sixty_four_years:378264, sixty_five_and_over:74800},
  {period:1980 , territory:"Málaga" , total_population:1005166 , man:495474 , woman:509692 , under_sixteen_years:314321 , from_sixteen_to_sixty_four_years:595677, sixty_five_and_over:95169},
  {period:1980 , territory:"Sevilla" , total_population:1466006 , man:718237 , woman:747768 , under_sixteen_years:473646 , from_sixteen_to_sixty_four_years:856207, sixty_five_and_over:136152},
  {period:1981 , territory:"Almería" , total_population:410149 , man:202522 , woman:207628, under_sixteen_years:126054 , from_sixteen_to_sixty_four_years:240718, sixty_five_and_over:43378},
  {period:1981 , territory:"Cádiz" , total_population:986913 , man:490709 , woman:496204 , under_sixteen_years:333916 , from_sixteen_to_sixty_four_years:574163, sixty_five_and_over:78834},
  {period:1981 , territory:"Córdoba" , total_population:721446 , man:352398 , woman:369048 , under_sixteen_years:206851 , from_sixteen_to_sixty_four_years:430649, sixty_five_and_over:83947},
  {period:1981 , territory:"Granada" , total_population:758607 , man:372517 , woman:386089 , under_sixteen_years:224458 , from_sixteen_to_sixty_four_years:452025, sixty_five_and_over:82123},
  {period:1981 , territory:"Huelva" , total_population:418120 , man:205932 , woman:212188 , under_sixteen_years:124519 , from_sixteen_to_sixty_four_years:243760, sixty_five_and_over:49842},
  {period:1981 , territory:"Jaén" , total_population:640103 , man:315247 , woman:324855 , under_sixteen_years:185723 , from_sixteen_to_sixty_four_years:378964, sixty_five_and_over:75415},
  {period:1981 , territory:"Málaga" , total_population:1.022386 , man:503948 , woman:518438 , under_sixteen_years:314563 , from_sixteen_to_sixty_four_years:609016, sixty_five_and_over:98807},
  {period:1981 , territory:"Sevilla" , total_population:1476330 , man:723670 , woman:752659 , under_sixteen_years:469193 , from_sixteen_to_sixty_four_years:867787, sixty_five_and_over:139349},
  {period:1982 , territory:"Almería" , total_population:415261 , man:205152 , woman:210109 , under_sixteen_years:126010 , from_sixteen_to_sixty_four_years:245476, sixty_five_and_over:43776},
  {period:1982 , territory:"Cádiz" , total_population:999385 , man:497050 , woman:502335 , under_sixteen_years:333241 , from_sixteen_to_sixty_four_years:586146, sixty_five_and_over:79998},
  {period:1982 , territory:"Córdoba" , total_population:725044 , man:354301 , woman:370743 , under_sixteen_years:203305 , from_sixteen_to_sixty_four_years:436913, sixty_five_and_over:84825},
  {period:1982 , territory:"Granada" , total_population:762941 , man:374615 , woman:388327 , under_sixteen_years:220528 , from_sixteen_to_sixty_four_years:459429, sixty_five_and_over:82985},
  {period:1982 , territory:"Huelva" , total_population:421660 , man:207739 , woman:213921 , under_sixteen_years:124533 , from_sixteen_to_sixty_four_years:247075, sixty_five_and_over:50051},
  {period:1982 , territory:"Jaén" , total_population:640864 , man:315913 , woman:324951 , under_sixteen_years:181619 , from_sixteen_to_sixty_four_years:383614, sixty_five_and_over:75631},
  {period:1982 , territory:"Málaga" , total_population:1038489 , man:511716 , woman:526773 , under_sixteen_years:314007 , from_sixteen_to_sixty_four_years:623660, sixty_five_and_over:100822},
  {period:1982 , territory:"Sevilla" , total_population:1494347 , man:732722 , woman:761624 , under_sixteen_years:468201 , from_sixteen_to_sixty_four_years:884345, sixty_five_and_over:141800}
];      

db.insert(evolution_stats);
//console.log("Insertados datos al comenzar");
 
const BASE_API_URL = "/api/v2";

//Redirect /docs
app.get(BASE_API_URL+"/evolution-stats/docs",(req,res)=>{
  res.redirect(API_DOC_PORTAL);
});

app.post(BASE_API_URL + "/evolution-stats", (request, response) => {
  //var NewEvolution = request.body;
  const territory = request.body.territory;
  const period = request.body.period;
  console.log("New POST to /evolution-stats"); //console.log en el servidor
  db.find({},function(err,filteredList){

    if(err){
        res.sendStatus(500, "CLIENT ERROR");
    }

  // Validar que se envíen todos los campos necesarios
  const requiredFields = ['period', 'territory', 'total_population', 'man', 'woman', 'under_sixteen_years', 'from_sixteen_to_sixty_four_years', 'sixty_five_and_over'];
  for (const field of requiredFields) {
    if (!request.body.hasOwnProperty(field)) {
      return response.status(400).json(`Missing required field: ${field}`);
    }
  }
  // Verificar que la solicitud se hizo en la ruta correcta
  if (request.originalUrl !== '/api/v2/evolution-stats') {
    res.status(405).json('Método no permitido');
  }else{ 

  // Verificar si el recurso ya existe
  //const existingObject = evolution_stats.find(obj => obj.territory === territory && obj.period === period);
  filteredList = filteredList.filter((obj)=>
                {
                    return(territory == obj.territory && period == obj.period)
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




//APARTADO CREAR 10 O MÁS DATOS RANDOM

app.get(BASE_API_URL + "/evolution-stats/loadInitialData", (req, res) => {
  db.find({}, function(err,filteredList){

    if(err){
        res.sendStatus(500, "CLIENT ERROR");
    
    }
    console.log(filteredList);
  if (filteredList.length === 0) {
    for(var i = 0; i<evolution_stats.length;i++){
      db.insert(evolution_stats[i]);
  }
    res.sendStatus(200);
    console.log("Se han creado datos")
  } else {
    res.json('El arreglo ya contiene datos');
    //res.json(datos_random)
    console.log('El arreglo ya contiene datos')
  }
});
});


//CODIGO PARA MOSTRAR LAS ESTADÍSTICAS A PARTIR DE LA QUERY.
//GET a evolution-stats
app.get('/api/v2/evolution-stats', (req, res) => {

  console.log("/GET evolution-stats");

  // Empezamos viendo los registros de la db y eliminamos el _id.
  db.find({}, {_id: 0}, (err, filteredList) => {

              // Comprobamos los errores que han podido surgir
              if(err){

                  console.log(`Error getting evolution-stats`);

                  // El estado es el 500 de Internal Server Error
                  res.sendStatus(500);

              // Comprobamos si existen datos:
              }else if(filteredList.length == 0){

                  console.log(`Ruta evolution-stats Not Found`);

                  // Si no existen datos usamos el estado es 404 de Not Found
                  res.sendStatus(404);

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
                      return (((req.query.period == undefined)||(parseInt(req.query.period) === x.period))&&
                      ((req.query.from == undefined)||(parseInt(req.query.from) <= x.period))&&
                      ((req.query.to == undefined)||(parseInt(req.query.to) >= x.period))&&
                      ((req.query.territory == undefined)||(req.query.territory === x.territory))&&
                      ((req.query.total_population_over == undefined)||(parseInt(req.query.total_population_over) <= x.total_population))&&
                      ((req.query.total_population_under == undefined)||(parseInt(req.query.total_population_under) >= x.total_population))&&
                      ((req.query.man_over == undefined)||(parseInt(req.query.man_over) <= x.man))&&
                      ((req.query.man_under == undefined)||(parseInt(req.query.man_under) >= x.man))&&
                      ((req.query.woman_over == undefined)||(parseInt(req.query.woman_over) <= x.woman))&&
                      ((req.query.woman_under == undefined)||(parseInt(req.query.woman_under) >= x.woman))&&
                      ((req.query.under_sixteen_years_over == undefined)||(parseInt(req.query.under_sixteen_years_over) <= x.under_sixteen_years))&&
                      ((req.query.under_sixteen_years_under == undefined)||(parseInt(req.query.under_sixteen_years_under) >= x.under_sixteen_years))&&
                      ((req.query.from_sixteen_to_sixty_four_years_over == undefined)||(parseInt(req.query.from_sixteen_to_sixty_four_years_over) <= x.from_sixteen_to_sixty_four_years))&&
                      ((req.query.from_sixteen_to_sixty_four_years_under == undefined)||(parseInt(req.query.from_sixteen_to_sixty_four_years_under) >= x.from_sixteen_to_sixty_four_years))&&
                      ((req.query.sixty_five_and_over_over == undefined)||(parseInt(req.query.sixty_five_and_over_over) <= x.sixty_five_and_over))&&
                      ((req.query.sixty_five_and_over_under == undefined)||(parseInt(req.query.sixty_five_and_over_under) >= x.sixty_five_and_over)));
                  }).filter((x) => {
                      // La paginación
                      i = i+1;
                      if(req.query.limit==undefined){ 
                        var cond = true;
                      }else{ 
                        var cond = (offset + parseInt(req.query.limit)) >= i;
                      }
                      return (i>offset)&&cond;
                  });

                  // Comprobamos si tras el filtrado sigue habiendo datos, si no hay:
                  if(datos.length == 0){

                      console.log(`evolution-stats not found`);
                      // Estado 404: Not Found
                      res.sendStatus(404);

                  // Si por el contrario encontramos datos
                  }else{

                      console.log(`Datos de evolution-stats devueltos: ${datos.length}`);
                      // Devolvemos dichos datos, estado 200: OK
                      res.json(datos);

                  }
              }
      })
});

//MÉTODOS TABLA AZUL.
const rutaBase = '/api/v2/evolution-stats';

// Método POST para la ruta base
app.post(rutaBase, (request, response) => {
  const territory = request.body.territory;
  const period = request.body.period;
  console.log("New POST to /evolution-stats"); //console.log en el servidor  
  db.find({},function(err, filteredList){

    if(err){
        res.sendStatus(500, "Client Error");   
    }
    // Validar que se envíen todos los campos necesarios
  const requiredFields = ['period', 'territory', 'total_population', 'man', 'woman', 'under_sixteen_years', 'from_sixteen_to_sixty_four_years', 'sixty_five_and_over'];
  for (const field of requiredFields) {
    if (!request.body.hasOwnProperty(field)) {
      response.status(400).json(`Missing required field: ${field}`);
      return;
    }
  }
  // Verificar que la solicitud se hizo en la ruta correcta
  if (request.originalUrl !== '/api/v2/evolution-stats') {
    res.status(405).json('Método no permitido');
    return;
  }else{

  // Verificar si el recurso ya existe
  //const existingObject = evolution_stats.find(obj => obj.territory === territory && obj.period === period);
  filteredList = filteredList.filter((obj)=>
                {
                    return(territory == obj.territory && period == obj.period)
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
app.put(rutaBase, (req, res) => {
  res.status(405).json('El método PUT no está permitido en esta ruta');
});


// Ruta específica que no permite el método POST
const rutaEspecifica = '/api/v2/evolution-stats/loadInitialData';
app.post(rutaEspecifica, (req, res) => {
  res.status(405).json('El método POST no está permitido en esta ruta');
});

// Ruta Específica Método GET
/*app.get(rutaEspecifica, (req, res) => {
  res.json(datos_random);
  res.status(200);
});*/

// Ruta Específica Método PUT
/*app.put(rutaEspecifica, (req, res) => {
  // Verificar que el cuerpo de la solicitud contenga datos
  if (!req.body) {
    // Enviar una respuesta con un código de estado 400 Bad Request si no se proporcionaron datos
    res.status(400).send('No se proporcionaron datos');
  } else {
    // Reemplazar los datos existentes con los nuevos datos
    datos_random = req.body;
    // Enviar una respuesta con un código de estado 200 OK
    res.status(200).json('Los datos se han actualizado correctamente');
  }
});*/

//Método DELETE de la ruta específica.
/*app.delete(rutaEspecifica, (req, res) => {
  datos_random = [];
  res.status(200).json('Los datos se han borrado correctamente');
});*/


//CODIGO PARA PODER HACER GET A UNA CIUDAD ESPECÍFICA Y A UNA CIUDAD Y PERIODO CONCRETO.
app.get('/api/v2/evolution-stats/:city', (req, res) => {
  const city = req.params.city.toLowerCase();
  const from = req.query.from;
  const to = req.query.to;
  //const territory = req.query.territory;
  const period = req.query.period;
  const total_population = req.query.total_population;
  const man = req.query.man;
  const woman = req.query.woman;
  const under_sixteen_years = req.query.under_sixteen_years;
  const from_sixteen_to_sixty_four_years = req.query.from_sixteen_to_sixty_four_years;
  const sixty_five_and_over = req.query.sixty_five_and_over;

  db.find({},function(err, filteredList){

    if(err){
        res.sendStatus(500, "Client Error");   
    }
  if (from && to) {
    // Lógica para devolver los datos de la ciudad para el periodo especificado
    filteredList = filteredList.filter((obj)=>
                {
                    return(obj.territory.toLowerCase() == city && obj.period >= from && obj.period<= to);
                });
    console.log(`/GET to /evolution-stats/${city}?from=${from}&to=${to}`); //console.log en el servidor
    filteredList.forEach((e)=>{
                  delete e._id;
                });
                res.status(200).json(filteredList);
  }else if(period){
    filteredList = filteredList.filter((obj)=>
                {
                    return(obj.period == period && obj.territory.toLowerCase() == city);
                });
                console.log(`/GET to /evolution-stats/${city}?${period}`); //console.log en el servidor
                filteredList.forEach((e)=>{
                  delete e._id;
                });
                res.status(200).json(filteredList);
  }else if(total_population){
    filteredList = filteredList.filter((obj)=>
                {
                    return(obj.total_population == total_population && obj.territory.toLowerCase() == city);
                });
                console.log(`/GET to /evolution-stats/${city}?${total_population}`); //console.log en el servidor
                filteredList.forEach((e)=>{
                  delete e._id;
                });
                res.status(200).json(filteredList);

  }else if(man){
    filteredList = filteredList.filter((obj)=>
                {
                    return(obj.man == man && obj.territory.toLowerCase() == city);
                });
                console.log(`/GET to /evolution-stats/${city}?${man}`); //console.log en el servidor
                filteredList.forEach((e)=>{
                  delete e._id;
                });
                res.status(200).json(filteredList);
  }else if(woman){
    filteredList = filteredList.filter((obj)=>
                {
                    return(obj.woman == woman && obj.territory.toLowerCase() == city);
                });
                console.log(`/GET to /evolution-stats/${city}?${woman}`); //console.log en el servidor
                filteredList.forEach((e)=>{
                  delete e._id;
                });
                res.status(200).json(filteredList);
  }else if(under_sixteen_years){
    filteredList = filteredList.filter((obj)=>
                {
                    return(obj.under_sixteen_years == under_sixteen_years && obj.territory.toLowerCase() == city);
                });
                console.log(`/GET to /evolution-stats/${city}?${under_sixteen_years}`); //console.log en el servidor
                filteredList.forEach((e)=>{
                  delete e._id;
                });
                res.status(200).json(filteredList);
  }else if(from_sixteen_to_sixty_four_years){
    filteredList = filteredList.filter((obj)=>
                {
                    return(obj.from_sixteen_to_sixty_four_years == from_sixteen_to_sixty_four_years && obj.territory.toLowerCase() == city);
                });
                console.log(`/GET to /evolution-stats/${city}?${from_sixteen_to_sixty_four_years}`); //console.log en el servidor
                filteredList.forEach((e)=>{
                  delete e._id;
                });
                res.status(200).json(filteredList);
  }else if(sixty_five_and_over){
    filteredList = filteredList.filter((obj)=>
                {
                    return(obj.sixty_five_and_over == sixty_five_and_over && obj.territory.toLowerCase() == city);
                });
                console.log(`/GET to /evolution-stats/${city}?${sixty_five_and_over}`); //console.log en el servidor
                filteredList.forEach((e)=>{
                  delete e._id;
                });
                res.status(200).json(filteredList);
  }
  else {
    // Lógica para devolver los datos de la ciudad
    filteredList = filteredList.filter((obj)=>
                {
                    return(obj.territory.toLowerCase() == city);
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
    res.status(200).json(filteredList);
    }
  }
});
});

//CODIGO PARA PODER HACER UN GET A UNA CIUDAD Y FECHA ESPECÍFICA.
app.get('/api/v2/evolution-stats/:territory/:year', (req, res) => {
  const { territory, year } = req.params;
  db.find({},function(err, filteredList){

    if(err){
        res.sendStatus(500, "Client Error");   
    }
  // Buscamos las estadísticas para el territorio y el año indicados
  filteredList = filteredList.filter((obj)=>
                {
                    return(obj.territory.toLowerCase() == territory.toLowerCase() && obj.period === parseInt(year));
                });
  
  if (filteredList) {
    filteredList.forEach((e)=>{
      delete e._id;
    });
    if(req.query.limit != undefined || req.query.offset != undefined){
      filteredList = pagination(req,filteredList);
  }
    res.status(200).json(filteredList);
  } else {
    res.status(404).json('La ruta solicitada no existe');
  }
  console.log("Solicitud /GET")
});
});
//CODIGO PARA ACTUALIZAR MEDIANTE PUT UNA RUTA CONCRETA.
app.put('/api/v2/evolution-stats/:city/:year', (req, res) => {
  const city = req.params.city;
  const year = parseInt(req.params.year);
  const citybody = req.body.territory;
  const yearbody = req.body.period;
  const body = req.body;
  db.find({},function(err, filteredList){

    if(err){
        res.sendStatus(500, "Client Error");   
    }
  filteredList = filteredList.filter((obj)=>
                {
                    return(obj.territory === city && obj.period === year);
                });
  if (!filteredList || city!==citybody || year!==yearbody) {
    return res.status(400).json('Estadística errónea');
  }else{
    filteredList.total_population = req.body.total_population || filteredList.total_population;
    filteredList.man = req.body.man || filteredList.man;
    filteredList.woman = req.body.woman || filteredList.woman;
    filteredList.under_sixteen_years = req.body.under_sixteen_years || filteredList.under_sixteen_years;
    filteredList.from_sixteen_to_sixty_four_years = req.body.from_sixteen_to_sixty_four_years || filteredList.from_sixteen_to_sixty_four_years;
    filteredList.sixty_five_and_over = req.body.sixty_five_and_over || filteredList.sixty_five_and_over;

    db.update({ $and: [{ territory: String(city) }, { period: parseInt(year) }] }, { $set: body }, {}, function (err, numUpdated) {
      if (err) {
          res.sendStatus(500, "INTERNAL SERVER ERROR");
      } else {
          res.sendStatus(200, "UPDATED");
      }
  });
  }
});
});

//CODIGO PARA ACTUALIZAR MEDIANTE PUT UNA CIUDAD
app.put('/api/v2/evolution-stats/:city', (req, res) => {
  const city = req.params.city;
  const citybody = req.body.territory;
  const body = req.body;
  db.find({},function(err, filteredList){

    if(err){
        res.sendStatus(500, "Client Error");   
    }
  filteredList = filteredList.filter((obj)=>
                {
                    return(obj.territory === city);
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
          res.sendStatus(200, "UPDATED");
      }
  });
  }
});
});
// DELETE de una lista de recursos
/*
app.delete(BASE_API_URL+ "/evolution-stats",(req, res)=>{
  db.remove({}, { multi: true }, (err, numRemoved)=>{
      if (err){
          res.sendStatus(500,"CLIENT ERROR");
          
      }
      res.sendStatus(200,"DELETED");
  });
});*/

//METODO DELETE PARA LA RUTA BASE PARA BORRAR DATO ESPECÍFICO.
app.delete(BASE_API_URL + "/evolution-stats", (req, res) => {
  db.remove({}, {multi : true}, (err, numRemoved) =>{

    if(err){
        res.sendStatus(500, "Client Error");   
    }
  if (!req.body || Object.keys(req.body).length === 0) {
    db.remove({}, {multi : true}, (err, numRemoved)=>{
      if (err){
          res.sendStatus(500,"ERROR EN CLIENTE");
          return;
      } else {
      res.sendStatus(200,"DELETED");
    }
      
  });
  }else{
  const { period, territory } = req.body;
  db.find({},function(err, filteredList){

    if(err){
        res.sendStatus(500, "Client Error");   
    }
  // Buscar el objeto en la matriz evolution_stats
  filteredList = filteredList.filter((obj)=>
                {
                    return(obj.territory === territory && obj.period === period);
                });
  db.remove({territory: territory, period: period}, {}, (err, numRemoved)=>{
    if (err){
        res.sendStatus(500,"ERROR EN CLIENTE");
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
app.delete('/api/v2/evolution-stats/:territory', (req, res) => {
  const territory = req.params.territory;
  db.find({},function(err, filteredList){

    if(err){
        res.sendStatus(500, "Client Error");   
    }
  //const filteredStats = evolution_stats.filter(stats => stats.territory === territory);
  filteredList = filteredList.filter((obj)=>
                {
                    return(obj.territory === territory);
                });
  if (filteredList.length === 0) {
    res.status(404).json(`No se encontraron datos para ${territory}`);
  } else {
    filteredList = filteredList.filter((obj)=>{return(obj.territory === territory);});

    if (filteredList) {
      db.remove({territory: territory}, {multi : true}, (err, numRemoved)=>{
        if (err){
            res.sendStatus(500,"ERROR EN CLIENTE");
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

//DELETE PARA UNA RUTA ESPECÍFICA DE UNA CIUDAD Y PERIOD.
app.delete('/api/v2/evolution-stats/:territory/:period', (req, res) => {
  const territory = req.params.territory;
  const period = req.params.period;
  db.find({},function(err, filteredList){

    if(err){
        res.sendStatus(500, "Client Error");   
    }
  //const filteredStats = evolution_stats.filter(stats => stats.territory === territory);
  filteredList = filteredList.filter((obj)=>
                {
                    return(obj.territory === territory && obj.period === parseInt(period));
                });
  if (filteredList.length === 0) {
    res.status(404).json(`No se encontraron datos para ${territory} y ${period}`);
  } else {
    filteredList = filteredList.filter((obj)=>{return(obj.territory === territory && obj.period === parseInt(period));});
    if (filteredList) {
      db.remove({ $and: [{ territory: territory }, { period: parseInt(period) }] }, {multi : true}, (err, numRemoved)=>{
        if (err){
            res.sendStatus(500,"ERROR EN CLIENTE");
            return;
        }else if (numRemoved === 0) {
          res.sendStatus(404, "ERROR EN CLIENTE: Documentos no encontrados");
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



//HASTA AQUÍ LLEGA MI CÓDIGO.
}

export {loadBackendLMMGV2};