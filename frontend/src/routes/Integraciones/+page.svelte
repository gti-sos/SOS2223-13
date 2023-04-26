<!--<svelte:head>
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
    let API = "https://sos2223-13.ew.r.appspot.com/api/v2/evolution";
    let API2 = "https://sos2223-12.ew.r.appspot.com/api/v2/agroclimatic";
    let grafica = [];
    let grafica2 = [];
   
    let temp_max = [];
    let temp_min = [];
    let temp_med = [];
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
                        
                        temp_max.push(0);
                        temp_min.push(0);
                        temp_med.push(0);
                                       
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
            const res2 = await fetch(API2, {
                method: "GET"
            });
            
            if(res2.ok){
                try{
                    const valores2 = await res2.json();
                    result2 = JSON.stringify(valores2, null, 2);
                    
                    grafica2 = valores2;
                    grafica2.sort((a, b) => (a.province > b.province) ? 1 : ((b.province > a.province) ? -1 : 0));
                    grafica2.sort((a, b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
                    grafica2.forEach(grafica2 =>{
                        console.log(grafica2);
                        
                        temp_max.push(grafica2["maximun_temperature"]);
                        temp_min.push(grafica2["minimun_temperature"]);
                        temp_med.push(grafica2["medium_temperature"]);
                        provincia_año2.push(grafica2.province+"-"+grafica2.year);
                        total_population.push(0);
                        hombres.push(0); 
                        mujeres.push(0); 
                        debajo16.push(0); 
                        entre16y64.push(0); 
                        mayor65.push(0);
                        
                    });
                    
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
        
        Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Estadísticas Agroclimáticas y Evolución',
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
            categories: provincia_año2,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Valor',
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
            name: 'Temperatura Máxima',
            data: temp_max 
        }, {
            name: 'Temperatura Mínima',
            data: temp_min 
        }, {
            name: 'Temperatura Media',
            data: temp_med 
        }, {
            name: 'Población Total',
            data: total_population
        }, {
            name: 'Hombres',
            data: hombres
        }, {
            name: 'Mujeres',
            data: mujeres
        }, {
            name: 'Debajo de 16 años',
            data: debajo16
        }, {
            name: 'Entre 16 y 64 años',
            data: entre16y64
        }, {
            name: 'Mas de 65 años',
            data: mayor65
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
    <h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 45px; text-decoration:underline">Datos Evolución</h1>
    <figure class="highcharts-figure" style="margin-left: 25px; margin-right:25px">
        <div id="container"></div>
        <p class="highcharts-description" style="text-align:center">
            Gráfico de Columnas sobre las Estadísticas Agroclimáticas y Evolución.
        </p>
    </figure>
    <Button outline color="secondary" href="/">Volver</Button>
    <hr style="text-align: right; margin-left: 100px; margin-right: 100px;">


</main>-->