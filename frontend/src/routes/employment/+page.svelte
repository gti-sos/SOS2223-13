<svelte:head>
    <title>SOS2223-13-Empleos</title>
</svelte:head>
<script>
    // @ts-nocheck
    
        import { onMount } from 'svelte';
        import { dev } from '$app/environment';
        import { Button,ButtonToolbar,Table } from 'sveltestrap';
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

        let from = "";
        let to = "";
        let year = "";
        let period = "";
        let date = "";
        let region = "";
        let employed_person = "";
        let inactive_person = "";
        let unemployed_person = "";

    
        async function getEmployments(){
            resultStatus = result = "";
            const res = await fetch(API+"?offset=-1&limit=10", {
            method: "GET"
            });
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

        async function getPaginacion(offsetFilter,limitFilter){
            resultStatus = result = "";
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
                setTimeout(() => {advertencia = '';}, 3000);
            }else if(status==400){
                getEmployments ();
                advertencia = "Falta por insertar alguno/s de los campos";
                setTimeout(() => {advertencia = '';}, 3000);
            }else if(status==409){
                getEmployments ();
                advertencia = "El recurso ya existe";
                setTimeout(() => {advertencia = '';}, 3000);
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
                setTimeout(() => {advertencia = '';}, 3000);
            }else if(status==500){
                advertencia = "Error cliente";
                setTimeout(() => {advertencia = '';}, 3000);
            }else if(status==404){
                getEmployments ();
                advertencia = "No se ha encontrado ese recurso";
                setTimeout(() => {advertencia = '';}, 3000);
            }
        }

        async function deleteEmploymentAll(){
            resultStatus = result = "";
            const res = await fetch(API, {
                method: "DELETE"
            });
            const status = await res.status;
            resultStatus = status;
            if(status==200 || status == 204){
                await getEmployments();
                advertencia = "Se han borrado correctamente los datos";
                setTimeout(() => {advertencia = '';}, 3000);
            }else{
                advertencia = "No se han podido borrar los datos";
                setTimeout(() => {advertencia = '';}, 3000);
            }
        }

        async function getEmploymentFilter(){
            const consulta = {}; // crea un objeto vacío para los otros campo
            if (from) { // comprueba si from tiene un valor
                consulta.from = from; // agrega la propiedad from al objeto consulta
            }
            if (to) { // comprueba si to tiene un valor
                consulta.to = to; // agrega la propiedad to al objeto consulta
            }
            if (year) { // comprueba si year tiene un valor
                consulta.year = year; // agrega la propiedad year al objeto consulta
            }
            if (period) { // comprueba si period tiene un valor
                consulta.period = period; // agrega la propiedad period al objeto consulta
            }
            if (date) { // comprueba si date tiene un valor
                consulta.date = date; // agrega la propiedad date al objeto consulta
            }
            if (region) { // comprueba si region tiene un valor
                consulta.region = region; // agrega la propiedad region al objeto consulta
            }
            if (employed_person) { // comprueba si employed_person tiene un valor
                consulta.employed_person = employed_person; // agrega la propiedad employed_person al objeto consulta
            }
            if (inactive_person) { // comprueba si inactive_person tiene un valor
                consulta.inactive_person = inactive_person; // agrega la propiedad inactive_person al objeto consulta
            }
            if (unemployed_person) { // comprueba si unemployed_person tiene un valor
                consulta.unemployed_person = unemployed_person; // agrega la propiedad unemployed_person al objeto consulta
            }
            //Realiza la solicitud GET al endpoint /api/v2/employment con los datos de la consulta que se le hayan solicitado
            console.log(new URLSearchParams(consulta).toString());
            const res = await fetch(API+`?${new URLSearchParams(consulta).toString()}`, {
                method: "GET"
            });
            
            try{
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                employments = data;
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
            if(status==200){
                advertencia = "Datos solicitados";
                setTimeout(() => {advertencia = '';}, 3000);
            }else{
                advertencia = "No se han podido encontrar los datos requeridos";
                setTimeout(() => {advertencia = '';}, 3000);
            }
        }


        
    
    
    
    
        
    
    </script>
    <h1> Empleos</h1>
    {#if advertencia !=""}
    <h2 style="color: red; text-align: center; font-family:Arial, Helvetica, sans-serif">{advertencia}</h2>
    {/if}

    <div class = "filtros">

        
      <label> Desde: <input bind:value={from} type="text" /></label>
      <label> Hasta: <input bind:value={to} type="text" /></label>
      <label> Año: <input bind:value={year} type="text" /></label>
      <label> Periodo: <input bind:value={period} type="text" /></label>
      <label> Periodo y año: <input bind:value={date} type="text" /></label>
      <label> Region: <input bind:value={region} type="text" /></label>
      <label> Persona empleada (>=): <input bind:value={employed_person} type="text" /></label>
      <label> Persona inactiva (>=): <input bind:value={inactive_person} type="text" /></label>
      <label> Persona desempleada (>=): <input bind:value={unemployed_person} type="text" /></label>
  
    <Button color = "primary" on:click={getEmploymentFilter}>Filtrar</Button>

    </div>

    <b style="margin: 1px;">Número de datos: {employments.length}</b>


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
        <tr class="datosEmpleo">
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

          
        </tbody>
    </Table>

    <h1 class="boton borrado todo">
        <ButtonToolbar>
            <Button color="danger" on:click={deleteEmploymentAll}>Borrar todos</Button>
        </ButtonToolbar>
    </h1>

    <Pagination ariaLabel="Page navigation example">
        <PaginationItem>
          <PaginationLink on:click={() => getPaginacion(-1,10)} first href="/employment"/>
        </PaginationItem>
        <!--<PaginationItem disabled>
          <PaginationLink previous href="#" />
        </PaginationItem> -->
        <PaginationItem>
            <PaginationLink on:click={() => getPaginacion(-1,10)} href="/employment">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
            <PaginationLink on:click={() => getPaginacion(9,10)} href="/employment?offset=10&limit=10">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
            <PaginationLink on:click={() => getPaginacion(19,10)} href="/employment?offset=10&limit=10">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
            <PaginationLink on:click={() => getPaginacion(29,10)} href="/employment?offset=10&limit=10">4</PaginationLink>
        </PaginationItem>
        <!-- <PaginationItem>
          <PaginationLink next href="#" />
        </PaginationItem> -->
        <PaginationItem>
          <PaginationLink on:click={() => getPaginacion(29,10)} last href="/employment?offset=10&limit=10" />
        </PaginationItem>
      </Pagination>

     


    