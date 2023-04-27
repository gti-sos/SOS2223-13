<svelte:head>
  <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
</svelte:head>

<script>
  // @ts-nocheck
  import { onMount } from 'svelte';
  import { dev } from '$app/environment';
  const delay = ms => new Promise(res => setTimeout(res, ms));

  let API = '/api/v2/data';

  if (dev) 
       API = 'http://localhost:8080' + API;

  let data = [];
  let provincia_period = [];
  let employed_person = [];
  let result = "";
  let resultStatus = "";

  async function getData() {
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
                  provincia_period.push(data.region);
                  employed_person.push(data["employed_person"]);
                  //hombres.push(data["man"]);
                  //mujeres.push(data["woman"]);
                  //menor16.push(data["under_sixteen_years"]);
                  //de16a64.push(data["from_sixteen_to_sixty_four_years"]);
                  //partir65.push(data["sixty_five_and_over"]);                  
            });
                await delay(500);
                loadCharts(); //,3
            }catch(error){
                console.log(`Error devolviendo la gráfica: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
            }else{
              console.log("Ha habido un error cargando los datos");
            }
    
  }
  async function loadCharts(graphData) {
    

const chart = new CanvasJS.Chart("chartContainer", {
animationEnabled: true,
title:{
    text: "Olympic Medals of all Times (till 2016 Olympics)"
},
axisY: {
    title: "Medals",
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
    name: "Gold",
    color: "gold",
    dataPoints: [
        { y: employed_person, label: provincia_period }
    ]
},
{
    type: "bar",
    showInLegend: true,
    name: "Silver",
    color: "silver",
    dataPoints: [
        { y: 212, label: "Italy" },
        { y: 186, label: "China" },
        { y: 272, label: "France" },
        { y: 299, label: "Great Britain" },
        { y: 270, label: "Germany" },
        { y: 165, label: "Russia" },
        { y: 896, label: "USA" }
    ]
},
{
    type: "bar",
    showInLegend: true,
    name: "Bronze",
    color: "#A57164",
    dataPoints: [
        { y: 236, label: "Italy" },
        { y: 172, label: "China" },
        { y: 309, label: "France" },
        { y: 302, label: "Great Britain" },
        { y: 285, label: "Germany" },
        { y: 188, label: "Russia" },
        { y: 788, label: "USA" }
    ]
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
  <h1>Graph</h1>
  <div id="chartContainer" style="height: 300px; width: 100%;"></div>
</main>
