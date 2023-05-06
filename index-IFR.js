
//Recopilacion de datos en un array 
var datos = [
  {province:"Almeria" , landline:950351228 , first_name:"ANTONIO MANUEL" , second_name:"ORTIZ" , president_appointment_date: "6/13/2015 0:00:00" , surface_extension: 45.24, population:1342.00, expense: 2224600.00, income: 2224600.00},
  {province:"Almeria" , landline:950350001 , first_name:"ANTONIO" , second_name:"TORRES" , president_appointment_date:"6/13/2015 0:00:00" , surface_extension: 83.68 , population:1279.00, expense: 1602733.00 , income: 1602733.00 },
  {province:"Cordoba" , landline:957166002 , first_name:"MANUELA" , second_name:"BOLLERO" , president_appointment_date:"6/13/2015 0:00:00" , surface_extension: 334.84, population:4317.00, expense: 4227447.74 , income: 4227447.74 },
  {province:"Almeria" , landline:950400400 , first_name:"MANUEL" , second_name:"CORTES" , president_appointment_date:"6/13/2015 0:00:00" , surface_extension: 90.04 , population:24670.00, expense: 19128200.00 , income: 19128200.00 },
  {province:"Granada" , landline:958557379 , first_name:"MARIA DEL PILAR" , second_name:"LOPEZ" , president_appointment_date:"6/13/2015 0:00:00" , surface_extension: 27.00 , population: 310.00, expense: 392000.00 , income: 392000.00},
  {province:"Sevilla" , landline:954816021 , first_name:"ESTRELLA" , second_name:"MONTA?O" , president_appointment_date:"6/13/2015 0:00:00" , surface_extension: 13.69 , population: 2114.00, expense: 2137220.70 , income: 2137220.70 },
  {province:"Cordoba" , landline:957660000 , first_name:"FRANCISCO JUAN" , second_name:"MARTIN" , president_appointment_date:"6/13/2015 0:00:00" , surface_extension: 166.48 , population: 13551.00, expense: 722273.25 , income: 725786.14 },
  {province:"Huelva" , landline:959125710 ,  first_name:"M? CARMEN" , second_name:"OSORNO" , president_appointment_date:"6/13/2015 0:00:00" , surface_extension: 41.46 , population: 813.00, expense: 630073.18 , income: 630073.18 },
  {province:"Malaga" , landline:952710025 ,  first_name:"JUAN LORENZO" , second_name:"PINEDA" , president_appointment_date:"6/13/2015 0:00:00" , surface_extension: 65.11 , population: 5403.00 , expense: 4325250.80 , income: 4325250.80 },
  {province:"Granada" , landline:958392520 , first_name:"TORCUATO" , second_name:"CABRERIZO" , president_appointment_date:"6/13/2015 0:00:00" , surface_extension: 90.71 , population: 637.00 , expense: 779638.23 , income: 779638.23 },
  {province:"Sevilla" , landline:954885004 , first_name:"EVA CRISTINA" , second_name:"RUIZ" , president_appointment_date:"24/ago/2016 12:00:00 AM" , surface_extension: 280.19 , population: 1820.00, expense: 1899419.45 , income: 1899419.45 }

];

//console.log(datos);

//Calculo de la media de personas de Almeria con más de 2.000.000 de ingresos 


const ingresosAlmeria = datos.filter((data) => data.province === 'Almeria' && data.income > 2000000);

const totalPoblacion = ingresosAlmeria.reduce((acc, data) => acc + data.population, 0);

const mediaIngresos = totalPoblacion / ingresosAlmeria.length;

console.log(`Media de personas de Almeria con más de 2 millones de ingresos: ${mediaIngresos}`);
