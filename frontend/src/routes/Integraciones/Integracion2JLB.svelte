<head>
	<!-- Load plotly.js into the DOM -->
	<script src='https://cdn.plot.ly/plotly-2.20.0.min.js'></script>
</head>

<script>
      // @ts-nocheck
  import { onMount } from 'svelte';
  //import { dev } from '$app/environment';
  const delay = ms => new Promise(res => setTimeout(res, ms));

  let API = "https://sos2223-13.ew.r.appspot.com/api/v2/employment";


  
  let indice = [];
  let employedData = [];
  let inactiveData = [];
  let unemployedData = [];
  let result = "";
  let resultStatus = "";
  let labelAPIExt = [];
  let dataAPIExt = [];
  let result2 = "";
  let resultStatus2 = "";

  const APIExt = "https://covid-193.p.rapidapi.com/statistics";
  const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'a9593ce2e3msh1dbc9c19a3932cep106e48jsn6d77e0d951b3',
    'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
  }
};

  async function getData() {
    resultStatus = result = "";
    const res = await fetch(API, {
            method: "GET"
            });
        if (res.ok) {
            try{
                const json = await res.json();
                result = JSON.stringify(json, null, 2);
                datos = json;
                datos.forEach(dato =>{
                        indice.push(dato.region+" "+dato.year+" "+dato.period+" "+dato.date);
                        employedData.push(dato["employed_person"]);
                        inactiveData.push(dato["inactive_person"]); 
                        unemployedData.push(dato["unemployed_person"]);
                        labelAPIExt.push(0); 
                        dataAPIExt.push(0);
                                       
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
        const res2 = await fetch(APIExt,options, {
            method: "GET"
            });
        if (res2.ok) {
            try{
                const json = await res2.json();
                //result = JSON.stringify(json, null, 2);
                //datos = json;
                indice.push(0);
                employedData.push(0);
                inactiveData.push(0);
                unemployedData.push(0);
                labelAPIExt.push(json.response[0].country);
                dataAPIExt.push(json.response[0].population);
                
            }catch(error){
                    console.log(`Error devolviendo la gráfica: ${error}`);
            }
            const status2 = await res2.status;
            resultStatus2 = status2;   
        }else{
            console.log("Error al cargar la gráfica"); 
        }
        await delay(1000);
        loadCharts();


async function loadCharts(graphData){
 var trace1 = {
  x: indice,
  y: employedData,
  mode: 'lines+markers',
  connectgaps: true
};

var trace2 = {
  x: labelAPIExt,
  y: dataAPIExt,
  mode: 'markers',
  connectgaps: true
};

var data = [trace1, trace2];

var layout = {
  title: 'Connect the Gaps Between Data',
  showlegend: false
};

Plotly.newPlot('myDiv', data, layout);
        }

    
  }
  onMount(async () => {
    await getData();
  });
</script>


<main>
    <h2>Gráfica sobre la vida laboral en Andalucia y el COVID en Africa</h2>
    <div id='myDiv'>// Plotly chart will be drawn inside this DIV</div>
</main>