<head>
    <title>My first chart using FusionCharts Suite XT</title>
    <!-- Step 1 - Include the fusioncharts core library -->
    <script type="text/javascript" src="https://cdn.fusioncharts.com/fusioncharts/latest/fusioncharts.js"></script>
    <!-- Step 2 - Include the fusion theme -->
    <script type="text/javascript" src="https://cdn.fusioncharts.com/fusioncharts/latest/themes/fusioncharts.theme.fusion.js"></script>
</head>
<script>
    // @ts-nocheck
    import {onMount} from "svelte";
    const delay = ms => new Promise(res => setTimeout(res, ms));
    import { dev } from "$app/environment"; 
    //import FusionCharts from 'fusioncharts';
    //import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

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

    onMount(async () =>{
      getGraph()
    });

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
                loadChart(); //,3
            }catch(error){
                console.log(`Error devolviendo la gráfica: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
            }else{
              console.log("Ha habido un error cargando los datos");
            }
          
    }
    async function loadChart(){  //,dataIndex
// Importar la biblioteca de FusionCharts aquí
const FusionCharts = await import('fusioncharts');
const Temas = await import('fusioncharts/themes/fusioncharts.theme.fusion');
// Create a JSON object to store the chart configurations
const dataSource = {
  chart: {
    caption: "Evolución Andalucía",
    subcaption: "1980-1982",
    xaxisname: "Provincia-Año",
    yaxisname: "Número de personas",
    formatnumberscale: "10",
    plottooltext:
      "<b>$dataValue</b> personas en <b>$seriesName</b> en $label",
    theme: "fusion",
    drawcrossline: "1"
  },
  categories: [
    {
      category: provincia_period
    }
  ],
  dataset: [
    {
      seriesname: "Total población",
      data: poblaciontotal
    },
    {
      seriesname: "Hombres",
      data: hombres
    },
    {
      seriesname: "Mujeres",
      data: mujeres
    },
    {
      seriesname: "Menor de 16",
      data: menor16
    },
    {
      seriesname: "De 16 a 64",
      data: de16a64
    },
    {
      seriesname: "A partir de 65",
      data: partir65
    }
  ]
};

FusionCharts.ready(function() {
  var myChart = new FusionCharts({
    type: "mscolumn2d",
    renderAt: "chart-container",
    width: "100%",
    height: "1000%",
    dataFormat: "json",
    dataSource
  }).render();
  console.log("CARGA");
});




        
    }
    
</script>

<main>
  <h1>Grafico FusionCharts</h1>
<figure class="FusionCharts-figure">
  <body>
    <div id="chart-container">FusionCharts XT will load here!</div>
    <p class="FusionCharts-description">
      Una gráfica en la que se representa en el eje X las distintas provincias de Andalucía y en el eje y
      números de personas, finalmente los colores representan tanto la característica como el año al que pertenece.
    </p>
    </body>
</figure>
</main>
<!--{#if resultStatus != ""}
    <p>
        Result:
        Numero: {graph.length}
    </p>
    <pre>
    {resultStatus}
    {result}
    </pre>
{/if}
-->
