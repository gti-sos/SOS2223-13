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
        
    let deportes = [];
    let directo = [];
    //let partidos = [];
    
    const APIExt = "https://sofasport.p.rapidapi.com/v1/sports/number-live";
    const options = {
        method: 'GET',
        headers: {
             'X-RapidAPI-Key': 'a9593ce2e3msh1dbc9c19a3932cep106e48jsn6d77e0d951b3',
             'X-RapidAPI-Host': 'sofasport.p.rapidapi.com'
  }
};

    async function getData(){
        
        let res = await fetch(APIExt,options);
        await delay(2000);
        if (res.ok) {
            let json = await res.json();
            const nombre = json.data.map(item => item.name);
            deportes.push(nombre);
            //for(let i = 0; i<8; i++){
            //    
            //    deportes.push(datos[i].name);
            //    directo.push(datos[i].live);
            //}
            loadCharts();
        }else{
            deportes = [];
            directo = [];
            loadCharts();
        }
    }


    async function loadCharts(graphData){

        Highcharts.chart('container', {
    chart: {
        type: 'line'
    },
    title: {
        text: 'Monthly Average Temperature'
    },
    subtitle: {
        text: 'Source: ' +
            '<a href="https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature" ' +
            'target="_blank">Wikipedia.com</a>'
    },
    xAxis: {
        categories: deportes
    },
    yAxis: {
        title: {
            text: 'Temperature (°C)'
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    series: [{
        name: 'Reggane',
        data: directo
    }]
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

</main>