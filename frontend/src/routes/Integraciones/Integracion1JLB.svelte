<svelte:head>
  <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
</svelte:head>

<script>
  // @ts-nocheck
  import { onMount } from 'svelte';
  import { dev } from '$app/environment';
  const delay = ms => new Promise(res => setTimeout(res, ms));

  let API = 'https://sos2223-13.ew.r.appspot.com/api/v2/employment';



  let employedData = [];
  let inactiveData = [];
  let unemployedData = [];
  let result = "";
  let resultStatus = "";

  async function getData() {
    resultStatus = result = "";
    const res = await fetch(API, {
            method: "GET"
            });
        if (res.ok) {
            const json = await res.json();
            for(let i = 0; i<json.length; i++){
                employedData.push({ y: json[i].employed_person, label: json[i].region+" "+json[i].year+" "+json[i].period+" "+json[i].date});
                inactiveData.push({ y: json[i].inactive_person, label: json[i].region+" "+json[i].year+" "+json[i].period+" "+json[i].date});
                unemployedData.push({ y: json[i].unemployed_person, label: json[i].region+" "+json[i].year+" "+json[i].period+" "+json[i].date});
            }
            await delay(1000);
            loadCharts();
        }else{
            window.alert('no hay registros');
            employedData = [];
            inactiveData = [];
            unemployedData = [];
            await delay(1000);
            loadCharts();
        }
    
  }
  async function loadCharts(graphData) {
    

const chart = new CanvasJS.Chart("chartContainer", {
animationEnabled: true,
title:{
    text: "Situación laboral de los andaluces entre 2017 y 2020. "
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
  <h1>Gráfico canvas</h1>
  <div id="chartContainer" style="height: 300px; width: 100%;"></div>
</main>