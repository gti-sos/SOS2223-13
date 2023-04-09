<script>
    // @ts-nocheck
    
        import { onMount } from "svelte";
        import { dev } from "$app/environment";
        import { Button, Table, ButtonToolbar } from "sveltestrap";

        onMount(async () => {
            getEvolution();
        });
        
        let API = '/api/v2/evolution';
        let mensajeUsuario = "";
        
        if(dev)
            API = 'http://localhost:8080'+API
            
        let evolutions = [];
        let newEvolutionPeriod = 'period';
        let newEvolutionTerritory = 'territory';
        let newEvolutionTotalPopulation = 'total_population';
        let newEvolutionMan = 'man';
        let newEvolutionWoman = 'woman';
        let newEvolutionUndersixteenyears = 'under_sixteen_years';
        let newEvolutionSixteensixtyfouryears = 'from_sixteen_to_sixty_four_years';
        let newEvolutionSixtyfiveoveryears = 'sixty_five_and_over';
    
        let result = "";
        let resultStatus = "";

        async function loadData() {
            resultStatus = result = "";
            const res = await fetch(API+'/loadInitialData', {
                method: 'GET'
            });
            const status = await res.status;
            resultStatus = status;
            if(status==201){
                getEvolution(); 
            }	

}
    
        async function getEvolution () {
            resultStatus = result = "";
            const res = await fetch(API, {
                method: 'GET'
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data,null,2);
                evolutions = data;
            }catch(error){
                console.log(`Error parsing result: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
        }

        let insertedData = [];
        async function createEvolution (){
            resultStatus = result = "";
            const newEvolution = {
                period: parseInt(newEvolutionPeriod),
                territory: newEvolutionTerritory,
                total_population: parseInt(newEvolutionTotalPopulation),
                man: parseInt(newEvolutionMan),
                woman: parseInt(newEvolutionWoman),
                under_sixteen_years: parseInt(newEvolutionUndersixteenyears),
                from_sixteen_to_sixty_four_years: parseInt(newEvolutionSixteensixtyfouryears),
                sixty_five_and_over: parseInt(newEvolutionSixtyfiveoveryears)
            };
            // Comprobar si el nuevo dato ya ha sido insertado previamente
            const existingData = insertedData.find(data => 
                data.period === newEvolutionPeriod && data.territory === newEvolutionTerritory && data.total_population === newEvolutionTotalPopulation
                    && data.man === newEvolutionMan && data.woman === newEvolutionWoman && data.under_sixteen_years === newEvolutionUndersixteenyears && 
                    data.from_sixteen_to_sixty_four_years === newEvolutionSixteensixtyfouryears && data.sixty_five_and_over === newEvolutionSixtyfiveoveryears
            );

            if (existingData) {
                mensajeUsuario = "Ya existe ese dato";
                return;
            }

            const res = await fetch(API, {
                method: 'POST',
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(
                    newEvolution
                )     
            });
            const status = await res.status;
            resultStatus = status;
            if (status == 201) {
                getEvolution();
                mensajeUsuario = "Se ha creado el nuevo dato introducido";
                insertedData.push(newEvolution);
            } else if (status == 409) {
                mensajeUsuario = "El dato introducido ya existe";
                getEvolution();
            } else if (status == 400) {
                mensajeUsuario = "Las propiedades introducidas no tienen un formato correcto";
                getEvolution();
            } else {
                mensajeUsuario = "No se ha podido crear el dato introducido";
                getEvolution();
            }
        }   

        async function deleteEvolution(evolutionTerritory,evolutionPeriod){
            resultStatus = result = "";
            const res = await fetch(API+"/"+evolutionTerritory+"/"+evolutionPeriod, {
                method: "DELETE"
            });
            const status = await res.status;
            resultStatus = status;
            if(status==200){
                getEvolution ();
                mensajeUsuario = "Recurso borrado";
            }else if(status==500){
                mensajeUsuario = "Error cliente";
            }else if(status==404){
                getEvolution ();
                mensajeUsuario = "No se ha encontrado ese recurso";
            }
        }

        async function deleteEvolutionAll () {
            resultStatus = result = "";
            const res = await fetch(API, {
                method: 'DELETE'
            });
            const status = await res.status;
            resultStatus = status;
            if(status==200 || status == 204){
                await getEvolution();
                mensajeUsuario = "Se han borrado correctamente los datos";
            }else{
                mensajeUsuario = "No se han podido borrar los datos";
            }		
        }
    
    
    
    
        
    
    </script>
    <h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 60px;">Datos Evolutions</h1>
    <h1 class="botones">
        <ButtonToolbar>
            <Button outline on:click={loadData}>Cargar Datos Iniciales</Button>
        </ButtonToolbar>
    </h1>
    {#if mensajeUsuario !=""}
    <h2 style="color: red; text-align: center; font-family:Arial, Helvetica, sans-serif">{mensajeUsuario}</h2>
    {/if}
    <Table striped>
        <thead>
          <tr>
            <th>Periodo</th>
            <th>Territorio</th>
            <th>Total Población</th>
            <th>Hombres</th>
            <th>Mujeres</th>
            <th>Menores 16 años</th>
            <th>De 16 a 64 años</th>
            <th>A partir de 65 años</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            <td><input bind:value={newEvolutionPeriod}></td>
            <td><input bind:value={newEvolutionTerritory}></td>
            <td><input bind:value={newEvolutionTotalPopulation}></td>
            <td><input bind:value={newEvolutionMan}></td>
            <td><input bind:value={newEvolutionWoman}></td>
            <td><input bind:value={newEvolutionUndersixteenyears}></td>
            <td><input bind:value={newEvolutionSixteensixtyfouryears}></td>
            <td><input bind:value={newEvolutionSixtyfiveoveryears}></td>
            <td><Button color="success" on:click={createEvolution}>Crear</Button></td>
           

        {#each evolutions as evolution}
          <tr>
            <td>{evolution.period}</td>
            <td>{evolution.territory}</td>
            <td>{evolution.total_population}</td>
            <td>{evolution.man}</td>
            <td>{evolution.woman}</td>
            <td>{evolution.under_sixteen_years}</td>
            <td>{evolution.from_sixteen_to_sixty_four_years}</td>
            <td>{evolution.sixty_five_and_over}</td>
            <td><Button><a href='/evolution/{evolution.territory}/{evolution.period}'>Editar</a></Button></td>
            <td><Button color="danger"on:click={deleteEvolution(evolution.territory,evolution.period)}>Borrar</Button></td>
           
          </tr>
        {/each}

        <Button color="danger" on:click={deleteEvolutionAll}>Borrar Datos</Button>
          
        </tbody>
    </Table>


  {#if resultStatus != ""}
        <p>
            <strong>Número de datos: {evolutions.length}</strong>
        </p>
        <strong>Resultado:</strong>
        <pre>
    {"Código de estado: "+resultStatus}
{result}
        </pre>
    {/if}