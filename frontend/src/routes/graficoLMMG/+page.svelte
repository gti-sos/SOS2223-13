<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>


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
Highcharts.chart('container', {
  chart: {
    type: 'column'
  },
  title: {
    text: 'Más población'
  },
  subtitle: {
    text: 'Biblioteca: Highcharts'
  },
  xAxis: {
    title: {
                    text: "Provincia-Año",
                },
    categories: provincia_period,
    crosshair: true
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Personas'
    }
  },
  tooltip: {
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y:.1f} millones</b></td></tr>',
    footerFormat: '</table>',
    shared: true,
    useHTML: true
  },
  plotOptions: {
    column: {
      pointPadding: 0.2,
      borderWidth: 0
    }
  },
  series: [{
    name: 'Población Total',
    data: poblaciontotal

  }, {
    name: 'Hombres',
    data: hombres

  }, {
    name: 'Mujeres',
    data: mujeres

  },{
    name: ' Menor de 16 años',
    data: menor16

  }, {
    name: 'De 16 a 64 años',
    data: de16a64

  }, {
    name: 'A partir de 65 años',
    data: partir65

  }],
  responsive: {
                rules: [{
                    condition: {
                        maxWidth: 1000
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
});




        
    }
    
</script>

<main>
  <h1>Grafico</h1>
<figure class="highcharts-figure">
  <div id="container"></div>
  <p class="highcharts-description">
    Una gráfica en la que se representa en el eje X las distintas provincias de Andalucía y en el eje y
    números de personas, finalmente los colores representan tanto la característica como el año al que pertenece.
  </p>
</figure>

{#if resultStatus != ""}
    <p>
        Result:
        Numero: {graph.length}
    </p>
    <pre>
    {resultStatus}
    {result}
    </pre>
{/if}
</main>