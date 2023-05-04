<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>



<script>
    //@ts-nocheck
    import {onMount} from 'svelte';
    import { dev } from '$app/environment';
    const delay = ms => new Promise(res => setTimeout(res, ms));
        
    let API = '/api/v2/data';
    
        
    if(dev)
        API = 'http://localhost:8080'+API

        let data = [];
        let employed_person_malaga= [];
        let employed_person_almeria = [];
        let employed_person_granada = [];
        let employed_person_jaen = [];
        let employed_person_cadiz = [];
        let employed_person_sevilla = [];
        let employed_person_huelva = [];
        let employed_person_cordoba = [];
        let result = "";
        let resultStatus = "";


        async function getData(){
            resultStatus = result = "";
            const res = await fetch(API, {
            method: "GET"
            });
            if(res.ok){
                try{
                const dataReceived = await res.json();
                result = JSON.stringify(dataReceived, null, 2);
                data = dataReceived;
                data.forEach(data => {
                    if(data.region === "Almeria"){
                        employed_person_almeria.push(data["employed_person"]);
                    }else if(data.region === "Granada"){
                        employed_person_granada.push(data["employed_person"]);
                    }else if(data.region === "Malaga"){
                        employed_person_malaga.push(data["employed_person"]);
                    }else if(data.region === "Jaen"){
                        employed_person_jaen.push(data["employed_person"]);
                    }else if(data.region === "Cadiz"){
                        employed_person_cadiz.push(data["employed_person"]);
                    }else if(data.region === "Sevilla"){
                        employed_person_sevilla.push(data["employed_person"]);
                    }else if(data.region === "Huelva"){
                        employed_person_huelva.push(data["employed_person"]);
                    }else if(data.region === "Cordoba"){
                        employed_person_cordoba.push(data["employed_person"]);
                    }
                });
                await delay(300);
                loadChart();
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
            }else{
                console.log("Se ha producido un error en los datos");
            }
        }

    async function loadChart(graphData){

        Highcharts.chart('container', {
    chart: {
        type: 'area'
    },
    accessibility: {
        description: 'Image description: comparación de personas empleadas en las distintas provincias de Andalucía entre 2017 y 2020.'
    },
    title: {
        text: 'Situación laboral de los andaluces entre 2017 y 2020.'
    },
    //subtitle: {
    //    text: 'Source: <a href="https://fas.org/issues/nuclear-weapons/status-world-nuclear-forces/" ' +
    //        'target="_blank">FAS</a>'
    //},
    xAxis: {
        allowDecimals: false,
        labels: {
            formatter: function () {
                return this.value; // clean, unformatted number for year
            }
        },
        accessibility: {
            rangeDescription: 'Rango entre 2017 y 2020.'
        }
        //categories: region_year,
    },
    yAxis: {
        title: {
            text: 'Personas'
        },
        labels: {
            formatter: function () {
                return this.value / 1 +'k';
            }
        }
    },
    tooltip: {
        pointFormat: '{series.name} tenía <b>{point.y:,.0f}</b> mil<br/>personas empleadas en {point.x}'
    },
    plotOptions: {
        area: {
            pointStart: 2017,
            marker: {
                enabled: false,
                symbol: 'circle',
                radius: 2,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            }
        }
    },
    series: [{
        name: 'Almeria',
        data: employed_person_almeria
    }, {
        name: 'Granada',
        data: employed_person_granada
    }, {
        name: 'Malaga',
        data: employed_person_malaga
    },{
        name: 'Jaen',
        data: employed_person_jaen
    },
    {
        name: 'Cadiz',
        data: employed_person_cadiz
    },
    {
        name: 'Sevilla',
        data: employed_person_sevilla
    },
    {
        name: 'Huelva',
        data: employed_person_huelva
    },
    {
        name: 'Cordoba',
        data: employed_person_cordoba
    }
    ]
    });

 }

 onMount(async () =>{
    getData();

 });




</script>



<main>
    <h1>Gráfico highcharts</h1>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Gráfico en el que se muestra la tendencia del empleo entre los años 2017 y 2020
            en las provincias de Andalucía.
        </p>
    </figure>

<!--   {#if resultStatus != ""}
    <p>
        Result:
    </p>
    <pre>
    {resultStatus}
    {result}
    </pre>
{/if}-->
</main>



