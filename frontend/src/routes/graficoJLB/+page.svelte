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
        let advertencia = "";
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
        description: 'Image description: An area chart compares the nuclear stockpiles of the USA and the USSR/Russia between 1945 and 2017. The number of nuclear weapons is plotted on the Y-axis and the years on the X-axis. The chart is interactive, and the year-on-year stockpile levels can be traced for each country. The US has a stockpile of 6 nuclear weapons at the dawn of the nuclear age in 1945. This number has gradually increased to 369 by 1950 when the USSR enters the arms race with 6 weapons. At this point, the US starts to rapidly build its stockpile culminating in 32,040 warheads by 1966 compared to the USSR’s 7,089. From this peak in 1966, the US stockpile gradually decreases as the USSR’s stockpile expands. By 1978 the USSR has closed the nuclear gap at 25,393. The USSR stockpile continues to grow until it reaches a peak of 45,000 in 1986 compared to the US arsenal of 24,401. From 1986, the nuclear stockpiles of both countries start to fall. By 2000, the numbers have fallen to 10,577 and 21,000 for the US and Russia, respectively. The decreases continue until 2017 at which point the US holds 4,018 weapons compared to Russia’s 4,500.'
    },
    title: {
        text: 'US and USSR nuclear stockpiles'
    },
    subtitle: {
        text: 'Source: <a href="https://fas.org/issues/nuclear-weapons/status-world-nuclear-forces/" ' +
            'target="_blank">FAS</a>'
    },
    xAxis: {
        allowDecimals: false,
        labels: {
            formatter: function () {
                return this.value; // clean, unformatted number for year
            }
        },
        accessibility: {
            rangeDescription: 'Range: 1940 to 2017.'
        }
        //categories: region_year,
    },
    yAxis: {
        title: {
            text: 'Nuclear weapon states'
        },
        labels: {
            formatter: function () {
                return this.value / 1000 + 'k';
            }
        }
    },
    tooltip: {
        pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
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
    }
    ]
    });

 }

 onMount(async () =>{
    getData();

 });




</script>



<main>
    <h1>Gráfico</h1>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Demonstrating a basic area chart, also known as a mountain chart.
            Area charts are similar to line charts, but commonly used to visualize
            volumes.
        </p>
    </figure>

    {#if resultStatus != ""}
    <p>
        Result:
    </p>
    <pre>
    {resultStatus}
    {result}
    </pre>
{/if}
</main>



