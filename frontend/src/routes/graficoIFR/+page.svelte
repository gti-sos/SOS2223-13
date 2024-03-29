<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    <title>SOS2223-13-Gráfica Localidades</title>
</svelte:head>

<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    import { dev } from "$app/environment";

    let API = "/api/v2/graficoIFR";

    let graph = [];

    let provincia_año = [];
    let superficie = [];
    let poblacion = [];
    let gastos = [];
    let ingresos = [];

    let result = "";
    let resultStatus = "";

    onMount(async () => {
        getGraph();
    });

    if (dev) API = "http://localhost:8080" + API;

    async function getGraph() {
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "GET",
        });
        if (res.ok) {
            try {
                const valores = await res.json();
                result = JSON.stringify(valores, null, 2);
                graph = valores;
                graph.forEach((graph) => {
                    console.log(graph);
                    provincia_año.push(
                        graph.province + "-" + graph.president_appointment_date + "-" + graph.first_name + "-" + graph.second_name
                    );
                    superficie.push(parseInt(graph["surface_extension"]));
                    poblacion.push(parseInt(graph["population"]));
                    gastos.push(parseFloat(graph["expense"]));
                    ingresos.push(parseFloat(graph["income"]));
                });
                await delay(500);
                loadChart();
            } catch (error) {
                console.log(`Error devolviendo la gráfica: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
        } else {
            console.log("Error al cargar la gráfica");
        }
    }

    async function loadChart() {
        Highcharts.chart("container", {
            chart: {
                type: "column",
            },
            title: {
                text: "Estadísticas Entidades Locales",
                style: {
                    fontWeight: "bold",
                    fontFamily: "Times New Roman",
                    fontSize: 50,
                },
            },

            subtitle: {
                text: "Gráfica con HighCharts",
                style: {
                    fontFamily: "Times New Roman",
                    fontWeight: "bold",
                    fontSize: 14,
                    color: "black",
                },
            },
            xAxis: {
                title: {
                    text: "Provincia - Fecha Nombramiento Presidente - Nombre Completo Presidente",
                    style: {
                        fontWeight: "bold",
                    },
                },
                categories: provincia_año,
                crosshair: true,
            },
            yAxis: {
                min: 0,
                max: 20000000,
                title: {
                    text: "Entidades Locales",
                    style: {
                        fontWeight: "bold",
                    },
                },
            },
            tooltip: {
                headerFormat:
                    '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat:
                    '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y: 2f}</b></td></tr>',
                footerFormat: "</table>",
                shared: true,
                useHTML: true,
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 2,
                    borderColor: "#000",
                },
            },
            series: [
                {
                    name: "Superficie",
                    data: superficie,
                },
                {
                    name: "Poblacion",
                    data: poblacion,
                },
                {
                    name: "Gastos",
                    data: gastos,
                },
                {
                    name: "Ingresos",
                    data: ingresos,
                },
            ],
            responsive: {
                rules: [
                    {
                        condition: {
                            maxWidth: 1000,
                        },
                        chartOptions: {
                            legend: {
                                layout: "horizontal",
                                align: "center",
                                verticalAlign: "bottom",
                            },
                        },
                    },
                ],
            },
        });
    }
</script>


<main>
    <figure class="highcharts-figure">
        <div id="container" />
        <p class="highcharts-description">
            Gráfico de Columnas sobre las Entidades Locales de diferentes
            provincias de Andalucía en diversos años.
        </p>
    </figure>
</main>
