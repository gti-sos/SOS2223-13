// Tener una ruta dinámica “/cool” que muestre una cara ascii tal como se vió en el L05.
var express = require("express");
var cool = require("cool-ascii-faces");

var app = express();
var port = process.env.PORT || 8080;
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

app.get(BASE_API_URL + "/evolution_stats", (request,response) => {
  response.json(evolution_stats);
  console.log("New GET to /evolution_stats"); //console.log en el servidor    
});

app.post(BASE_API_URL + "/evolution_stats", (request,response) => {
  var newEvolution = request.body;
  console.log(`newEvolution = <${newEvolution}>`);
  console.log("New POST to /evolution_stats"); //console.log en el servidor    
});

//APARTADO CREAR 10 O MÁS DATOS RANDOM

var datos_random = []

app.get(BASE_API_URL + "/evolution_stats/loadInitialData", (req, res) => {
  if (datos_random.length === 0) {
    for (let i = 0; i < 10; i++) {
      data.push({
        period: 1980 + i,
        territory: 'Territorio ' + i,
        total_population: Math.floor(Math.random() * 1000000),
        man: Math.floor(Math.random() * 500000),
        woman: Math.floor(Math.random() * 500000),
        under_sixteen_years: Math.floor(Math.random() * 500000),
        from_sixteen_to_sixty_four_years: Math.floor(Math.random() * 500000),
        sixty_five_and_over: Math.floor(Math.random() * 500000)
      });
    }
    res.send('Se han creado ' + data.length + ' datos');
  } else {
    res.send('El arreglo ya contiene datos');
  }
});

//HASTA AQUÍ LLEGA MI CÓDIGO.

app.get("/cool", (request,response) => {
    response.send(cool());
    console.log("New request"); //console.log en el servidor    
});

app.listen(port,()=>{
    console.log(`Server ready in port ${port}`);
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
        {province:"Almeria" , landline:950351228 , first_name:"ANTONIO MANUEL" , second_name:"ORTIZ" , president_appointment_date: "6/13/2015 0:00:00" , surface_extension: 45.24, population:1342.00, expense: 2224600.00, income: 2224600.00},
        {province:"Almeria" , landline:950350001 , first_name:"ANTONIO" , second_name:"TORRES" , president_appointment_date:"6/13/2015 0:00:00" , surface_extension: 83.68 , population:1279.00, expense: 1602733.00 , income: 1602733.00 },
        {province:"Cordoba" , landline:957166002 , first_name:"MANUELA" , second_name:"BOLLERO" , president_appointment_date:"6/13/2015 0:00:00" , surface_extension: 334.84, population:4317.00, expense: 4227447.74 , income: 4227447.74 },
        {province:"Almeria" , landline:950400400 , first_name:"MANUEL" , second_name:"CORTES" , president_appointment_date:"6/13/2015 0:00:00" , surface_extension: 90.04 , population:24670.00, expense: 19128200.00 , income: 19128200.00 },
        {province:"Granada" , landline:958557379 , first_name:"MARIA DEL PILAR" , second_name:"LOPEZ" , president_appointment_date:"6/13/2015 0:00:00" , surface_extension: 27.00 , population: 310.00, expense: 392000.00 , income: 392000.00},
        {province:"Sevilla" , landline:954816021 , first_name:"ESTRELLA" , second_name:"MONTA?O" , president_appointment_date:"6/13/2015 0:00:00" , surface_extension: 13.69 , population: 2114.00, expense: 2137220.70 , income: 2137220.70 },
        {province:"Cordoba" , landline:957660000 , first_name:"FRANCISCO JUAN" , second_name:"MARTIN" , president_appointment_date:"6/13/2015 0:00:00" , surface_extension: 166.48 , population: 13551.00, expense: 7222732.25 , income: 7257861.14 },
        {province:"Huelva" , landline:959125710 , first_name:"M? CARMEN" , second_name:"OSORNO" , president_appointment_date:"6/13/2015 0:00:00" , surface_extension: 41.46 , population: 813.00, expense: 630073.18 , income: 630073.18 },
        {province:"Malaga" , landline:952710025 , first_name:"JUAN LORENZO" , second_name:"PINEDA" , president_appointment_date:"6/13/2015 0:00:00" , surface_extension: 65.11 , population: 5403.00 , expense: 4325250.80 , income: 4325250.80 },
        {province:"Granada" , landline:958392520 , first_name:"TORCUATO" , second_name:"CABRERIZO" , president_appointment_date:"6/13/2015 0:00:00" , surface_extension: 90.71 , population: 637.00 , expense: 779638.23 , income: 779638.23 },
        {province:"Sevilla" , landline:954885004 , first_name:"EVA CRISTINA" , second_name:"RUIZ" , president_appointment_date:"24/ago/2016 12:00:00 AM" , surface_extension: 280.19 , population: 1820.00, expense: 1899419.45 , income: 1899419.45 }
      
      ];
      
      //console.log(datos);
      
      //Calculo de la media de personas de Almeria con más de 2.000.000 de ingresos 
      
      
      const ingresosAlmeria = datos.filter((data) => data.province === 'Almeria' && data.income > 2000000);
      
      const totalPoblacion = ingresosAlmeria.reduce((acc, data) => acc + data.population, 0);
      
      const mediaIngresos = totalPoblacion / ingresosAlmeria.length;
      
    response.send(`Media de personas de Almeria con más de 2 millones de ingresos: ${mediaIngresos}`);
    console.log("New request"); //console.log en el servidor    
});