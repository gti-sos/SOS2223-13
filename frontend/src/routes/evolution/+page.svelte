<script>
    // @ts-nocheck
    
        import { onMount } from "svelte";
        import { dev } from "$app/environment";
        import { Button, Table, ButtonToolbar } from "sveltestrap";
        import { Pagination, PaginationItem, PaginationLink } from 'sveltestrap';

        onMount(async () => {
            getEvolution();
        });
        
        let API = '/api/v2/evolution';
        let mensajeUsuario = "";
        let mensajePaginacion = "";
        
        if(dev)
            API = 'http://localhost:8080'+API
            
        let evolutions = [];
        let newEvolutionPeriod = '';
        let newEvolutionTerritory = '';
        let newEvolutionTotalPopulation = '';
        let newEvolutionMan = '';
        let newEvolutionWoman = '';
        let newEvolutionUndersixteenyears = '';
        let newEvolutionSixteensixtyfouryears = '';
        let newEvolutionSixtyfiveoveryears = '';
    
        let result = "";
        let resultStatus = "";
        let filtro = "";
        let offsetFiltro = "";
        let limitFiltro = "";

        async function loadData() {
            resultStatus = result = "";
            const res = await fetch(API+'/loadInitialData', {
                method: 'GET'
            });
            const status = await res.status;
            resultStatus = status;
            if(status==200){
                mensajeUsuario = "Se han insertado los datos de nuevo";
                getEvolution();
            }else{
                mensajeUsuario = "No se han podido insertar los datos de nuevo";
            }

}
    
        async function getEvolution(){
            resultStatus = result = "";
            const res = await fetch(API+"?offset=0&limit=10", {
            method: "GET"
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                evolutions = data;
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
        }

        async function getPaginacion(offsetFiltro,limitFiltro){ //
            resultStatus = result = "";
            const res = await fetch(API+"?offset="+offsetFiltro+"&limit="+limitFiltro, {
                method: "GET"
            });
            console.log(API+"?offset="+offsetFiltro+"&limit="+limitFiltro);
            try{
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                evolutions = data;
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
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
            } else if (status == 400) {
                mensajeUsuario = "Las propiedades introducidas no tienen un formato correcto";
            } else {
                mensajeUsuario = "No se ha podido crear el dato introducido";
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
                getEvolution();
                mensajeUsuario = "Recurso borrado";
            }else if(status==500){
                mensajeUsuario = "Error cliente";
            }else if(status==404){
                mensajeUsuario = "No se ha encontrado ese recurso";
            }
        }

        async function deleteEvolutionAll(){
            resultStatus = result = "";
            const res = await fetch(API, {
                method: "DELETE"
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

        async function getEvolutionFiltrado(){
            const res = await fetch(API+filtro, {
                method: "GET"
            });
            console.log(API+filtro);
            try{
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                evolutions = data;
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
            if(status==200){
                mensajeUsuario = "Ahí llevas los datos";
            }else{
                mensajeUsuario = "No se han podido encontrar los datos";
            }
        }


    
    

    
        
    
    </script>
    <h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 40px;">Datos Evolución</h1>
    <h1 class="botones">
        <ButtonToolbar>
            <Button color="success" on:click={loadData}>Cargar Datos Iniciales</Button>
            <Button color="danger" on:click={deleteEvolutionAll}>Borrar Datos</Button>
        </ButtonToolbar>
    </h1>
    {#if mensajeUsuario !=""}
    <h2 style="color: red; text-align: center; font-family:Arial, Helvetica, sans-serif">{mensajeUsuario}</h2>
    {/if}

    <div class = "filtros">
        <div class = "filtroProvincia">
            <input placeholder="Filtra aquí" bind:value={filtro}>
            <Button color = "primary" on:click={getEvolutionFiltrado}>Filtrar</Button>
        </div>
    </div>

    <strong style="margin: 10px;">Número de datos: {evolutions.length}</strong>

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
            <td><input placeholder="Periodo"bind:value={newEvolutionPeriod}></td>
            <td><input placeholder="Territorio"bind:value={newEvolutionTerritory}></td>
            <td><input placeholder="Población Total"bind:value={newEvolutionTotalPopulation}></td>
            <td><input placeholder="Hombres"bind:value={newEvolutionMan}></td>
            <td><input placeholder="Mujeres"bind:value={newEvolutionWoman}></td>
            <td><input placeholder="Menor que 16 años"bind:value={newEvolutionUndersixteenyears}></td>
            <td><input placeholder="Desde 16 a 64 años"bind:value={newEvolutionSixteensixtyfouryears}></td>
            <td><input placeholder="A partir de 65 años"bind:value={newEvolutionSixtyfiveoveryears}></td>
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
          
        </tbody>
    </Table>

    <Pagination ariaLabel="Page navigation example">
        <PaginationItem>
          <PaginationLink on:click={() => getPaginacion(0,10)} first href="/evolution"/>
        </PaginationItem>
        <!--<PaginationItem disabled>
          <PaginationLink previous href="#" />
        </PaginationItem> -->
        <PaginationItem>
            <PaginationLink on:click={() => getPaginacion(0,10)} href="/evolution">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
            <PaginationLink on:click={() => getPaginacion(9,10)} href="/evolution?offset=10&limit=10">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
            <PaginationLink on:click={() => getPaginacion(19,10)} href="/evolution?offset=20&limit=10">3</PaginationLink>
        </PaginationItem>
        <!-- <PaginationItem>
          <PaginationLink next href="#" />
        </PaginationItem> -->
        <PaginationItem>
          <PaginationLink on:click={() => getPaginacion(19,10)} last href="/evolution?offset=20&limit=10" />
        </PaginationItem>
      </Pagination>

    <style>
        .filtros{
            display: flex;
            justify-content: center;
        }
        
    </style>
    
    <hr style="text-align: right; margin-left: 100px; margin-right: 100px;">

    {#if mensajePaginacion !=""}
    <h2 style="color: red; text-align: center; font-family:Arial, Helvetica, sans-serif">{mensajePaginacion}</h2>
    {/if}
    <p></p>
    <!-- <div style="text-align: center; display: flex; justify-content: center; flex-direction: row; gap: 15px;">
        <td><input placeholder="A partir de: " bind:value={offsetFiltro}></td>
        <td><input placeholder="Límite" bind:value={limitFiltro}></td>
        <td><Button style="center" color="primary" on:click={getPaginacion}>Paginación</Button></td>
    </div>-->
    <p></p>

    