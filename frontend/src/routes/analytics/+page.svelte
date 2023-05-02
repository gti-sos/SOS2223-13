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
    let API = "http://sos2223-13.appspot.com//api/v2/evolution";
    let API2 = "http://sos2223-13.appspot.com//api/v2/employment";
    let API3 = "http://sos2223-13.appspot.com//api/v2/localentities";
    let graph = [];
    let graph2 = [];
    let graph3 = [];
    let provincia_año = [];
    let poblaciontotal = [];
    let hombres = [];
    let mujeres = [];
    let menor16 = [];
    let de16a64 = [];
    let partir65 = [];
    let periodo = [];
    let fecha = [];
    let empleadas = [];
    let inactivas = [];
    let noempleadas = [];
    let telefono = [];
    let nombre = [];
    let apellido = [];
    let superficie = [];
    let poblacion = [];
    let gastos = [];
    let beneficios = [];
    let result = "";
    let resultStatus = "";
    let result2 = "";
    let resultStatus2 = "";
    let result3 = "";
    let resultStatus3 = "";
    onMount(async () =>{
        getGraph()
    });
    /*if(dev)
        API = "http://localhost:8080"+API
    */
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
                    graph.sort((a, b) => (a.territory > b.territory) ? 1 : ((b.territory > a.territory) ? -1 : 0));
                    graph.sort((a, b) => (a.period > b.period) ? 1 : ((b.period > a.period) ? -1 : 0));
                    graph.forEach(graph => {
                  provincia_año.push(graph.territory+"-"+graph.period);
                  poblaciontotal.push(graph["total_population"]);
                  hombres.push(graph["man"]);
                  mujeres.push(graph["woman"]);
                  menor16.push(graph["under_sixteen_years"]);
                  de16a64.push(graph["from_sixteen_to_sixty_four_years"]);
                  partir65.push(graph["sixty_five_and_over"]);
                  periodo.push(0); 
                 fecha.push(0); 
                 empleadas.push(0); 
                    inactivas.push(0); 
                    noempleadas.push(0);  
                    telefono.push(0); 
                        nombre.push(0); 
                        apellido.push(0); 
                        superficie.push(0); 
                        poblacion.push(0);
                        gastos.push(0); 
                        beneficios.push(0);            
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
                    graph2 = valores2;
                    graph2.sort((a, b) => (a.region > b.region) ? 1 : ((b.region > a.region) ? -1 : 0));
                    graph2.sort((a, b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
                    graph2.forEach(graph2 =>{
                        provincia_año.push(graph2.region+"-"+graph2.year + "-" + graph2.period+"-"+graph2.date);
                        //periodo.push(graph2["period"]);
                        //fecha.push(graph2["date"]);
                        empleadas.push(graph2["employed_person"]);
                        inactivas.push(graph2["inactive_person"]);
                        noempleadas.push(graph2["unemployed_person"]);
                        poblaciontotal.push(0);
                        hombres.push(0); 
                        mujeres.push(0); 
                        menor16.push(0); 
                        de16a64.push(0); 
                        partir65.push(0);
                        telefono.push(0); 
                        nombre.push(0); 
                        apellido.push(0); 
                        superficie.push(0); 
                        poblacion.push(0);
                        gastos.push(0); 
                        beneficios.push(0);
                        
                    });
                    
                }catch(error){
                    console.log(`Error devolviendo la gráfica: ${error}`);
                }
                const status2 = await res2.status;
                resultStatus2 = status2;
            }else{
                console.log("Error al cargar la gráfica"); 
            }
        resultStatus3 = result3 = "";
            const res3 = await fetch(API3, {
                method: "GET"
            });
            if(res3.ok){
                try{
                    const valores3 = await res3.json();
                    result3 = JSON.stringify(valores3, null, 2);
                    graph3 = valores3;
                    graph3.sort((a, b) => (a.province > b.province) ? 1 : ((b.province > a.province) ? -1 : 0));
                    graph3.sort((a, b) => (a.president_appointment_date > b.president_appointment_date) ? 1 : ((b.president_appointment_date > a.president_appointment_date) ? -1 : 0));
                    graph3.forEach(graph3 =>{
                        provincia_año.push(graph3.province+"-"+graph3.president_appointment_date + "-" +
                        graph3.first_name + "-" + graph3.second_name);
                        telefono.push(graph3["landline"]);
                        //nombre.push(graph3["first_name"]);
                        //apellido.push(graph3["second_name"]);
                        superficie.push(graph3["surface_extension"]);
                        poblacion.push(graph3["population"]);
                        gastos.push(graph3["expense"]);
                        beneficios.push(graph3["income"]);
                        poblaciontotal.push(0);
                        hombres.push(0); 
                        mujeres.push(0); 
                        menor16.push(0); 
                        de16a64.push(0); 
                        partir65.push(0);
                        periodo.push(0); 
                        fecha.push(0); 
                        empleadas.push(0); 
                        inactivas.push(0); 
                        noempleadas.push(0);
                    });
                    
                }catch(error){
                    console.log(`Error devolviendo la gráfica: ${error}`);
                }
                const status3 = await res3.status;
                resultStatus3 = status3;
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
            text: 'Estadísticas Evolution, Empleados y Localidades',
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
            name: 'Población Total',
            data: poblaciontotal 
        }, {
            name: 'Hombres',
            data: hombres 
        }, {
            name: 'Mujeres',
            data: mujeres 
        }, {
            name: 'Menor de 16 años',
            data: menor16
        }, {
            name: 'De 16 a 64 años',
            data: de16a64
        }, {
            name: 'Mayor de 65 años',
            data: partir65
        },{
            name: 'Personas empleadas',
            data: empleadas
        },{
            name: 'Personas inactivas',
            data: inactivas 
        }, {
            name: 'Personas No Empleadas',
            data: noempleadas 
        }, {
            name: 'Teléfono',
            data: telefono 
        },{
            name: 'Superficie',
            data: superficie
        }, {
            name: 'Población',
            data: poblacion
        }, {
            name: 'Gastos',
            data: gastos
        }, {
            name: 'Beneficios',
            data: beneficios
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
            Gráfico de Columnas sobre las Estadísticas Evolución, Personas Empleadas y Localidades de diferentes provincias de Andalucía en diversos años.
        </p>
    </figure>

    <br>
    <div style="text-align:center">
        <Button color="primary" href="/">Volver a Inicio</Button>
    </div>
</main>