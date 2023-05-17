<!--
    
    <script>
    //@ts-nocheck
    import { Table } from "sveltestrap";
    import { onMount } from "svelte";
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    let datos = [];

    let nombre = [];
    let rol = [];
    let victorias = [];

    let result = "";
    let resultStatus = "";

    onMount(async () => {
        getDatos();
    });

    const url =
        "https://league-of-legends-galore.p.rapidapi.com/api/getChampTierList?tier=s%2B&region=kr&rank=master";
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key":
                "01cd34b806msh61c7b8a29784bfdp11335ejsnb506b37121ad",
            "X-RapidAPI-Host": "league-of-legends-galore.p.rapidapi.com",
        },
    };

    async function getDatos() {
        resultStatus = result = "";
        const res = await fetch(url, options);
        console.log(res);

        if (res.ok) {
            try {
                const dat = await res.json();
                result = JSON.stringify(dat, null, 2);
                datos = dat.sTier;
                console.log(datos);
                datos.forEach((element) => {
                    nombre.push(element["name"]);
                    rol.push(element["role"]);
                    victorias.push(element["winRate"]);
                });
            } catch (error) {
                console.log(`Error parseando el resultado: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
        } else {
            console.log("Error al devolver la gráfica");
        }
        await delay(500);
        loadChart3;
    }

    async function loadChart3() {
        var trace1 = {
            x: nombre,
            y: victorias,
            mode: "markers",
            type: "scatter",
            marker: {
                symbol: "x",
                size: 8,
            },
            name: "nombre",
        };

        var trace2 = {
            x: rol,
            y: victorias,
            mode: "markers",
            type: "scatter",
            marker: {
                symbol: "x",
                size: 8,
            },
            name: "rol",
        };
        var data = [trace1, trace2];

        var layout = {
            showlegend: true,
            font: { size: 15 },
        };

        Plotly.newPlot("myDiv", data, layout, { responsive: true });
    }
</script>



<main>
    <br>
    <div style="text-align:center;">
        <strong >Número de datos: {datos.length}</strong>
    </div>
    
    <canvas id="myChart3" style="width: 20vw; height: 20vh;"></canvas>
    <p style="text-align:center">
        Estadísticas Entidades Locales y Mercado Alemania.
    </p>
    <br>
</main>
</main>


-->








<!--

    async function loadChart3() {
  var trace1 = {
    y: nombre,
    type: "box",
    name: "nombre"
  };

  var trace2 = {
    y: rol,
    type: "box",
    name: "rol"
  };

  var data = [trace1, trace2];

  var layout = {
    showlegend: true,
    font: { size: 15 }
  };



  -----------------------------------------------------------------------------------


  async function loadChart3() {
        var trace1 = {
            x: nombre,
            y: victorias,
            mode: "markers",
            type: "scatter",
            marker: {
                symbol: "x",
                size: 8,
            },
            name: "nombre",
        };

        var trace2 = {
            x: rol,
            y: victorias,
            mode: "markers",
            type: "scatter",
            marker: {
                symbol: "x",
                size: 8,
            },
            name: "rol",
        };
        var data = [trace1, trace2];

        var layout = {
            showlegend: true,
            font: { size: 15 },
        };

-------------------------------------------------------------------------------------------------------------

  Plotly.newPlot("myDiv", data, layout, { responsive: true });
}-->
