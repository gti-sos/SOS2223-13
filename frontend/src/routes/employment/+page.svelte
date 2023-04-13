<script>
    // @ts-nocheck
    
        import { onMount } from 'svelte';
        import { dev } from '$app/environment';
        import { Button,Table } from 'sveltestrap';
        import { Pagination, PaginationItem, PaginationLink } from 'sveltestrap';

        onMount(async () => {
            getEmployments();
        });
        
        let API = '/api/v2/employment';
        let advertencia = "";
        let advertenciaPaginacion = "";
        
        if(dev)
            API = 'http://localhost:8080'+API
            
        let employments = [];
        let newEmploymentYear = 'año';
        let newEmploymentPeriod = 'periodo';
        let newEmploymentDate = 'tiempo';
        let newEmploymentRegion = 'region';
        let newEmploymentEmployedPerson = 'persona empleada';
        let newEmploymentInactivePerson = 'persona inactiva';
        let newEmploymentUnemployedPerson = 'persona desempleada';
    
        let result = "";
        let resultStatus = "";

        let anyoInit = "";
        let anyoFin = "";
        let filtroRegion = "";
        let offsetFilter = "";
        let limitFilter = "";
    
        async function getEmployments () {
            resultStatus = result = "";
            const res = await fetch(API, {
                method: 'GET'
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data,null,2);
                employments = data;
            }catch(error){
                console.log(`Error parsing result: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
            if(status==404){
                advertencia = "Ruta no encontrada"
            }else if(status==500){
                advertencia = "Error servidor"
            }	
        }

        async function getPaginacion(){ 
            resultStatus = result = "";
            if(offsetFilter == "" || limitFilter == ""){
                advertenciaPaginacion = "Los parámetros no pueden estar vacios";
                return;
            }else if(isNaN(offsetFilter) || isNaN(limitFilter)){
                advertenciaPaginacion = "Los parámetros no pueden ser letras";
                return;
            }else if(limitFilter <= 0){
                advertenciaPaginacion = "El límite debe ser superior a 0";
                return;
            }else{
                advertenciaPaginacion = "Se muestran los datos correspondientes al filtro";
            }
            const res = await fetch(API+"?offset="+offsetFilter+"&limit="+limitFilter, {
                method: "GET"
            });
            console.log(API+"?offset="+offsetFilter+"&limit="+limitFilter);
            try{
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                employments = data;
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
        }



        async function createEmployment (){
            resultStatus = result = "";
            const res = await fetch(API, {
                method: 'POST',
                headers:{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({
                    year: newEmploymentYear,
                    period: newEmploymentPeriod,
                    date: newEmploymentDate,
                    region: newEmploymentRegion,
                    employed_person: newEmploymentEmployedPerson,
                    inactive_person: newEmploymentInactivePerson,
                    unemployed_person: newEmploymentUnemployedPerson
                })     
            });
            const status = await res.status;
            resultStatus = status;
            if(status==201){
                getEmployments ();
                advertencia = "Recurso creado";
            }else if(status==400){
                getEmployments ();
                advertencia = "Falta por insertar alguno/s de los campos";
            }else if(status==409){
                getEmployments ();
                advertencia = "El recurso ya existe";
            }
    }

        async function deleteEmployment(employmentRegion,employmentYear){
            resultStatus = result = "";
            const res = await fetch(API+"/"+employmentRegion+"/"+employmentYear, {
                method: "DELETE"
            });
            const status = await res.status;
            resultStatus = status;
            if(status==200){
                getEmployments ();
                advertencia = "Recurso borrado";
            }else if(status==500){
                advertencia = "Error cliente";
            }else if(status==404){
                getEmployments ();
                advertencia = "No se ha encontrado ese recurso";
            }
        }

        async function deleteEmploymentAll () {
            resultStatus = result = "";
            const res = await fetch(API, {
                method: 'DELETE'
            });
            const status = await res.status;
            resultStatus = status;
            if(status==200 || status == 204){
                await getEmployments ();
                advertencia = "Se han borrado correctamente los datos";
            }else{
                advertencia = "No se han podido borrar los datos";
            }		
        }

        async function getEmploymentFiltroAño(){
            resultStatus = result = "";
            if(anyoFin < anyoInit){
                advertencia = "El año final no puede ser menor que el año de inicio";
                return;
            }else if(isNaN(anyoInit) || isNaN(anyoFin)){
                advertencia = "El año de inicio y el año final no pueden ser letras";
                return;
            }else if(anyoInit == "" || anyoFin == ""){
                advertencia = "El año de inicio y el año final no pueden estar vacios";
                return;
            }else if(evolutions.length == 0){
                advertencia = "No hay datos para mostrar";
                return;
            }else if(anyoInit <= anyoFin){
                advertencia = "Se muestran los datos correspondientes al filtro";
            }
            const res = await fetch(API+"?from="+anyoInit+"&to="+anyoFin, {
                method: "GET"
            });
            console.log(API+"?from="+anyoInit+"&to="+anyoFin);
            try{
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                employments = data;
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
        }

        async function getEmploymentFiltroRegion(){
            resultStatus = result = "";
            if(filtroRegion == ""){
                advertencia= "La provincia no puede estar vacia";
                return;
            }else if(!isNaN(filtroRegion)){
                advertencia = "La provincia no puede ser un número";
                return;
            }else if(employments.length == 0){
                advertencia = "No hay datos para mostrar";
                return;
            }else if(filtroRegion){
                advertencia = "Se muestran los datos correspondientes al filtro";
            }
            const res = await fetch(API+"?region="+filtroRegion, {
                method: "GET"
            });
            console.log(API+"?region="+filtroRegion);
            try{
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                employments = data;
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
        }

        async function getLimpiaFiltros(){
        resultStatus = result = "";
        if(filtroRegion != "" || anyoInit != "" || anyoFin != ""){
            filtroRegion = "";
            anyoInit = "";
            anyoFin = "";
        }
        getEvolution();
        advertencia = "";
        return;
        }
    
    
    
    
        
    
    </script>
    <h1> Empleos</h1>
    {#if advertencia !=""}
    <h2 style="color: red; text-align: center; font-family:Arial, Helvetica, sans-serif">{advertencia}</h2>
    {/if}

    <div class = "filtros">
        <div class = "filtroAño">
            <input placeholder="Año de inicio" bind:value={anyoInit}>
            <input placeholder="Año Final" bind:value={anyoFin}>
            <Button color="primary" on:click={getEmploymentFiltroAño}>Filtra por año</Button>
        </div>
        <div class = "filtroRegion">
            <input placeholder="Provincia" bind:value={filtroRegion}>
            <Button color = "primary" on:click={getEmploymentFiltroRegion}>Filtra por región</Button> 
        </div>
        <div class ="limpiarFiltros">
            <Button color="secondary" on:click={getLimpiaFiltros}>Limpiar filtros</Button>
        </div>
    </div>

    <strong style="margin: 10px;">Número de datos: {employments.length}</strong>


    <Table>
        <thead>
          <tr>
            <th>Año</th>
            <th>Periodo</th>
            <th>Tiempo</th>
            <th>Region</th>
            <th>Persona empleada</th>
            <th>Persona inactiva</th>
            <th>Persona desempleada</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
            <td><input bind:value={newEmploymentYear}></td>
            <td><input bind:value={newEmploymentPeriod}></td>
            <td><input bind:value={newEmploymentDate}></td>
            <td><input bind:value={newEmploymentRegion}></td>
            <td><input bind:value={newEmploymentEmployedPerson}></td>
            <td><input bind:value={newEmploymentInactivePerson}></td>
            <td><input bind:value={newEmploymentUnemployedPerson}></td>
            <td><Button on:click={createEmployment}>Crear</Button></td>
           

        {#each employments as employment}
          <tr>
            <td>{employment.year}</td>
            <td>{employment.period}</td>
            <td>{employment.date}</td>
            <td><a href="/employment/{employment.region}/{employment.year}">{employment.region}</a></td>
            <td>{employment.employed_person}</td>
            <td>{employment.inactive_person}</td>
            <td>{employment.unemployed_person}</td>
            <td><Button on:click={deleteEmployment(employment.region,employment.year)}>Eliminar</Button></td>
           
          </tr>
        {/each}

        <td><Button color="danger" on:click={deleteEmploymentAll}>Eliminar todo</Button></td>
          
        </tbody>
    </Table>


    