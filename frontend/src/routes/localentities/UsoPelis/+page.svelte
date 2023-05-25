
<script>
    //@ts-nocheck
    import { Table } from "sveltestrap";
    import { onMount } from "svelte";
    import { local } from "d3";
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    let result = "";
    let resultStatus = "";

    let datos = [];

    let titulo = [];
    let año = [];
    let pais = [];

    onMount(async () => {
        getDatos();
    });

    const url =
        "https://where-can-i-watch1.p.rapidapi.com/search/uk/back%20to%20the%20future";
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key":
                "01cd34b806msh61c7b8a29784bfdp11335ejsnb506b37121ad",
            "X-RapidAPI-Host": "where-can-i-watch1.p.rapidapi.com",
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
                datos = dat;
                console.log(datos);
                datos.forEach((element) => {
                    titulo.push(element["title"]);
                    año.push(element["year"]);
                    pais.push(element["country"]);
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
            x: titulo,
            y: año,
            mode: "markers",
            type: "scatter",
            marker: {
                symbol: "x",
                size: 8,
            },
            name: "nombre",
        };

        var trace2 = {
            x: pais,
            y: año,
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

<svelte:head>
    <script src="https://cdn.plot.ly/plotly-2.20.0.min.js"></script>
</svelte:head>

<h1
    style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 45px; text-decoration:underline;"
>
    Datos: Where I can Watch
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
        Gráfica de Películas de Reino Unido.
    </h2>
    <h4
        style="font-size:12px; font-family: 'Times New Roman', Times, serif; text-align:center; font-weight: bold;"
    >
        Gráfica con Plotly
    </h4>
    <br />

    <div id="myDiv" />

    <p style="text-align: center;">
        Gráfica que obtiene algunas películas y series de Reino Unido.
    </p>
    <br />
</main>

