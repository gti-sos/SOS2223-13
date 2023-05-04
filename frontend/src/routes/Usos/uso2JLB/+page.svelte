<svelte:head>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js" on:load="{loadCharts}"></script>
    
</svelte:head>

<script>
    // @ts-nocheck
    import {onMount} from 'svelte';
    const delay = ms => new Promise(res => setTimeout(res, ms));
    
    let equipo1 = [];
    let equipo2 = [];
    let partidos = [];
    
    const APIExt = "https://unibet.p.rapidapi.com/live-matches-by-sport?sport=football"
    const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "a9593ce2e3msh1dbc9c19a3932cep106e48jsn6d77e0d951b3",
                "X-RapidAPI-Host": "unibet.p.rapidapi.com"
            }
    };

    async function getData(){
        
        let res = await fetch(APIExt,options);
        await delay(2000);
        if (res.ok) {
            let json = await res.json();
            for(let i = 0; i<8; i++){
                
                partidos.push(json[i].name);
                equipo1.push(json[i].team1.score);
                equipo2.push(json[i].team2.score);
            }
            loadCharts();
        }else{
            partidos = [];
            equipo1 = [];
            equipo2 = [];
            loadCharts();
        }
    }
    
    async function loadCharts(){
        var ctx = document.getElementById("myChart").getContext("2d");
        var chart = new Chart(ctx, {
            type: "line",
            responsive: true,
            maintainAspectRatio: false,
            data: {
                labels: partidos,
                datasets: [
                    {
                        label: "Goles equipo 1",
                        backgroundColor: 'rgb(190,190,190)',
                        pointBackgroundColor: 'rgb(255, 99, 132)',
                        pointHoverBorderColor: 'rgb(255, 99, 132)',
                        data: equipo1,
                    },
                    {
                        label: "Goles equipo 2",
                        backgroundColor: 'rgb(255,255,255)',
                        pointBackgroundColor: 'rgb(54, 162, 235)',
                        pointHoverBorderColor: 'rgb(54, 162, 235)',
                        data: equipo2,
                    },
                ],
            }
        });
    }
    
    onMount(getData);
    
    </script>
    
    <main>
        <div>
            <h1>
                API: Football 
            </h1>
        </div>
        <div id="chartBox" >
            <canvas id="myChart" align="center"></canvas>
        </div>
      
        
        <br>
        
        <br><br>
    </main>
    <style>
        main {
            text-align: center;
            padding: 30px;       
        }
    </style>