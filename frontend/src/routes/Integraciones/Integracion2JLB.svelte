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
                json.forEach(dato =>{
                        indice.push(dato.region+" "+dato.year+" "+dato.period+" "+dato.date);
                        employedData.push(dato["employed_person"]);
                        inactiveData.push(dato["inactive_person"]); 
                        unemployedData.push(dato["unemployed_person"]);
                                       
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


async function loadCharts(){
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

var trace3 = {
  x: indice,
  y: inactiveData,
  mode: 'lines+markers',
  connectgaps: true
};

var trace4 = {
  x: indice,
  y: unemployedData,
  mode: 'lines+markers',
  connectgaps: true
};


var data = [trace1, trace2, trace3, trace4];

var layout = {
  autosize: false,
  width: 500,
  height: 500,
  margin: {
    l: 50,
    r: 50,
    b: 100,
    t: 100,
    pad: 4
  },
  paper_bgcolor: '#7f7f7f',
  plot_bgcolor: '#c7c7c7'
};

Plotly.newPlot('myDiv', data, layout);
        }

    
  }
  onMount(async () => {
    await getData();
  });
</script>


<main>
    <h2>Gráfica sobre la vida laboral en Andalucia y número de habitantes en un pais aleatoria</h2>
    <div id='myDiv'>// Plotly chart will be drawn inside this DIV</div>
</main>