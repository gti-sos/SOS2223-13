<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@3.6.2"></script>
</svelte:head>
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
   
    let countSpain = [];
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
                        total_population.push(parseInt(grafica["total_population"]));
                        hombres.push(parseInt(grafica["man"])); 
                        mujeres.push(parseInt(grafica["woman"])); 
                        debajo16.push(parseInt(grafica["under_sixteen_years"])); 
                        entre16y64.push(parseInt(grafica["from_sixteen_to_sixty_four_years"])); 
                        mayor65.push(parseInt(grafica["sixty_five_and_over"])); 
                        
                        countSpain.push(0);
                                       
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
        API2 = 'https://country-location-api.p.rapidapi.com/location?country=spain';
        const options = {
  method: 'GET',
  headers: {
    'content-type': 'application/octet-stream',
    'X-RapidAPI-Key': '855564e830mshf28ff549a54319bp1c402cjsnf5e497f427c7',
    'X-RapidAPI-Host': 'country-location-api.p.rapidapi.com'
  }
};
        resultStatus = result = "";
            const res2 = await fetch(API2, options, {
            method: "GET"
                
            });
            if(res2.ok){
                try{
                    const valores2 = await res2.json();
                    //console.log(valores2);
                    result2 = JSON.stringify(valores2, null, 2);
                    //console.log(grafica2);
                    grafica2 = valores2;
                    provincia_año2.push("España - Tiempo Real");
                    total_population.push(0);
                    hombres.push(0); 
                    mujeres.push(0); 
                    debajo16.push(0); 
                    entre16y64.push(0); 
                    mayor65.push(0);
                    countSpain.push(grafica2.location.population);
                    
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
    async function loadChart() {
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: provincia_año2,
                datasets: [{
                    label: 'Población Total',
                    data: total_population,
                    borderColor: '#000',
                    backgroundColor: ['red'],
                    borderWidth: 0.2,
                     
                    
                }, {
                    label: 'Hombres',
                    data: hombres,
                    borderColor: '#000',
                    backgroundColor: ['blue'],
                    borderWidth: 0.2,
                    
                    
                }, {
                    label: 'Mujeres', 
                    data: mujeres,
                    borderColor: '#000',
                    backgroundColor: ['green'],
                    borderWidth: 0.2,
                    
                }, {
                    label: 'Menor 16',
                    data: debajo16,
                    borderColor: '#000',
                    backgroundColor: ['yellow'],
                    borderWidth: 0.2,
                    
                    
                }, {
                    label: 'De 16 a 64', 
                    data: entre16y64,
                    borderColor: '#000',
                    backgroundColor: ['black'],
                    borderWidth: 0.2,
                    
                }, {
                    label: 'Mayor 65', 
                    data: mayor65,
                    borderColor: '#000',
                    backgroundColor: ['Orange'],
                    borderWidth: 0.2,
                    
                },
                {
                    label: 'España', 
                    data: countSpain,
                    borderColor: '#000',
                    backgroundColor: ['Violet'],
                    borderWidth: 0.2,
                    
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
                        text: "Evolution + ApiEspaña de Luis Miguel",
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
                                text: "Personas",
                                font: {
                                    weight: 'bold',
                                }, 
                            },
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