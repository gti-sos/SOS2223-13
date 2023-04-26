<script>
    // @ts-nocheck
    import {onMount} from 'svelte';    
    import {Button} from 'sveltestrap';
    const delay = ms => new Promise(res => setTimeout(res,ms));
    let xLabel1 = [];
    let xLabel2 = [];
    //Evolution
    let EvolutionStats = [];
    let poblaciontotal = [];
    let hombres = [];
    let mujeres = []; 
    let menor16 = [];
    let de16a64 = [];
    let partir65 = []; 
    //Agroclimatics
    let response = [];
    let population = [];
    //let temp_min = [];
    //let temp_med = []; 
    async function getData(){
        //const fetch = require('node-fetch');
        const url = 'https://country-facts.p.rapidapi.com/region/europe';
        const options = {
            method: 'GET',
            headers: {
    'content-type': 'application/octet-stream',
    'X-RapidAPI-Key': '855564e830mshf28ff549a54319bp1c402cjsnf5e497f427c7',
    'X-RapidAPI-Host': 'country-facts.p.rapidapi.com',
  }
        };
        //const result = await response.text();
        //console.log(result);
        await fetch("https://sos2223-13.appspot.com/api/v2/evolution/loadinitialdata");
        
        const Response = await fetch(url, options);
        const evolution2 = await fetch("https://sos2223-13.appspot.com/api/v2/evolution");
        if (Response.ok && evolution2.ok){
            
            EvolutionStats = await evolution2.json();
            response = await Response.json();
            console.log(response);
            //Evolution
            EvolutionStats.sort((a,b) => (a.period > b.period) ? 1 : ((b.period > a.period) ? -1 : 0));
            EvolutionStats.sort((a,b) => (a.territory > b.territory) ? 1 : ((b.territory > a.territory) ? -1 : 0));
            EvolutionStats.forEach(element=>{
                poblaciontotal.push(element.total_population);
                hombres.push(element.man);
                mujeres.push(element.woman);
                menor16.push(element.under_sixteen_years);
                de16a64.push(element.from_sixteen_to_sixty_four_years);
                partir65.push(element.sixty_five_and_over);
            });
            //Agroclimatics
            //response.sort((a,b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
            //response.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
            response.forEach(element=>{
                population.push(parseFloat(element.population));
                //temp_min.push(parseFloat(element.minimun_temperature));
                //temp_med.push(parseFloat(element.medium_temperature));
            });
            
            //EvolutionStats.forEach(element =>{
              //  xLabel.push(element.territory+","+parseInt(element.period));
            //});
            //AgroclimaticStats.forEach(element =>{
              //  xLabel.push(element.province+","+parseInt(element.year));
            //});
            EvolutionStats.forEach(element =>{
                xLabel1.push(element.territory+","+parseInt(element.period));
            });
            response.forEach(element =>{
                //console.log(element.population);
                xLabel2.push(element.name.common);
            });
            xLabel1=new Set(xLabel1);
            xLabel1=Array.from(xLabel1);
            xLabel2=new Set(xLabel2);
            xLabel2=Array.from(xLabel2);
            //xLabel.sort();
            await delay(500);
            loadGraph();
        }   
    }
    async function loadGraph(){
        console.log(population);
        //console.log(xLabel);
        Highcharts.chart('container', {
            chart: {
                type: 'area'
            },
            title: {
                text: 'Gráficas conjuntas'
            },
            subtitle: {
                text: 'Integracion Evolution + ApiPopulation | Tipo: Area'
            },
            yAxis: {
                title: {
                    text: 'Valor'
                },
            },
            xAxis: {
                title: {
                    text: "Territorio-Año",
                },
                //max: 48,
                categories: xLabel1, //province_period
                crosshair: true
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },            
            series: [
                //Evolution
                {
                name: 'Población Total',
                data: poblaciontotal
                },
                {
                name: 'Hombres',
                data: hombres
                },
                {
                name: 'Mujeres',
                data: mujeres
                },
                {
                name: 'Menor de 16 años',
                data: menor16
                },
                {
                name: 'De 16 a 64 años',
                data: de16a64
                },
                {
                name: 'A partir de 65 años',
                data: partir65
                },
                //Agroclimatics
                {
                name: 'Poblacion',
                data: population
                },
               // {
                //name: 'Temperatura mínima',
                //data: temp_min
                //},
                //{
                //name: 'Temperatura media',
                //data: temp_med
                //},
            ],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
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
   
    onMount(getData);
    
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>    
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            
        </p>
    </figure>

    <Button outline color="secondary" href="/">Volver</Button>
</main>