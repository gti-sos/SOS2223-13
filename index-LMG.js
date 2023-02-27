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

console.log(populationMean); // Muestra la media en la consola
