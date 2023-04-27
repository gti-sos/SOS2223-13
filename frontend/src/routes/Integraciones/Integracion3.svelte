<head>
	<!-- Load plotly.js into the DOM -->
	<script src='https://cdn.plot.ly/plotly-2.20.0.min.js'></script>
</head>
<script>
    // @ts-nocheck
    import {onMount} from "svelte";
    import { Button } from "sveltestrap";
    const delay = ms => new Promise(res => setTimeout(res, ms));
    //import { dev } from "$app/environment"; 
    let API = "https://sos2223-13.ew.r.appspot.com/api/v2/evolution";
    let API2;
    let grafica = [];
    let grafica2 = [];
   
    let count = [];
    let provincia_año2 = [];
    let total_population = [];
    let hombres = [];
    let mujeres = [];
    let debajo16 = [];
    let entre16y64 = [];
    let mayor65 = [];
    let result = "";
    let resultStatus = "";
    let result2 = "";
    let resultStatus2 = "";
    onMount(async () =>{
        getGraph()
    });
    async function getGraph(){
        resultStatus = result = "";
            const res = await fetch(API, {
            method: "GET"
                
            });
            if(res.ok){
                try{
                    const valores = await res.json();
                    result = JSON.stringify(valores, null, 2);
                    grafica = valores;
                    grafica.sort((a, b) => (a.territory > b.territory) ? 1 : ((b.territory > a.territory) ? -1 : 0));
                    grafica.sort((a, b) => (a.period > b.period) ? 1 : ((b.period > a.period) ? -1 : 0));
                    grafica.forEach(grafica =>{
                        provincia_año2.push(grafica.territory+"-"+grafica.period);
                        total_population.push(grafica["total_population"]);
                        hombres.push(grafica["man"]); 
                        mujeres.push(grafica["woman"]); 
                        debajo16.push(grafica["under_sixteen_years"]); 
                        entre16y64.push(grafica["from_sixteen_to_sixty_four_years"]); 
                        mayor65.push(grafica["sixty_five_and_over"]); 
                        
                        count.push(0);
                                       
                    });
                    
                }catch(error){
                    console.log(`Error devolviendo la gráfica: ${error}`);
                }
                const status = await res.status;
                resultStatus = status;
            }else{
                console.log("Error al cargar la gráfica"); 
            }
        
        resultStatus2 = result2 = "";
        API2 = 'https://get-population.p.rapidapi.com/population';
const options = {
  method: 'GET',
  headers: {
    'content-type': 'application/octet-stream',
    'X-RapidAPI-Key': '855564e830mshf28ff549a54319bp1c402cjsnf5e497f427c7',
    'X-RapidAPI-Host': 'get-population.p.rapidapi.com'
  }
};
        resultStatus = result = "";
            const res2 = await fetch(API2, options, {
            method: "GET"
                
            });
            if(res2.ok){
                try{
                    const valores2 = await res2.json();
                    console.log(valores2);
                    result2 = JSON.stringify(valores2, null, 2);
                    //console.log(grafica2);
                    grafica2 = valores2;
                    provincia_año2.push("Mundo Tiempo Real");
                    total_population.push(0);
                    hombres.push(0); 
                    mujeres.push(0); 
                    debajo16.push(0); 
                    entre16y64.push(0); 
                    mayor65.push(0);
                    count.push(grafica2.count);
                    
                }catch(error){
                    console.log(`Error devolviendo la gráfica: ${error}`);
                }
                const status2 = await res2.status;
                resultStatus2 = status2;
                
            }else{
                console.log("Error al cargar la gráfica");
            }
            
            await delay(500);
            loadChart();
            
    }
    async function loadChart(){
        var trace_poblacion = {
            x: provincia_año2,
            y: total_population,
            type: 'bar',
            name: 'Población Total'
        };
        var trace_hombres = {
            x: provincia_año2,
            y: hombres,
            type: 'bar',
            name: 'Hombres'
        };
        var trace_mujeres = {
            x: provincia_año2,
            y: mujeres,
            type: 'bar',
            name: 'Mujeres'
        };
        var trace_menor16 = {
            x: provincia_año2,
            y: debajo16,
            type: 'bar',
            name: 'Menor de 16 años'
        };
        var trace_de16a64 = {
            x: provincia_año2,
            y: entre16y64,
            type: 'bar',
            name: 'De 16 a 64 años'
        };
        var trace_partir65 = {
            x: provincia_año2,
            y: mayor65,
            type: 'bar',
            name: 'A partir de 65 años'
        };
        var trace_mundo = {
            x: provincia_año2,
            y: count,
            type: 'bar',
            name: 'Población Mundo'
        };
        var dataPlot = [trace_poblacion, trace_hombres, trace_mujeres,trace_menor16,trace_de16a64,trace_partir65,trace_mundo];
        var layout = { 
  font: {size: 18}
};

       var config = {responsive: true}
        Plotly.newPlot('myDiv', dataPlot, layout,config);
    }
</script>

<main>
    <h2>Gráfica de datos sobre las Provincias y Años de andalucia</h2>
    <h4>Biblioteca: Plotly</h4>
    <div id='myDiv'><!-- Plotly chart will be drawn inside this DIV --></div>
</main>

<style>
    h2{
        text-align: center;
    }
    h4{
        text-align: center;
    }
</style>