<svelte:head>
  <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
</svelte:head>

<script>
  // @ts-nocheck
  import { onMount } from 'svelte';
  //import { dev } from '$app/environment';
  const delay = ms => new Promise(res => setTimeout(res, ms));

  let API = "https://sos2223-13.ew.r.appspot.com/api/v2/employment";



  let employedData = [];
  let inactiveData = [];
  let unemployedData = [];
  let result = "";
  let resultStatus = "";
  let dataAPIExt = [];
  let result2 = "";
  let resultStatus2 = "";

  const APIExt = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities/Q60";
  const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'a9593ce2e3msh1dbc9c19a3932cep106e48jsn6d77e0d951b3',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
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
                for(let i = 0; i<json.length; i++){
                employedData.push({ y: json[i].employed_person, label: json[i].region+" "+json[i].year+" "+json[i].period+" "+json[i].date});
                inactiveData.push({ y: json[i].inactive_person, label: json[i].region+" "+json[i].year+" "+json[i].period+" "+json[i].date});
                unemployedData.push({ y: json[i].unemployed_person, label: json[i].region+" "+json[i].year+" "+json[i].period+" "+json[i].date});
                dataAPIExt.push({y: 0});
                }
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
                employedData.push({ y: 0});
                inactiveData.push({ y: 0});
                unemployedData.push({ y: 0});
                dataAPIExt.push({y: json.data.population, label: json.data.region});
                
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

    
  }


  async function loadCharts(graphData) {
    

const chart = new CanvasJS.Chart("chartContainer", {
animationEnabled: true,
title:{
    text: "Situación laboral de los andaluces entre 2017-2020 y población de Nueva York "
},
axisY: {
    title: "Personas",
    includeZero: true
},
legend: {
    cursor:"pointer",
    itemclick : toggleDataSeries
},
toolTip: {
    shared: true,
    content: toolTipFormatter
},
data: [{
    type: "bar",
    showInLegend: true,
    name: "Empleadas",
    color: "gold",
    dataPoints: employedData
},
{
    type: "bar",
    showInLegend: true,
    name: "Inactivas",
    color: "silver",
    dataPoints: inactiveData
},
{
    type: "bar",
    showInLegend: true,
    name: "Desempleadas",
    color: "#A57164",
    dataPoints: unemployedData
},
{
    type: "bar",
    showInLegend: true,
    name: "Población Nueva York",
    color: "blue",
    dataPoints: dataAPIExt
}]
});
chart.render();

function toolTipFormatter(e) {
var str = "";
var total = 0 ;
var str3;
var str2 ;
for (var i = 0; i < e.entries.length; i++){
    var str1 = "<span style= \"color:"+e.entries[i].dataSeries.color + "\">" + e.entries[i].dataSeries.name + "</span>: <strong>"+  e.entries[i].dataPoint.y + "</strong> <br/>" ;
    total = e.entries[i].dataPoint.y + total;
    str = str.concat(str1);
}
str2 = "<strong>" + e.entries[0].dataPoint.label + "</strong> <br/>";
str3 = "<span style = \"color:Tomato\">Total: </span><strong>" + total + "</strong><br/>";
return (str2.concat(str)).concat(str3);
}

function toggleDataSeries(e) {
if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
    e.dataSeries.visible = false;
}
else {
    e.dataSeries.visible = true;
}
chart.render();
}

}
  
  onMount(async () => {
    await getData();
  });
</script>

<main>
  <h1>&nbsp;&nbsp;Integración datos empleo y población Nueva York</h1>
  <div id="chartContainer" style="height: 300px; width: 100%;"></div>
</main>