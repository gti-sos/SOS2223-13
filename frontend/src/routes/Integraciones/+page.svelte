<script>
    // @ts-nocheck
    import {onMount} from 'svelte';    
    import {Button} from 'sveltestrap';
    const delay = ms => new Promise(res => setTimeout(res,ms));
    let xLabel = [];
    //Evolution
    let EvolutionStats = [];
    let poblaciontotal = [];
    let hombres = [];
    let mujeres = []; 
    let menor16 = [];
    let de16a64 = [];
    let partir65 = []; 
    //Agroclimatics
    let AgroclimaticStats = [];
    let temp_max = [];
    let temp_min = [];
    let temp_med = []; 
    async function getData(){
        await fetch("https://sos2223-12.appspot.com/api/v2/agroclimatic/loadInitialData");
        await fetch("http://localhost:8080/api/v2/evolution/loadinitialdata");
        
        const Agroclimaticstats = await fetch("https://sos2223-12.appspot.com/api/v2/agroclimatic");
        const evolution2 = await fetch("http://localhost:8080/api/v2/evolution");
        if (Agroclimaticstats.ok && evolution2.ok){
            
            EvolutionStats = await evolution2.json();
            AgroclimaticStats = await Agroclimaticstats.json();
            
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
            AgroclimaticStats.sort((a,b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
            AgroclimaticStats.sort((a,b) => (a.province > b.province) ? 1 : ((b.province > a.province) ? -1 : 0));
            AgroclimaticStats.forEach(element=>{
                temp_max.push(parseFloat(element.maximun_temperature));
                temp_min.push(parseFloat(element.minimun_temperature));
                temp_med.push(parseFloat(element.medium_temperature));
            });
            
            //EvolutionStats.forEach(element =>{
              //  xLabel.push(element.territory+","+parseInt(element.period));
            //});
            //AgroclimaticStats.forEach(element =>{
              //  xLabel.push(element.province+","+parseInt(element.year));
            //});
            EvolutionStats.forEach(element =>{
                xLabel.push(element.territory+","+parseInt(element.period));
            });
            AgroclimaticStats.forEach(element =>{
                xLabel.push(element.province+","+parseInt(element.year));
            });
            xLabel=new Set(xLabel);
            xLabel=Array.from(xLabel);
            xLabel.sort();
            await delay(500);
            loadGraph();
        }   
    }
    async function loadGraph(){
        console.log(xLabel);
        Highcharts.chart('container', {
            chart: {
                type: 'area'
            },
            title: {
                text: 'Gráficas conjuntas'
            },
            subtitle: {
                text: 'Integracion Evolution + AgroclimaticStats | Tipo: Area'
            },
            yAxis: {
                title: {
                    text: 'Valor'
                },
            },
            xAxis: {
                title: {
                    text: "Provincia-Año",
                },
                //max: 48,
                categories: xLabel, //province_period
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
                name: 'Temperatura máxima',
                data: temp_max
                },
                {
                name: 'Temperatura mínima',
                data: temp_min
                },
                {
                name: 'Temperatura media',
                data: temp_med
                },
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