<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import { Button } from "sveltestrap";
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    //import { dev } from "$app/environment";


    let API = "https://sos2223-13.ew.r.appspot.com/api/v2/localentities";
    let API2 = "https://sos2223-15.ew.r.appspot.com/api/v2/salary-stats";

    let graph = [];
    let graph2 = [];

    let salario = [];
    let salario_medio = [];
    let desviación = [];

    let provincia_año = [];
    let superficie = [];
    let poblacion = [];
    let gastos = [];
    let ingresos = [];

    let result = "";
    let resultStatus = "";

    let result2 = "";
    let resultStatus2 = "";

    onMount(async () => {
        getGraph();
    });

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
                graph.sort((a, b) =>
                    a.province > b.province ? 1 : b.province > a.province ? -1 : 0 );
                graph.sort((a, b) =>
                    a.president_appointment_date > b.president_appointment_date ? 1 : b.president_appointment_date > a.president_appointment_date ? -1 : 0);
                graph.forEach((graph) => {
                    console.log(graph);
                    provincia_año.push(
                        graph.province +"-" +graph.president_appointment_date +"-" +graph.first_name +"-" +graph.second_name);
                    superficie.push(graph["surface_extension"]);
                    poblacion.push(graph["population"]);
                    gastos.push(graph["expense"]);
                    ingresos.push(graph["income"]);

                    salario.push(0);
                    salario_medio.push(0);
                    desviación.push(0);
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

        resultStatus2 = result2 = "";
        const res2 = await fetch(API2, {
            method: "GET",
        });
        if (res2.ok) {
            try {
                const valores2 = await res2.json();
                result2 = JSON.stringify(valores2, null, 2);

                graph2 = valores2;
                graph2.sort((a, b) =>
                    a.province > b.province
                        ? 1
                        : b.province > a.province
                        ? -1
                        : 0
                );
                graph2.sort((a, b) =>
                    a.year > b.year ? 1 : b.year > a.year ? -1 : 0
                );
                graph2.forEach((graph2) => {
                    salario.push(graph2["salaried"]);
                    salario_medio.push(graph2["average_salary"]);
                    desviación.push(graph2["standard_deviation"]);

                    provincia_año.push(
                        graph2.province +
                            "-" +
                            graph2.year +
                            "-" +
                            graph2.gender
                    );

                    superficie.push(0);
                    poblacion.push(0);
                    gastos.push(0);
                    ingresos.push(0);
                });
            } catch (error) {
                console.log(`Error devolviendo la gráfica: ${error}`);
            }
            const status2 = await res2.status;
            resultStatus2 = status2;
        } else {
            console.log("Error al cargar la gráfica");
        }

        await delay(500);
        loadChart();
    }
    async function loadChart() {
        Highcharts.chart("container3", {
            chart: {
                type: "pie",
            },
            title: {
                text: "Estadísticas Densidad de población y Entidades Locales",
                style: {
                    fontWeight: "bold",
                    fontFamily: "Times New Roman",
                    fontSize: 40,
                },
            },
            subtitle: {
                text: "Gráfica con HighCharts",
                style: {
                    fontFamily: "Times New Roman",
                    fontWeight: "bold",
                    fontSize: 12,
                    color: "black",
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
                pie: {
                    innerSize: "50%",
                    allowPointSelect: true,
                    cursor: "pointer",
                    dataLabels: {
                        enabled: true,
                        format: "<b>{point.name}</b>: {point.y:.2f}",
                        style: {
                            color:
                                (Highcharts.theme &&
                                    Highcharts.theme.contrastTextColor) ||
                                "black",
                        },
                    },
                },
                series: {
                    type: "pie",
                    innerSize: "50%",
                    depth: 45,
                    dataLabels: {
                        enabled: true,
                        format: "<b>{point.name}</b>: {point.y:.2f}",
                    },
                },
            },
            series: [
                {
                    name: "Estadísticas",
                    colorByPoint: true,
                    data: [
                        {
                            name: "Salario",
                            y: salario.reduce((a, b) => a + b, 0),
                        },
                        {
                            name: "Salario Medio",
                            y: salario_medio.reduce((a, b) => a + b, 0),
                        },
                        {
                            name: "Desviación",
                            y: desviación.reduce((a, b) => a + b, 0),
                        },
                        {
                            name: "Superficie",
                            y: superficie.reduce((a, b) => a + b, 0),
                        },
                        {
                            name: "Poblacion",
                            y: poblacion.reduce((a, b) => a + b, 0),
                        },
                        {
                            name: "Gastos",
                            y: gastos.reduce((a, b) => a + b, 0),
                        },
                        {
                            name: "Ingresos",
                            y: ingresos.reduce((a, b) => a + b, 0),
                        },
                    ],
                },
            ],
        });
    }
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>
<main>
    <figure
        class="highcharts-figure"
        style="margin-left: 25px; margin-right:25px"
    >
        <div id="container3" />
        <p class="highcharts-description" style="text-align:center">
            Gráfico de Donut sobre las Densidades de población y Entidades
            Locales.
        </p>
    </figure>
    <Button outline color="secondary" href="/Integraciones">Volver</Button>
    <hr style="text-align: right; margin-left: 100px; margin-right: 100px;" />
</main>
