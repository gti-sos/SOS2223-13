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
    //import { dev } from "$app/environment";
    let graph = [];
    let provincia_año = [];
    let pib_current_price = [];
    let pib_percentage_structure = [];
    let pib_variation_rate = [];
    onMount(async () =>{
        getGraph()
    });
    async function getGraph(){
            const res = await fetch(
                "https://sos2223-21.appspot.com/api/v3/market-prices-stats/"
            );
            if(res.ok){
                    const valores = await res.json();
                    graph = valores;
                    graph.forEach(graph =>{
                        provincia_año.push(graph.province+"-"+graph.year);
                        pib_current_price.push(graph["pib_current_price"]);
                        pib_percentage_structure.push(graph["pib_percentage_structure"]);
                        pib_variation_rate.push(graph["pib_variation_rate"]);
                        
                    });
                    await delay(500);
                    loadChart(); 
            }else{
                console.log("Error al cargar la gráfica");
            }
    }
    async function loadChart(){  
        Highcharts.chart('container', {
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Estadísticas Markets de Jorge Florentino',
            style: {
                fontWeight: 'bold',
                fontFamily: 'Times New Roman',
                fontSize: 40,
            },
        },
        
        subtitle: {
            text: 'Gráfica con HighCharts',
            style:{
                fontFamily: 'Times New Roman',
                fontWeight: 'bold',
                fontSize: 12,
                color: 'black'
            },
        },
        xAxis: {
            title:{
                text: "Provincia-Año",
                style: {
                    fontWeight: 'bold'
                }
            },
            categories: provincia_año,
            crosshair: true
        },
        yAxis: {
            min: 0,
            max: 50000000,
            title: {
                text: 'Datos',
                style: {
                    fontWeight: 'bold'
                }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y: 2f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
            pointPadding: 0.2,
            borderWidth: 2,
            borderColor: "#000"
            }
        },
        series: [{
            name: 'Precio Actual del Pib',
            data: pib_current_price 
        }, {
            name: 'Estructura de porcentaje de Pib',
            data: pib_percentage_structure 
        }, {
            name: 'Ratio de variación del Pib',
            data: pib_variation_rate 
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
    <figure class="highcharts-figure" style="margin-left: 25px; margin-right:25px">
        <div id="container"></div>
        <p class="highcharts-description" style="text-align:center">
            Gráfico de Columnas sobre las Estadísticas Markets de diferentes provincias de Andalucía en diversos años.
        </p>
    </figure>
</main>