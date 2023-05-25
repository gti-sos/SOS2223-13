
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
    let API = "https://sos2223-13.appspot.com/api/v2/localentities";
    let API2 = "https://sos2223-23.appspot.com/hire";

    let graph = [];
    let graph2 = [];


    let cont_indef = [];
    let cont_unico_constr = [];
    let cont_mult_constr = [];
    let cont_unico_event = [];
    let cont_mult_event = [];





    let provincia_año = [];
    let superficie = [];
    let poblacion = [];
    let gastos = [];
    let ingresos = [];

    let result = "";
    let resultStatus = "";

    let result2 = "";
    let resultStatus2 = "";

    onMount(async () =>{
        getGraph()
    });


    async function getGraph() {
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "GET",
        });

        if (res.ok) {
            try {
                const valores = await res.json();
                result = JSON.stringify(valores, null, 2);
                graph = valores;
                graph.sort((a, b) => (a.province > b.province) ? 1 : ((b.province > a.province) ? -1 : 0));
                graph.sort((a, b) => (a.president_appointment_date > b.president_appointment_date) ? 1 : ((b.president_appointment_date > a.president_appointment_date) ? -1 : 0));
                graph.forEach((graph) => {
                    console.log(graph);
                    provincia_año.push(graph.province + "-" + graph.president_appointment_date + "-" + graph.first_name + "-" + graph.second_name
                    );
                    superficie.push(graph["surface_extension"]);
                    poblacion.push(graph["population"]);
                    gastos.push(graph["expense"]);
                    ingresos.push(graph["income"]);


                    cont_indef.push(0);
                    cont_unico_constr.push(0);
                    cont_mult_constr.push(0);
                    cont_unico_event.push(0);
                    cont_mult_event.push(0);


                });
                await delay(500);
                loadChart();
            } catch (error) {
                console.log(`Error devolviendo la gráfica: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
        } else {
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
                    graph2.sort((a, b) => (a.province > b.province) ? 1 : ((b.province > a.province) ? -1 : 0));
                    graph2.sort((a, b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
                    graph2.forEach(graph2 =>{
                        cont_indef.push(graph2["indefinite_contract"]);
                        cont_unico_constr.push(graph2["single_construction_contract"]);
                        cont_mult_constr.push(graph2["multiple_construction_contract"]);
                        cont_unico_event.push(graph2["single_eventual_contract"]);
                        cont_mult_event.push(graph2["multiple_eventual_contract"]);

                        provincia_año.push(graph2.province+"-"+graph2.year+"-"+graph2.gender);

                        superficie.push(0);
                        poblacion.push(0); 
                        gastos.push(0); 
                        ingresos.push(0);
                        
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
        
        Highcharts.chart('container2', {
        chart: {
            type: 'areaspline'
            
        },
        title: {
            text: 'Estadísticas Contratos y Entidades Locales',
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
                text: 'Personas',
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
            name: 'Contratos Indefinidos',
            data: cont_indef 
        }, {
            name: 'Contratos únicos de construcción',
            data: cont_unico_constr 
        }, {
            name: 'Contratos Múltiples de Construcción',
            data: cont_mult_constr 
        }, {
            name: 'Contratos Únicos Eventuales',
            data: cont_unico_event
        },{
            name: 'Contratos Múltiples Eventuales',
            data: cont_mult_event
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
            name: 'Ingresos',
            data: ingresos
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
    <h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 45px; text-decoration:underline">Datos Entidades Locales</h1>
    <figure class="highcharts-figure" style="margin-left: 25px; margin-right:25px">
        <div id="container2"></div>
        <p class="highcharts-description" style="text-align:center">
            Gráfico de Área sobre las Personas Contratadas y las Entidades Locales de Andalucía.
        </p>
    </figure>
    <Button outline color="secondary" href="/">Volver</Button>
    <hr style="text-align: right; margin-left: 100px; margin-right: 100px;">
</main>

