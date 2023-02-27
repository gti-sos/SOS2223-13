// Tener una ruta dinámica “/cool” que muestre una cara ascii tal como se vió en el L05.
var express = require("express");
var cool = require("cool-ascii-faces");

var app = express();
var port = process.env.PORT || 12345;

app.get("/cool", (request,response) => {
    response.send(cool());
    console.log("New request"); //console.log en el servidor    
});

app.listen(port,()=>{
    console.log(`Server ready in port ${port}`);
});

// ruta de /samples/index-LMG.js
app.get("/samples/index-LMG", (request,response) => {
    //a.Inicializa un array con los datos de ejemplo pestaña individual de la ficha de trabajo.
///
const xlsx = require('xlsx');
const workbook = xlsx.readFile('C:\\Users\\Usuario\\OneDrive\\Escritorio\\CURSO 3 2022-2023\\SOS\\PestañaIndividual.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const range = xlsx.utils.decode_range(worksheet['!ref']);

// Inicializar el array para almacenar los datos
const data = [];

// Iterar sobre cada celda en el rango de datos y agregarla al array
for (let row = range.s.r; row <= range.e.r; row++) {
  const rowValues = [];
  for (let col = range.s.c; col <= range.e.c; col++) {
    const cellAddress = xlsx.utils.encode_cell({ r: row, c: col });
    const cellValue = worksheet[cellAddress]?.v;
    rowValues.push(cellValue);
  }
  data.push(rowValues);
}
    const huelvaData = data.filter(row => row[1] === 'Huelva'); // Crea un subconjunto de filas donde el territory sea "Huelva"
    const populationArray = huelvaData.map(row => row[2]); // Obtiene el valor de total_population de cada fila y los almacena en un array
    const totalPopulation = populationArray.reduce((acc, val) => acc + val, 0); // Suma todos los valores del array
    const populationMean = totalPopulation / populationArray.length; // Divide el resultado por la longitud del array para obtener la media
    response.send(`La media de la población total en Huelva es: ${populationMean.toString()}`);
    console.log("New request"); //console.log en el servidor    
});

//ruta de /samples/index-JLB.js
app.get("/samples/index-JLB", (request,response) => {
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
app.get("/samples/index-IFR", (request,response) => {
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