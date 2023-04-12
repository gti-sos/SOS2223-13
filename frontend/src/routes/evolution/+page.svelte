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

        let anyoInicio = "";
        let anyoFinal = "";
        let filtroProvincia = "";
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

        async function getPaginacion(){ //
            resultStatus = result = "";
            if(offsetFiltro == "" || limitFiltro == ""){
                mensajePaginacion = "Los parámetros no pueden estar vacios";
                return;
            }else if(isNaN(offsetFiltro) || isNaN(limitFiltro)){
                mensajePaginacion = "Los parámetros no pueden ser letras";
                return;
            }else if(limitFiltro <= 0){
                mensajePaginacion = "El límite debe ser superior a 0";
                return;
            }else{
                mensajePaginacion = "Se muestran los datos correspondientes al filtro";
            }
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
                mensajeUsuario = "Recurso borrado";
            }else if(status==500){
                mensajeUsuario = "Error cliente";
            }else if(status==404){
                mensajeUsuario = "No se ha encontrado ese recurso";
            }
        }

        async function deleteEvolutionAll () {
            resultStatus = result = "";
            const res = await fetch(API, {
                method: 'DELETE'
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
            if(status==200 || status == 204){
                mensajeUsuario = "Se han borrado correctamente los datos";
            }else{
                mensajeUsuario = "No se han podido borrar los datos";
            }		
        }

        async function getEvolutionFiltroAño(){
            resultStatus = result = "";
            if(anyoFinal < anyoInicio){
                mensajeUsuario = "El año final no puede ser menor que el año de inicio";
                return;
            }else if(isNaN(anyoInicio) || isNaN(anyoFinal)){
                mensajeUsuario = "El año de inicio y el año final no pueden ser letras";
                return;
            }else if(anyoInicio == "" || anyoFinal == ""){
                mensajeUsuario = "El año de inicio y el año final no pueden estar vacios";
                return;
            }else if(evolutions.length == 0){
                mensajeUsuario = "No hay datos para mostrar";
                return;
            }else if(anyoInicio <= anyoFinal){
                mensajeUsuario = "Se muestran los datos correspondientes al filtro";
            }
            const res = await fetch(API+"?from="+anyoInicio+"&to="+anyoFinal, {
                method: "GET"
            });
            console.log(API+"?from="+anyoInicio+"&to="+anyoFinal);
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

        async function getEvolutionFiltroProvincia(){
            resultStatus = result = "";
            if(filtroProvincia == ""){
                mensajeUsuario = "La provincia no puede estar vacia";
                return;
            }else if(!isNaN(filtroProvincia)){
                mensajeUsuario = "La provincia no puede ser un número";
                return;
            }else if(evolutions.length == 0){
                mensajeUsuario = "No hay datos para mostrar";
                return;
            }else if(filtroProvincia){
                mensajeUsuario = "Se muestran los datos correspondientes al filtro";
            }
            const res = await fetch(API+"?territory="+filtroProvincia, {
                method: "GET"
            });
            console.log(API+"?territory="+filtroProvincia);
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
    
    
    
    
        
    
    </script>
    <h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 60px;">Datos Evolución</h1>
    <h1 class="botones">
        <ButtonToolbar>
            <Button color="success" on:click={loadData}>Cargar Datos Iniciales</Button>
            <Button color="danger" on:click={deleteEvolutionAll}>Borrar Datos</Button>
        </ButtonToolbar>
    </h1>
    {#if mensajeUsuario !=""}
    <h2 style="color: red; text-align: center; font-family:Arial, Helvetica, sans-serif">{mensajeUsuario}</h2>
    {/if}

    <div style="text-align: center; display: flex; justify-content: center; flex-direction: row; gap: 20px;">
        <td><input placeholder="Año de Inicio" bind:value={anyoInicio}></td>
        <td><input placeholder="Año Final" bind:value={anyoFinal}></td>
        <td><Button color="primary" on:click={getEvolutionFiltroAño}>Filtra por Año</Button></td>
        <p></p>
        <p></p>
        <p></p>
        <td><input placeholder="Provincia" bind:value={filtroProvincia}></td>
        <td><Button color="primary" on:click={getEvolutionFiltroProvincia}>Filtra por Provincia</Button></td>
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

    <!--<Pagination style="text-align: center; display: flex; justify-content: center; flex-direction: row; gap: 15px;" ariaLabel="Page navigation example">
        <PaginationItem disabled>
          <PaginationLink previous href="#" />
        </PaginationItem>
        <PaginationItem active>
          <PaginationLink href={getPaginacion}>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">5</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink next href="#" />
        </PaginationItem>
    </Pagination>-->
    <hr style="text-align: right; margin-left: 100px; margin-right: 100px;">

    {#if mensajePaginacion !=""}
    <h2 style="color: red; text-align: center; font-family:Arial, Helvetica, sans-serif">{mensajePaginacion}</h2>
    {/if}
    <p></p>
    <div style="text-align: center; display: flex; justify-content: center; flex-direction: row; gap: 15px;">
        <td><input placeholder="A partir de: " bind:value={offsetFiltro}></td>
        <td><input placeholder="Límite" bind:value={limitFiltro}></td>
        <td><Button style="center" color="primary" on:click={getPaginacion}>Paginación</Button></td>
    </div>
    <p></p>