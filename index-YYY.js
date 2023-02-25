// ESTE ARCHIVO JS ES DE LUIS MIGUEL MARTÍN GONZÁLEZ
//A CONTINUACIÓN ESTÁ EL CÓDIGO DE UNA APLICACIÓN EN NODEJS QUE REALICE LOS SIGUIENTES ALGORITMOS:

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
// Imprimir el array de datos
//console.log(data);

//Realice un algoritmo usando iteradores (forEach, Map, filter, …) que permita calcular la media de valores de alguna 
//de los campos numéricos del subconjunto de filas que comparten un determinado valor en el campo de información geográfica.

//Este algoritmo me permite calcular la media del total de población del subconjunto de filas donde el valor de territory es Huelva.
const huelvaData = data.filter(row => row[1] === 'Huelva'); // Crea un subconjunto de filas donde el territory sea "Huelva"

const populationArray = huelvaData.map(row => row[2]); // Obtiene el valor de total_population de cada fila y los almacena en un array

const totalPopulation = populationArray.reduce((acc, val) => acc + val, 0); // Suma todos los valores del array

const populationMean = totalPopulation / populationArray.length; // Divide el resultado por la longitud del array para obtener la media

//console.log(populationMean); // Muestra la media en la consola








//CODIGO DE JOSE LOPEZ BERRO 

//Recopilacion de datos en un array 
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

//console.log(media);

