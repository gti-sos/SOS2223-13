<hr style="text-align: right; margin-left: 100px; margin-right: 100px;">
<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@3.6.2"></script>
</svelte:head>

<script>
    //@ts-nocheck
    import { Table } from "sveltestrap";
    import { onMount } from "svelte";
    const delay = ms => new Promise(res => setTimeout(res, ms));
    
    let API2 = "https://sos2223-13.ew.r.appspot.com/api/v2/localentities";


    let graph = [];
    let result = "";
    let resultStatus = "";


    let provincia_año = [];
    let resu = [];

    let superficie = [];
    let poblacion = [];
    let gastos = [];
    let ingresos = [];



    let graph2 = [];
    let result2 = "";
    let resultStatus2 = "";



    onMount(async () => {
        getGraph();
    });

    const url = 'https://marktdaten-deutschland.p.rapidapi.com/marketdata?zip=69256';
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '14bb23eb3dmshaaee84a74703686p1964ddjsn6905a0bff0f4',
		'X-RapidAPI-Host': 'marktdaten-deutschland.p.rapidapi.com'
	}
    };
   
    async function getGraph(){
            resultStatus = result = "";
            const res = await fetch(url, options)

        if(res.ok){   
            try{
                const dat = await res.json();
                result = JSON.stringify(dat, null, 2);
                graph = dat.data;
                graph.forEach(element =>{
                    provincia_año.push(element['localcell'] + '-'+element['unit']);
                    resu.push(element["marketprice"])

                    superficie.push(0);
                    poblacion.push(0); 
                    gastos.push(0); 
                    ingresos.push(0);

                }); 
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
        }else{
            console.log("Error al devolver la gráfica");
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
                    graph2.sort((a, b) => (a.president_appointment_date > b.president_appointment_date) ? 1 : ((b.president_appointment_date > a.president_appointment_date) ? -1 : 0));
                    graph2.forEach(graph2 =>{
                        console.log(graph2);
                        
                        superficie.push(graph2["surface_extension"]);
                        poblacion.push(graph2["population"]);
                        gastos.push(graph2["expense"]);
                        ingresos.push(graph2["income"]);
                        provincia_año.push(graph2.province + "-" + graph2.president_appointment_date + "-" + graph2.first_name + "-" + graph2.second_name);                        
                        resu.push(0);
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
            loadChartMAS();
    }
    async function loadChartMAS() {
    const ctx = document.getElementById('myChart3').getContext('2d');
    const myChart3 = new Chart(ctx, {
        type: 'scatter',
        data: {
            labels: provincia_año,
            datasets: [{
                label: 'Superficie',
                data: superficie,
                backgroundColor: 'orange',
                pointRadius: 4,
            }, {
                label: 'Población', 
                data: poblacion,
                backgroundColor: 'green',
                pointRadius: 4,
            }, {
                label: 'Gastos',
                data: gastos,
                backgroundColor: 'pink',
                pointRadius: 4,
            }, {
                label: 'Ingresos',
                data: ingresos,
                backgroundColor: 'blue',
                pointRadius: 4,
            },
            {
                label: 'Precio',
                data: resu,
                backgroundColor: 'black',
                pointRadius: 4,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            weight: 'bold'
                        }
                    }
                },
                title: {
                    text: "Estadísticas Entidades Locales y Mercado Alemania.",
                    display: true,
                    color: 'black',
                    font: {
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
                x: {
                    type: 'category',
                    display: true,
                    title: {
                        display: true,
                        text: "Región-Unidad | Provincia-Año",
                        font: {
                            weight: 'bold',
                        },
                    }
                },
                y: {
                    beginAtZero: true,
                    display: true,
                    title: {
                        display: true,
                        text: "Valor",
                        font: {
                            weight: 'bold',
                        }, 
                    },
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
    <h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 45px; text-decoration:underline;">Datos: Entidades Locales</h1>
    <br>
    <div style="text-align:center;">
        <strong >Número de datos: {graph.length+graph2.length}</strong>
    </div>
    
    <canvas id="myChart3" style="width: 20vw; height: 20vh;"></canvas>
    <p style="text-align:center">
        Estadísticas Entidades Locales y Mercado Alemania.
    </p>
    <br>
</main>