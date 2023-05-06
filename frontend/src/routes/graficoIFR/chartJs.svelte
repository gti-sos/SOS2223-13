<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@3.6.2"></script>
</svelte:head>

<script>
    // @ts-nocheck
    import {onMount} from "svelte";
    const delay = ms => new Promise(res => setTimeout(res, ms));
    import { dev } from "$app/environment"; 
    import { Button } from "sveltestrap";

    let API = "/api/v2/graficoIFR";

    let graph = [];

    let provincia_año = [];
    let superficie = [];
    let poblacion = [];
    let gastos = [];
    let ingresos = [];



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
                    const fil = valores.filter((x) => x.province == "Almeria")
                    result = JSON.stringify(fil, null, 2);
                    graph = fil;
                    graph.forEach(graph =>{
                         console.log(graph);
                        provincia_año.push(graph.province+"-"+graph.president_appointment_date);
                        superficie.push(graph["surface_extension"]);
                        poblacion.push(graph["population"]);
                        gastos.push(graph["expense"]);
                        ingresos.push(graph["income"]);
                        console.log(myChart.data);

                    });
                    await delay(500);
                    loadChart(); 
                }catch(error){
                    console.log(`Error devolviendo la gráfica: ${error}`);
                }
                const status = await res.status;
                resultStatus = status;
            }else{
                console.log("Error al cargar la gráfica");
            }
    }


    async function loadChart() {

        const ctx = document.getElementById('myChart').getContext('2d');
    
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: provincia_año,
                datasets: [{
                    label: 'Superficie',
                    data: superficie,
                    borderColor: '#000',
                    backgroundColor: ['blue'],
                    borderWidth: 3,
                    
                    
                }, {
                    label: 'Población', 
                    data: poblacion,
                    borderColor: '#000',
                    backgroundColor: ['green'],
                    borderWidth: 3,
                    
                }, {
                    label: 'Gastos',
                    data: gastos,
                    borderColor: '#000',
                    backgroundColor: ['yellow'],
                    borderWidth: 3,
                    
                    
                }, {
                    label: 'Ingresos',
                    data: ingresos,
                    borderColor: '#000',
                    backgroundColor: ['purple'],
                    borderWidth: 3,
                    
                    
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend:{
                        position: 'top',
                        labels: {
                            font: {
                                weight: 'bold'
                            }
                        }
                    },
                    title:{
                        text: "Entidades Locales de Almería",
                        display: true,
                        color: 'black',
                        font:{
                            family: 'Times New Roman',
                            size: 40,
                            weight: 'bold',
                        },
                        padding: {
                            bottom: 10
                        }
                    },
                    subtitle: {
                        display: true,
                        text: 'Gráfica con Chart.js',
                        color: 'black',
                        font: {
                            size: 15,
                            family: 'Times New Roman',
                            weight: 'bold',
                        },
                        padding: {
                            bottom: 20
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y.toFixed(2);
                            }
                        }
                    }
                },
                scales: {
                        y: {
                            beginAtZero: true,
                            display: true,
                            title:{
                                display: true,
                                text: "Entidades Locales",
                                font: {
                                    weight: 'bold',
                                }, 
                            },
                            max: 2000000
                        },
                        x: {   
                            display: true,
                            title:{
                                display: true,
                                text: "Años" ,
                                font: {
                                    weight: 'bold',
                                },
                            }
                        }
                },
                layout: {
                    padding: {
                        top: 50, 
                        left: 200,
                        right: 200,
                        
                    }
                },
            }
        });
    }
</script>

<main>
    <canvas id="myChart" style="width: 20vw; height: 20vh;"></canvas>
    <br>
    <div style="text-align:center">
        <Button color="primary" href="/">Volver a Inicio</Button>
    </div>
</main>