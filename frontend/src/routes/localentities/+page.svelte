<script>
    // @ts-nocheck
    
        import { onMount } from 'svelte';
        import { dev } from '$app/environment';
        import { Button,Table, ButtonToolbar} from 'sveltestrap';
        import { Pagination, PaginationItem, PaginationLink } from 'sveltestrap';


        onMount(async () => {
            getLocalentities();
        });
        
        let API = '/api/v2/localentities';
        let aviso = "";

        if(dev)
            API = 'http://localhost:8080'+API
            
        let localentities = [];
        let newLocalentitiesProvince = '';
        let newLocalentitiesLandline = '';
        let newLocalentitiesFirstName = '';
        let newLocalentitiesSecondName = '';
        let newLocalentitiesPresidentAppointmentDate = '';
        let newLocalentitiesSurfaceExtension = '';
        let newLocalentitiesPopulation = '';
        let newLocalentitiesExpense = '';
        let newLocalentitiesIncome = '';


        let result;
        let resultStatus;
        //filtro
        let filtro = "";
        let from = "";
        let to = "";
        let province = "";
        let landline = "";
        let first_name = "";
        let second_name = "";
        let president_appointment_date = "";
        let surface_extension_under = "";
        let surface_extension_over = "";
        let population_under = "";
        let population_over = "";
        let expense_under = "";
        let expense_over = "";
        let income_over = "";
        let income_under = "";
        let showModal = false;

    

        async function loadData() {
            resultStatus = result = "";
            const res = await fetch(API+'/loadInitialData', {
                method: 'GET'
            });
            const status = await res.status;
            resultStatus = status;
            if(status==200){
                aviso = "Se han insertado los datos de nuevo";
                setTimeout(() => {aviso = '';}, 3000);
                getLocalentities();
            }else{
                aviso = "No se han podido insertar los datos de nuevo";
                setTimeout(() => {aviso = '';}, 3000);
            }	

        }

        async function getLocalentities () {
            resultStatus = result = "";
            const res = await fetch(API+"?offset=0&limit=10", {
                method: 'GET'
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data,null,2);
                localentities = data;
            }catch(error){
                console.log(`Error al parsear el resulado: ${error}`);
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
                localentities = data;
            }catch(error){
                console.log(`Error al parsear el resulado: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
        }


        let insertedData = [];
        async function createLocalentities (){
            resultStatus = result = "";
            const newLocalentities = {
                province: newLocalentitiesProvince,
                landline: parseInt(newLocalentitiesLandline),
                first_name: newLocalentitiesFirstName,
                second_name: newLocalentitiesSecondName,
                president_appointment_date: parseInt(newLocalentitiesPresidentAppointmentDate),
                surface_extension: parseInt(newLocalentitiesSurfaceExtension),
                population: parseInt(newLocalentitiesPopulation),
                expense: parseInt(newLocalentitiesExpense),
                income: parseInt(newLocalentitiesIncome)
            };

            const existingData = insertedData.find(data => 
                data.province === newLocalentitiesProvince && data.landline === newLocalentitiesLandline && data.first_name === newLocalentitiesFirstName
                    && data.second_name === newLocalentitiesSecondName && data.president_appointment_date === newLocalentitiesPresidentAppointmentDate && data.surface_extension === newLocalentitiesSurfaceExtension && 
                    data.population === newLocalentitiesPopulation && data.expense === newLocalentitiesExpense && data.income === newLocalentitiesIncome
            );

            if (existingData) {
                aviso = "Ya existe ese dato";
                setTimeout(() => {aviso = '';}, 3000);
                return;
            }

            const res = await fetch(API, {
                method: 'POST',
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(
                    newLocalentities
                )     
            });	

            const status = await res.status;
            resultStatus = status;
            if (status == 201) {
                getLocalentities();
                aviso = "Se ha creado el nuevo dato";
                setTimeout(() => {aviso = '';}, 3000);
                insertedData.push(newLocalentities);
            } else if (status == 409) {
                aviso = "El dato ya existe";
                setTimeout(() => {aviso = '';}, 3000);
            } else if (status == 400) {
                aviso = "Las propiedades introducidas no tienen un formato correcto";
                setTimeout(() => {aviso = '';}, 3000);
            } else {
                aviso = "No se ha podido crear el dato introducido";
                setTimeout(() => {aviso = '';}, 3000);
            }
        }   

        async function deleteLocalentities(localentitiesProvince, localentitiesPresident){
            resultStatus = result = "";
            const res = await fetch(API+"/"+localentitiesProvince+"/"+localentitiesPresident, {
                method: "DELETE"
            });
            const status = await res.status;
            resultStatus = status;
            if(status==200){
                getLocalentities();
                aviso = "El dato ha borrado correctamente";
                setTimeout(() => {aviso = '';}, 3000);
            }else if(status==500){
                aviso = "Error cliente";
                setTimeout(() => {aviso = '';}, 3000);
            }else if(status==404){
                aviso = "No se ha encontrado ese recurso";
                setTimeout(() => {aviso = '';}, 3000);
            }
        }


        async function deleteLocalentitiesAll () {
            resultStatus = result = "";
            const res = await fetch(API, {
                method: 'DELETE'
            });
            const status = await res.status;
            resultStatus = status;
            if(status==200 || status == 204){
                await getLocalentities();
                aviso = "Se han borrado correctamente los datos";
                setTimeout(() => {aviso = '';}, 3000);
            }else{
                aviso = "No se han podido borrar los datos";
                setTimeout(() => {aviso = '';}, 3000);
            }			
        }
    
        async function getLocalentitiesFiltrado(){
            const consulta = {}; 
            if (province) { 
                consulta.province = province; 
            }
            if (president_appointment_date) { 
                consulta.president_appointment_date = president_appointment_date; 
            }
            if (from) { 
                consulta.from = from; 
            }
            if (to) { 
                consulta.to = to; 
            }
            if (landline) { 
                consulta.landline = landline; 
            }
            if (first_name) { 
                consulta.first_name = first_name; 
            }
            if (second_name) { 
                consulta.second_name = second_name; 
            }
            if (surface_extension_over) { 
                consulta.surface_extension_over = surface_extension_over; 
            }
            if (surface_extension_under) { 
                consulta.surface_extension_under = surface_extension_under; 
            }
            if (population_over) { 
                consulta.population_over = population_over; 
            }
            if (population_under) { 
                consulta.population_under = population_under; 
            }
            if (expense_over) { 
                consulta.expense_over = expense_over; 
            }
            if (expense_under) { 
                consulta.expense_under = expense_under; 
            }
            if (income_over) { 
                consulta.income_over = income_over;
            }
            if (income_under) { 
                consulta.income_under = income_under;
            }

   
            
            const res = await fetch(API+`?${new URLSearchParams(consulta).toString()}`, {
                method: "GET"
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                localentities = data;
            }catch(error){
                console.log(`Error al parsear el resulado: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
            if(status==200){
                aviso = "Se han cargado los datos";
                setTimeout(() => {aviso = '';}, 3000);
            }else{
                aviso = "No se han podido encontrar los datos: ";
setTimeout(() => {aviso = '';}, 3000);

            }
        }

    
    
        
</script>
    <h1 style="text-align: center; font-family:'Monaco', monospace, serif; font-size: 60px;">Datos Entidades Locales</h1>
    <h1 class="botones">
        <ButtonToolbar>
            <Button color="success" on:click={loadData}>Cargar Datos Iniciales</Button>
            <Button color="danger" on:click={deleteLocalentitiesAll}>Borrar Datos</Button>

        </ButtonToolbar>
    </h1>
    {#if aviso !=""}
    <h2 style="color: red; text-align: center; font-family:Arial, Helvetica, sans-serif">{aviso}</h2>
    
    {/if}

<table>
    <tr>
    <label>
        Desde:
        <input bind:value={from} type="text" />
      </label>
      
      <label>
        Hasta:
        <input bind:value={to} type="text" />
    </label>
    <label>
        Provincia:
        <input bind:value={province} type="text" />
      </label>

      <label>
        Teléfono:
        <input bind:value={landline} type="text" />
    </label>
    <label>
        Nombre:
        <input bind:value={first_name} type="text" />
      </label>
    </tr>
    <tr>
 
      <label>
        Apellidos:
        <input bind:value={second_name} type="text" />
    </label>
    <label>
        Fecha nombramiento presidente:
        <input bind:value={president_appointment_date} type="text" />
      </label>
      
      <label>
        Extensión menor o igual que:
        <input bind:value={surface_extension_under} type="text" />
    </label>
    <label>
        Extensión mayor o igual que:
        <input bind:value={surface_extension_over} type="text" />
      </label>
      
      <label>
        Población menor o igual que:
        <input bind:value={population_under} type="text" />
    </label>
    </tr>
    <tr>

    <label>
        Población mayor o igual que:
        <input bind:value={population_over} type="text" />
      </label>
      
      <label>
        Gastos menor o igual que:
        <input bind:value={expense_under} type="text" />
    </label>
    <label>
        Gastos mayor o igual que:
        <input bind:value={expense_over} type="text" />
      </label>
      
      <label>
        Ingresos menor o igual que:
        <input bind:value={income_under} type="text" />
    </label>
    <label>
        Ingresos mayor o igual que:
        <input bind:value={income_over} type="text" />
      </label>

    </tr>

    </table>

    <Button color = "primary" on:click={getLocalentitiesFiltrado}>Filtrar</Button>
    
    


    <strong style="margin: 10px;">Datos que se muestran: {localentities.length}</strong>

    <Table striped>
        <thead>
          <tr>
            <th>Provincia</th>
            <th>Teléfono</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Fecha nombramiento presidente</th>
            <th>Extensión</th>
            <th>Población</th>
            <th>Gastos</th>
            <th>Ingresos</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            <td><input placeholder="Provincia" bind:value={newLocalentitiesProvince}></td>
            <td><input placeholder="Teléfono" bind:value={newLocalentitiesLandline}></td>
            <td><input placeholder="Nombre" bind:value={newLocalentitiesFirstName}></td>
            <td><input placeholder="Apellidos" bind:value={newLocalentitiesSecondName}></td>
            <td><input placeholder="Fecha Nombramiento Presidente" bind:value={newLocalentitiesPresidentAppointmentDate}></td>
            <td><input placeholder="Extensión" bind:value={newLocalentitiesSurfaceExtension}></td>
            <td><input placeholder="Población" bind:value={newLocalentitiesPopulation}></td>
            <td><input placeholder="Gastos" bind:value={newLocalentitiesExpense}></td>
            <td><input placeholder="Ingresos" bind:value={newLocalentitiesIncome}></td>

            <td><Button color="success" on:click={createLocalentities}>Crear</Button></td>
           

        {#each localentities as localentities}
          <tr>
            <td>{localentities.province}</td>
            <td>{localentities.landline}</td>
            <td>{localentities.first_name}</td>
            <td>{localentities.second_name}</td>
            <td>{localentities.president_appointment_date}</td>
            <td>{localentities.surface_extension}</td>
            <td>{localentities.population}</td>
            <td>{localentities.expense}</td>
            <td>{localentities.income}</td>

            <td><Button><a href='/localentities/{localentities.province}/{localentities.president_appointment_date}'>Editar</a></Button></td>

            <td><Button color="danger" on:click={deleteLocalentities(localentities.province, localentities.president_appointment_date)}>Borrar</Button></td>
           
          </tr>
        {/each}
          
        </tbody>
    </Table>
    <Pagination ariaLabel="Navegación">
        <PaginationItem>
          <PaginationLink on:click={() => getPaginacion(-1,10)} first href="/localentities"/>
        </PaginationItem>

        <PaginationItem>
            <PaginationLink on:click={() => getPaginacion(-1,10)} href="/localentities">1</PaginationLink>
        </PaginationItem>

        <PaginationItem>
            <PaginationLink on:click={() => getPaginacion(10,10)} href="/localentities?offset=10&limit=10">2</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink on:click={() => getPaginacion(19,10)} last href="/localentities?offset=20&limit=10" />
        </PaginationItem>
      </Pagination>
    
    <hr style="text-align: right; margin-left: 100px; margin-right: 100px;">

    <style>
        label {
          font-weight: bold;
        }
      
        input {
          width: 150px;
          padding: 0.1rem;
          border-radius: 0.25rem;
          border: 1px solid #ccc;
          font-size: 1rem;
          margin-top: 0.5rem;
        }
      
      </style>