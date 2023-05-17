<svelte:head>
    <script src="https://cdn.plot.ly/plotly-2.20.0.min.js"></script>
</svelte:head>

<script>
    //@ts-nocheck
    import { Table } from "sveltestrap";
    import { onMount } from "svelte";
    import { local } from "d3";
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    let result = "";
    let resultStatus = "";

    let datos = [];

    let inicio = [];
    let fin = [];
    let precio = [];
    let unidad = [];
    let precio_local = [];
    let lugar = [];

    onMount(async () => {
        getDatos();
    });

    const url =
        "https://marktdaten-deutschland.p.rapidapi.com/marketdata?zip=69256";
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key":
                "14bb23eb3dmshaaee84a74703686p1964ddjsn6905a0bff0f4",
            "X-RapidAPI-Host": "marktdaten-deutschland.p.rapidapi.com",
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
                datos = dat.data;
                console.log(datos);
                datos.forEach((element) => {
                    inicio.push(element["start_timestamp"]);
                    fin.push(element["end_timestamp"]);
                    precio.push(element["marketprice"]);
                    unidad.push(element["unit"]);
                    precio_local.push(element["localprice"]);
                    lugar.push(element["localcell"]);
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
        loadChart3();
    }

    async function loadChart3() {
  var trace1 = {
    y: inicio,
    type: "box",
    name: "inicio"
  };

  var trace2 = {
    y: fin,
    type: "box",
    name: "fin"
  };

  var trace3 = {
    y: precio_local,
    type: "box",
    name: "precio local"
  };

  var data = [trace1, trace2, trace3];

  var layout = {
    showlegend: true,
    font: { size: 15 }
  };

  Plotly.newPlot("myDiv", data, layout, { responsive: true });
}

</script>

<h1
    style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 45px; text-decoration:underline;"
>
    Datos: Market Alemania
</h1>
<br />
<div style="text-align:center;">
    <strong>Número de datos: {datos.length}</strong>
</div>
<br />


<main>
    <h2
        style="font-size:40px; font-family: 'Times New Roman', Times, serif; text-align:center; font-weight: bold;"
    >
        Gráfica de Market Alemania
    </h2>
    <h4
        style="font-size:12px; font-family: 'Times New Roman', Times, serif; text-align:center; font-weight: bold;"
    >
        Gráfica con Plotly
    </h4>
    <br />

    <div id="myDiv" />

    <p style="text-align: center;">
        Gráfica que obtiene datos de los precios de la electricidad en alemania.
    </p>
    <br />
</main>
