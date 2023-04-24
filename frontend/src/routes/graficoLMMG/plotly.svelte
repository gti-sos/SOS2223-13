<script>
    // @ts-nocheck
    import {onMount} from "svelte";
    const delay = ms => new Promise(res => setTimeout(res, ms));
    import { dev } from "$app/environment";
    let API = "/api/v2/graficoLMMG";
    let graph = [];
    let provincia_period = [];
    let poblaciontotal = [];
    let hombres = [];
    let mujeres = [];
    let menor16 = [];
    let de16a64 = [];
    let partir65 = [];
    let result = "";
    let resultStatus = ""; 


    if(dev) 
       API = "http://localhost:8080"+API
    async function getGraph(){
            resultStatus = result = "";
            const res = await fetch(API, {
                method: "GET"
            });
            if(res.ok){
              try{
                const valores = await res.json();
                result = JSON.stringify(valores, null, 2);
                graph = valores;
                graph.forEach(graph => {
                  provincia_period.push(graph.territory+"-"+graph.period);
                  poblaciontotal.push(graph["total_population"]);
                  hombres.push(graph["man"]);
                  mujeres.push(graph["woman"]);
                  menor16.push(graph["under_sixteen_years"]);
                  de16a64.push(graph["from_sixteen_to_sixty_four_years"]);
                  partir65.push(graph["sixty_five_and_over"]);                  
            });
                await delay(500);
                loadChart();
            }catch(error){
                console.log(`Error devolviendo la gráfica: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
            }else{
              console.log("Ha habido un error cargando los datos");
            }
          
    }

    async function loadChart(){
        var trace_poblacion = {
            x: provincia_period,
            y: poblaciontotal,
            type: 'bar',
            name: 'Población Total'
        };
        var trace_hombres = {
            x: provincia_period,
            y: hombres,
            type: 'bar',
            name: 'Hombres'
        };
        var trace_mujeres = {
            x: provincia_period,
            y: mujeres,
            type: 'bar',
            name: 'Mujeres'
        };
        var trace_menor16 = {
            x: provincia_period,
            y: menor16,
            type: 'bar',
            name: 'Menor de 16 años'
        };
        var trace_de16a64 = {
            x: provincia_period,
            y: de16a64,
            type: 'bar',
            name: 'De 16 a 64 años'
        };
        var trace_partir65 = {
            x: provincia_period,
            y: partir65,
            type: 'bar',
            name: 'A partir de 65 años'
        };
        var dataPlot = [trace_poblacion, trace_hombres, trace_mujeres,trace_menor16,trace_de16a64,trace_partir65];
        Plotly.newPlot('myDiv', dataPlot);
    }
    onMount(getGraph);
    
</script>

<svelte:head>
    <script src='https://cdn.plot.ly/plotly-2.11.1.min.js'></script>
</svelte:head>

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