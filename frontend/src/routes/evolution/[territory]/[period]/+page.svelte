<script>
    // @ts-nocheck

        import { onMount } from "svelte";
        import { dev } from "$app/environment";
        import { Button, Table } from 'sveltestrap';
        import { page } from "$app/stores";

        onMount(async () =>{
            getEvolution_dato();
        });

        let mensajeUsuario = "";
        let territory = $page.params.territory;
        let period = $page.params.period;
    
        let API = "/api/v2/evolution/"+ territory +'/' + period;
        if(dev)
            API = "http://localhost:8080"+API
        let updateEvolutionTerritory = territory;
        let updateEvolutionPeriod = period;
        let updateEvolutionTotalPopulation = "total_population";
        let updateEvolutionMan = "man";
        let updateEvolutionWoman = "woman";
        let updateEvolutionUndersixteenyears = "under";
        let updateEvolutionSixteensixtyfouryears = "from";
        let updateEvolutionSixtyfiveoveryears = "over";

        let result = "";
        let resultStatus = "";

        async function getEvolution_dato(){
            resultStatus = result = "";
            const res = await fetch(API, {
                method: "GET"
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                updateEvolutionPeriod = data.period;
                updateEvolutionTerritory = data.territory;
                updateEvolutionTotalPopulation = data.total_population;
                updateEvolutionMan = data.man;
                updateEvolutionWoman = data.woman;
                updateEvolutionUndersixteenyears = data.under_sixteen_years;
                updateEvolutionSixteensixtyfouryears = data.from_sixteen_to_sixty_four_years;
                updateEvolutionSixtyfiveoveryears = data.sixty_five_and_over;
                
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
            }
            
            const status = await res.status;
            resultStatus = status;
            if(status==404){
                mensajeUsuario = `La ruta solicitada "${territory}/${period}" no existe`;
            }
        }

        async function updateEvolution(){
            resultStatus = result = "";
            const res = await fetch(API, {
                method: "PUT",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    territory: updateEvolutionTerritory,
                    period: updateEvolutionPeriod,
                    total_population: updateEvolutionTotalPopulation,
                    man: updateEvolutionMan,
                    woman: updateEvolutionWoman,
                    under_sixteen_years: updateEvolutionUndersixteenyears,
                    from_sixteen_to_sixty_four_years: updateEvolutionSixteensixtyfouryears,
                    sixty_five_and_over: updateEvolutionSixtyfiveoveryears
                })
            });
            const status = await res.status;
            resultStatus = status;
            if(status==200){
                getEvolution_dato();
                mensajeUsuario = "Se ha actualizado el dato";
            }else if(status==400){
                mensajeUsuario = "Los datos introducidos no son válidos";
            }else{
                mensajeUsuario = "No se ha podido actualizar el dato";
            }       
        }

    </script>

    <h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 60px;">Evolution Cambios</h1>
      
    {#if mensajeUsuario !=""}
        <h2 style="color: red; text-align: center; font-family:Arial, Helvetica, sans-serif">{mensajeUsuario}</h2>
    {/if}

    <Table striped>
        <thead>
          <tr>
            <th style="text-decoration: underline;">Territorio:</th>
            <th style="text-decoration: underline;">Periodo:</th>
            <th style="text-decoration: underline;">Población Total:</th>
            <th style="text-decoration: underline;">Hombres:</th>
            <th style="text-decoration: underline;">Mujeres:</th>
            <th style="text-decoration: underline;">Por debajo de 16 años:</th>
            <th style="text-decoration: underline;">De 16 a 64 años:</th>
            <th style="text-decoration: underline;">A partir de 65 años:</th>
            <th style="text-decoration: underline;">Acción:</th>
          </tr>
        </thead>
        <tbody>
            <tr>
                <td>{updateEvolutionTerritory}</td>
                <td>{updateEvolutionPeriod}</td>
                <td><input bind:value={updateEvolutionTotalPopulation}></td>
                <td><input bind:value={updateEvolutionMan}></td>
                <td><input bind:value={updateEvolutionWoman}></td>
                <td><input bind:value={updateEvolutionUndersixteenyears}></td>
                <td><input bind:value={updateEvolutionSixteensixtyfouryears}></td>
                <td><input bind:value={updateEvolutionSixtyfiveoveryears}></td>
                <td><Button color="primary" on:click={updateEvolution}>Actualizar</Button></td>
            </tr>
        </tbody>
    </Table>
    
    {#if resultStatus != ""}
            <strong>Resultado:</strong>
        <pre>
    {"Código de estado: "+resultStatus}    
{result}
        </pre>
    {/if}