/*
// Tener una ruta dinámica “/cool” que muestre una cara ascii tal como se vió en el L05.
var express = require("express");
var cool = require("cool-ascii-faces");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 8080;
app.use(bodyParser.json());

*/


module.exports =(app)=>{


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
 
const BASE_API_URL = "/api/v1";

app.post(BASE_API_URL + "/evolution-stats", (request, response) => {
  const territory = request.body.territory;
  const period = request.body.period;
  console.log("New POST to /evolution-stats"); //console.log en el servidor
  // Verificar que la solicitud se hizo en la ruta correcta
  if (request.originalUrl !== '/api/v1/evolution-stats') {
    res.status(405).json('Método no permitido');
    return;
  }else{  

  // Validar que se envíen todos los campos necesarios
  const requiredFields = ['period', 'territory', 'total_population', 'man', 'woman', 'under_sixteen_years', 'from_sixteen_to_sixty_four_years', 'sixty_five_and_over'];
  for (const field of requiredFields) {
    if (!request.body.hasOwnProperty(field)) {
      response.status(400).json(`Missing required field: ${field}`);
      return;
    }
  }

  // Verificar si el recurso ya existe
  const existingObject = evolution_stats.find(obj => obj.territory === territory && obj.period === period);

  if (existingObject) {
    // Si el recurso ya existe, devolver un código de respuesta 409
    response.status(409).json(`El recurso ya existe.`);
  } else {
    // Si el recurso no existe, agregarlo a la lista y devolver un código de respuesta 201
    evolution_stats.push(request.body);
    response.sendStatus(201);
  }
}
});



//APARTADO CREAR 10 O MÁS DATOS RANDOM

app.get(BASE_API_URL + "/evolution-stats/loadInitialData", (req, res) => {
  if (evolution_stats.length === 0) {
    evolution_stats.push(
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
    );
    res.json(evolution_stats)
    //res.json('Se han creado ' + datos_random.length + ' datos');
    console.log("Se han creado datos")
  } else {
    res.json('El arreglo ya contiene datos');
    //res.json(datos_random)
    console.log('El arreglo ya contiene datos')
  }
});

//CODIGO PARA MOSTRAR LAS ESTADÍSTICAS DE TODAS LAS CIUDADES EN UN PERIODO CONCRETO.
app.get('/api/v1/evolution-stats', (req, res) => {
  const from = req.query.from;
  const to = req.query.to;

  // Lógica para buscar todas las ciudades en el período especificado
  if (from && to) {
  const ciudadesEnPeriodo = evolution_stats.filter(ciudad => {
    return ciudad.period >= from && ciudad.period <= to;
  });

  if (from >= to) {
    res.status(400).json("El rango de años especificado es inválido");
  }else{

  res.status(200);
  res.json(ciudadesEnPeriodo);
  console.log(`/GET to /evolution-stats?from=${from}&to=${to}`); //console.log en el servidor
  }
  }else{
    const { period } = req.query;

  if (period) {
    const filteredStats = evolution_stats.filter(stat => stat.period === parseInt(period));
    console.log("New GET to /evolution-stats with period"); //console.log en el servidor  
    res.status(200).json(filteredStats);
  } else {
    console.log("New GET to /evolution-stats"); //console.log en el servidor 
    res.status(200).json(evolution_stats);
  }

  }
});

//MÉTODOS TABLA AZUL.
const rutaBase = '/api/v1/evolution-stats';

// Método POST para la ruta base
app.post(rutaBase, (request, response) => {
  const territory = request.body.territory;
  const period = request.body.period;
  console.log("New POST to /evolution-stats"); //console.log en el servidor  

  // Verificar que la solicitud se hizo en la ruta correcta
  if (request.originalUrl !== '/api/v1/evolution-stats') {
    res.status(405).json('Método no permitido');
    return;
  }else{
  // Validar que se envíen todos los campos necesarios
  const requiredFields = ['period', 'territory', 'total_population', 'man', 'woman', 'under_sixteen_years', 'from_sixteen_to_sixty_four_years', 'sixty_five_and_over'];
  for (const field of requiredFields) {
    if (!request.body.hasOwnProperty(field)) {
      response.status(400).json(`Missing required field: ${field}`);
      return;
    }
  }

  // Verificar si el recurso ya existe
  const existingObject = evolution_stats.find(obj => obj.territory === territory && obj.period === period);

  if (existingObject) {
    // Si el recurso ya existe, devolver un código de respuesta 409
    response.status(409).json(`El recurso ya existe.`);
  } else {
    // Si el recurso no existe, agregarlo a la lista y devolver un código de respuesta 201
    evolution_stats.push(request.body);
    response.sendStatus(201);
  }
}
});

// Método PUT para la ruta base
app.put(rutaBase, (req, res) => {
  res.status(405).json('El método PUT no está permitido en esta ruta');
});


// Ruta específica que no permite el método POST
const rutaEspecifica = '/api/v1/evolution-stats/loadInitialData';
app.post(rutaEspecifica, (req, res) => {
  res.status(405).json('El método POST no está permitido en esta ruta');
});

// Ruta Específica Método GET
app.get(rutaEspecifica, (req, res) => {
  res.json(datos_random);
  res.status(200);
});

// Ruta Específica Método PUT
app.put(rutaEspecifica, (req, res) => {
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
});

//Método DELETE de la ruta específica.
app.delete(rutaEspecifica, (req, res) => {
  datos_random = [];
  res.status(200).json('Los datos se han borrado correctamente');
});


//CODIGO PARA PODER HACER GET A UNA CIUDAD ESPECÍFICA Y A UNA CIUDAD Y PERIODO CONCRETO.
app.get('/api/v1/evolution-stats/:city', (req, res) => {
  const city = req.params.city.toLowerCase();
  const from = req.query.from;
  const to = req.query.to;

  if (from && to) {
    // Lógica para devolver los datos de la ciudad para el periodo especificado
    const filteredStats = evolution_stats.filter(
      stat => stat.territory.toLowerCase() === city &&
      stat.period >= from && stat.period <= to
    );
    res.json(filteredStats);
    console.log(`/GET to /evolution-stats/${city}?from=${from}&to=${to}`); //console.log en el servidor
    res.status(200);
  } else {
    // Lógica para devolver los datos de la ciudad
    const filteredStats = evolution_stats.filter(stat => stat.territory.toLowerCase() === city);
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
app.get('/api/v1/evolution-stats/:territory/:year', (req, res) => {
  const { territory, year } = req.params;
  
  // Buscamos las estadísticas para el territorio y el año indicados
  const stats = evolution_stats.find(
    s => s.territory.toLowerCase() === territory.toLowerCase() && s.period === parseInt(year)
  );
  
  if (stats) {
    res.status(200).json(stats);
  } else {
    res.status(404).json('La ruta solicitada no existe');
  }
  console.log("Solicitud /GET")
});

//CODIGO PARA ACTUALIZAR MEDIANTE PUT UNA RUTA CONCRETA.
app.put('/api/v1/evolution-stats/:city/:year', (req, res) => {
  const city = req.params.city;
  const year = parseInt(req.params.year);
  const citybody = req.body.territory;
  const yearbody = req.body.period;
  
  const stat = evolution_stats.find(s => s.territory === city && s.period === year);
  
  if (!stat || city!==citybody || year!==yearbody) {
    return res.status(400).json('Estadística errónea');
  }else{
    stat.total_population = req.body.total_population || stat.total_population;
  stat.man = req.body.man || stat.man;
  stat.woman = req.body.woman || stat.woman;
  stat.under_sixteen_years = req.body.under_sixteen_years || stat.under_sixteen_years;
  stat.from_sixteen_to_sixty_four_years = req.body.from_sixteen_to_sixty_four_years || stat.from_sixteen_to_sixty_four_years;
  stat.sixty_five_and_over = req.body.sixty_five_and_over || stat.sixty_five_and_over;

  res.json('Estadística actualizada correctamente');
  console.log("Estadística encontrada");
  }
});

//CODIGO PARA ACTUALIZAR MEDIANTE PUT UNA CIUDAD
app.put('/api/v1/evolution-stats/:city', (req, res) => {
  const city = req.params.city;
  const citybody = req.body.territory;

  const statsToUpdate = evolution_stats.filter(s => s.territory === city);
  
  if (statsToUpdate.length === 0 || city !== citybody) {
    return res.status(400).json('Estadística errónea');
  } else {
    for (let i = 0; i < statsToUpdate.length; i++) {
      const stat = statsToUpdate[i];
      stat.period = req.body.period || stat.period;
      stat.total_population = req.body.total_population || stat.total_population;
      stat.man = req.body.man || stat.man;
      stat.woman = req.body.woman || stat.woman;
      stat.under_sixteen_years = req.body.under_sixteen_years || stat.under_sixteen_years;
      stat.from_sixteen_to_sixty_four_years = req.body.from_sixteen_to_sixty_four_years || stat.from_sixteen_to_sixty_four_years;
      stat.sixty_five_and_over = req.body.sixty_five_and_over || stat.sixty_five_and_over;
    }

    res.json('Estadísticas actualizadas correctamente');
    console.log("Estadísticas encontradas");
  }
});

//METODO DELETE PARA LA RUTA BASE PARA BORRAR DATO ESPECÍFICO.
app.delete(BASE_API_URL + "/evolution-stats", (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    evolution_stats = [];
    res.status(200).json('Los datos se han borrado correctamente');
  }else{
  const { period, territory } = req.body;

  // Buscar el objeto en la matriz evolution_stats
  const objectIndex = evolution_stats.findIndex(obj => obj.period === period && obj.territory === territory);

  if (objectIndex === -1) {
    // Si el objeto no se encuentra, devolver un código de respuesta 404 Not Found
    res.status(404).json('El objeto no existe');
  } else {
    // Si se encuentra el objeto, eliminarlo de la matriz y devolver un código de respuesta 200 OK
    evolution_stats.splice(objectIndex, 1);
    res.sendStatus(200);
  }
}
});

//DELETE PARA UNA RUTA ESPECÍFICA DE UNA CIUDAD.
app.delete('/api/v1/evolution-stats/:territory', (req, res) => {
  const territory = req.params.territory;
  const filteredStats = evolution_stats.filter(stats => stats.territory === territory);
  
  if (filteredStats.length === 0) {
    res.status(404).json(`No se encontraron datos para ${territory}`);
  } else {
    const newData = evolution_stats.filter(stats => stats.territory !== territory);
    const deleted = newData.length !== evolution_stats.length;
    evolution_stats = newData;

    if (deleted) {
      res.status(204).json(`Se ha borrado ${territory}`);
      console.log("Datos borrados");
    } else {
      res.status(404).json(`No se encontraron datos que coincidan con los criterios de eliminación para ${territory}`);
    }
  }
});

//HASTA AQUÍ LLEGA MI CÓDIGO.
var cool = require("cool-ascii-faces");
app.get("/cool", (request,response) => {
    response.send(cool());
    console.log("New request"); //console.log en el servidor    
});

// ruta de /samples/index-LMG.js
app.get("/samples/LMG", (request,response) => {
    //a.Inicializa un array con los datos de ejemplo pestaña individual de la ficha de trabajo.
///
var data = [
  [
    'period',
    'territory',
    'total_population',
    'man',
    'woman',
    'under_sixteen_years',
    'from_sixteen_to_sixty_four_years',
    'sixty_five_and_over'
  ],
  [
    1980,   'Almería',
    407049, 200870,
    206179, 126573,
    237986, 42490
  ],
  [
    1980,   'Cádiz',
    978033, 486193,
    491840, 336323,
    564655, 77056
  ],
  [
    1980,   'Córdoba',
    723500, 353491,
    370009, 211329,
    429267, 82904
  ],
  [
    1980,   'Granada',
    757908, 372127,
    385781, 228777,
    448458, 80673
  ],
  [
    1980,   'Huelva',
    416795, 205034,
    211762, 124960,
    242563, 49272
  ],
  [
    1980,   'Jaén',
    642418, 316540,
    325878, 189355,
    378264, 74800
  ],
  [
    1980,    'Málaga',
    1005166, 495474,
    509692,  314321,
    595677,  95169
  ],
  [
    1980,    'Sevilla',
    1466006, 718237,
    747768,  473646,
    856207,  136152
  ],
  [
    1981,   'Almería',
    410149, 202522,
    207628, 126054,
    240718, 43378
  ],
  [
    1981,   'Cádiz',
    986913, 490709,
    496204, 333916,
    574163, 78834
  ],
  [
    1981,   'Córdoba',
    721446, 352398,
    369048, 206851,
    430649, 83947
  ],
  [
    1981,   'Granada',
    758607, 372517,
    386089, 224458,
    452025, 82123
  ],
  [
    1981,   'Huelva',
    418120, 205932,
    212188, 124519,
    243760, 49842
  ],
  [
    1981,   'Jaén',
    640103, 315247,
    324855, 185723,
    378964, 75415
  ],
  [
    1981,    'Málaga',
    1022386, 503948,
    518438,  314563,
    609016,  98807
  ],
  [
    1981,    'Sevilla',
    1476330, 723670,
    752659,  469193,
    867787,  139349
  ],
  [
    1982,   'Almería',
    415261, 205152,
    210109, 126010,
    245476, 43776
  ],
  [
    1982,   'Cádiz',
    999385, 497050,
    502335, 333241,
    586146, 79998
  ],
  [
    1982,   'Córdoba',
    725044, 354301,
    370743, 203305,
    436913, 84825
  ],
  [
    1982,   'Granada',
    762941, 374615,
    388327, 220528,
    459429, 82985
  ],
  [
    1982,   'Huelva',
    421660, 207739,
    213921, 124533,
    247075, 50051
  ],
  [
    1982,   'Jaén',
    640864, 315913,
    324951, 181619,
    383614, 75631
  ],
  [
    1982,    'Málaga',
    1038489, 511716,
    526773,  314007,
    623660,  100822
  ],
  [
    1982,    'Sevilla',
    1494347, 732722,
    761624,  468201,
    884345,  141800
  ]
]
    const huelvaData = data.filter(row => row[1] === 'Huelva'); // Crea un subconjunto de filas donde el territory sea "Huelva"
    const populationArray = huelvaData.map(row => row[2]); // Obtiene el valor de total_population de cada fila y los almacena en un array
    const totalPopulation = populationArray.reduce((acc, val) => acc + val, 0); // Suma todos los valores del array
    const populationMean = totalPopulation / populationArray.length; // Divide el resultado por la longitud del array para obtener la media
    response.send(`La media de la población total en Huelva es: ${populationMean.toString()}`);
    console.log("New request"); //console.log en el servidor    
});

// Manejador de errores
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
      if (req.method === 'POST' && req.originalUrl !== '/api/v1/evolution-stats') {
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


}

/*
//EXPORTACION
// api.js
module.exports = {
    express,
    cool,
    bodyParser,
    app,
    port,
    evolution_stats,
    BASE_API_URL,
    datos_random,
    rutaBase
};
*/