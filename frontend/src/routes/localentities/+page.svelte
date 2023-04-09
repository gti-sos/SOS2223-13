<script>
    // @ts-nocheck
    
        import { onMount } from 'svelte';
        import { dev } from '$app/localentities';
        import { Button,Table } from 'sveltestrap';

        onMount(async () => {
            getLocalentities();
        });
        
        let API = '/api/v2/localentities-stats';
        let aviso = "";

        if(dev)
            API = 'http://localhost:8080'+API
            
        let localentities = [];
        let newLocalentitiesProvince = 'province';
        let newLocalentitiesLandline = 'landline';
        let newLocalentitiesFirstName = 'first_name';
        let newLocalentitiesSecondName = 'second_name';
        let newLocalentitiesPresidentAppointmentDate = 'president_appointment_date';
        let newLocalentitiesSurfaceExtension = 'surface_extension';
        let newLocalentitiesPopulation = 'population';
        let newLocalentitiesExpense = 'expense';
        let newLocalentitiesIncome = 'income';

        let result = "";
        let resultStatus = "";
    
        async function getLocalentities () {
            resultStatus = result = "";
            const res = await fetch(API, {
                method: 'GET'
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data,null,2);
                localentities = data;
            }catch(error){
                console.log(`Error parsing result: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;	
        }

        let insertedData = [];
        async function createLocalentities (){
            resultStatus = result = "";
            const newLocalentities = {
                province: newLocalentitiesProvince,
                landline: newLocalentitiesLandline,
                first_name: newLocalentitiesFirstName,
                second_name: newLocalentitiesSecondName,
                president_appointment_date: parseInt(newLocalentitiesPresidentAppointmentDate),
                surface_extension: newLocalentitiesSurfaceExtension,
                population: newLocalentitiesPopulation,
                expense: newLocalentitiesExpense,
                income: newLocalentitiesIncome
            };

            const existingData = insertedData.find(data => 
                data.province === newLocalentitiesProvince && data.landline === newLocalentitiesLandline && data.first_name === newLocalentitiesFirstName
                    && data.second_name === newLocalentitiesSecondName && data.president_appointment_date === newLocalentitiesPresidentAppointmentDate && data.surface_extension === newLocalentitiesSurfaceExtension && 
                    data.population === newLocalentitiesPopulation && data.expense === newLocalentitiesExpense && data.income === newLocalentitiesIncome
            );

            if (existingData) {
                aviso = "Ya existe ese dato";
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
                aviso = "Se ha creado el nuevo dato introducido";
                insertedData.push(newLocalentities);
            } else if (status == 409) {
                aviso = "El dato introducido ya existe";
                getLocalentities();
            } else if (status == 400) {
                aviso = "Las propiedades introducidas no tienen un formato correcto";
                getLocalentities();
            } else {
                aviso = "No se ha podido crear el dato introducido";
                getLocalentities();
            }
        }   

        async function deleteLocalentities(localentitiesProvince, localentitiesPresidentAppointmentDate){
            resultStatus = result = "";
            const res = await fetch(API+"/"+localentitiesProvince+"/"+localentitiesPresidentAppointmentDate, {
                method: "DELETE"
            });
            const status = await res.status;
            resultStatus = status;
            if(status==200){
                getLocalentities ();
                aviso = "Recurso borrado";
            }else if(status==500){
                aviso = "Error cliente";
            }else if(status==404){
                getLocalentities ();
                aviso = "No se ha encontrado ese recurso";
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
            }else{
                aviso = "No se han podido borrar los datos";
            }			
        }
    
    
    
    
        
    </script>
    <h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 60px;">Datos Local Entities</h1>
    {#if aviso !=""}
    <h2 style="color: red; text-align: center; font-family:Arial, Helvetica, sans-serif">{aviso}</h2>
    {/if}

    <Table>
        <thead>
          <tr>
            <th>Province</th>
            <th>Landline</th>
            <th>First Name</th>
            <th>Second Name</th>
            <th>President Appointment Date</th>
            <th>Surface Extension</th>
            <th>Population</th>
            <th>Expense</th>
            <th>Income</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            <td><input bind:value={newLocalentitiesProvince}></td>
            <td><input bind:value={newLocalentitiesLandline}></td>
            <td><input bind:value={newLocalentitiesFirstName}></td>
            <td><input bind:value={newLocalentitiesSecondName}></td>
            <td><input bind:value={newLocalentitiesPresidentAppointmentDate}></td>
            <td><input bind:value={newLocalentitiesSurfaceExtension}></td>
            <td><input bind:value={newLocalentitiesPopulation}></td>
            <td><input bind:value={newLocalentitiesExpense}></td>
            <td><input bind:value={newLocalentitiesIncome}></td>

            <td><Button on:click={createLocalentities}>Create</Button></td>
           

        {#each localentities as loen}
          <tr>
            <td>{loen.province}</td>
            <td><a href="/localentities-stats/{loen.province}/{loen.president_appointment_date}">{loen.province}</a></td>

            <td>{loen.landline}</td>
            <td>{loen.first_name}</td>
            <td>{loen.second_name}</td>
            <td>{loen.president_appointment_date}</td>
            <td>{loen.surface_extension}</td>
            <td>{loen.population}</td>
            <td>{loen.expense}</td>
            <td>{loen.income}</td>

            <td><Button on:click={deleteLocalentities(loen.province, loen.president_appointment_date)}>Borrar</Button></td>
           
          </tr>
        {/each}

        <td><Button on:click={deleteLocalentitiesAll}>Delete all</Button></td>
          
        </tbody>
    </Table>


    {#if resultStatus != ""}
    <p>
        <strong>Número de datos: {localentities.length}</strong>
    </p>
    <strong>Result:</strong>
    <pre>
{"Código de estado: "+resultStatus}
{result}
    </pre>
{/if}