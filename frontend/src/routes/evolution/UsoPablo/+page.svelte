<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<script>
    // @ts-nocheck
    import {onMount} from "svelte";
    import { Button } from "sveltestrap";
    const delay = ms => new Promise(res => setTimeout(res, ms));
    //import { dev } from "$app/environment";
    let graph = [];
    let provincia_año = [];
    let municipality_size_lt_ft = [];
    let municipality_size_bt_ft_tht = [];
    let municipality_size_gt_tht = [];
    let capital_size = [];
    onMount(async () =>{
        getGraph()
    });
    async function getGraph(){
        const res1 = await fetch(
            "https://sos2223-23.appspot.com/api/v2/density-population/loadinitialdata"
        );
        if (res1.ok) {
            console.log("Fetching Pablo....");
            const res = await fetch(
                "https://sos2223-23.appspot.com/api/v2/density-population/"
            );
            if(res.ok){
                    const valores = await res.json();
                    graph = valores;
                    graph.forEach(graph =>{
                        provincia_año.push(graph.province+"-"+graph.year+"-"+graph.gender);
                        municipality_size_lt_ft.push(graph["municipality_size_lt_ft"]);
                        municipality_size_bt_ft_tht.push(graph["municipality_size_bt_ft_tht"]);
                        municipality_size_gt_tht.push(graph["municipality_size_gt_tht"]);
                        capital_size.push(graph["capital_size"]);
                        
                    });
                    await delay(500);
                    loadChart(); 
            }else{
                console.log("Error al cargar la gráfica");
            }
        }
    }
    async function loadChart(){  
        Highcharts.chart('container3', {
        chart: {
            type: 'scatter'
        },
        title: {
            text: 'Estadísticas Municipales de Pablo',
            style: {
                fontWeight: 'bold',
                fontFamily: 'Times New Roman',
                fontSize: 40,
            },
        },
        
        subtitle: {
            text: 'Gráfica con HighCharts de Luis Miguel',
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
            max: 100,
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
            name: 'Municipality size < 5,000',
            data: municipality_size_lt_ft 
        }, {
            name: 'Municipality size 5,000-50,000',
            data: municipality_size_bt_ft_tht 
        }, {
            name: 'Municipality size > 50,000',
            data: municipality_size_gt_tht 
        }, {
            name: 'Capital size',
            data: capital_size 
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
        <div id="container3"></div>
        <p class="highcharts-description" style="text-align:center">
            Gráfico sobre las Estadísticas Municipales de diferentes provincias de Andalucía en diversos años.
        </p>
    </figure>
    <Button outline color="secondary" href="/integrations">Volver</Button>
</main>