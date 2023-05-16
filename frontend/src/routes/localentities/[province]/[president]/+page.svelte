<script> 
    // @ts-nocheck
    
        import { onMount } from 'svelte';
        import { dev } from '$app/environment';
        import { Button,Table } from 'sveltestrap';
        import { page } from "$app/stores";

        onMount(async () => {
            getLocalentities_dato();
        });
        
        let aviso = "";
        let province = $page.params.province;
        let president = $page.params.president;
        let API = "/api/v2/localentities/"+ province + '/' + president;

        if(dev)
            API = 'http://localhost:8080'+API
            
        let updateLocalentitiesProvince = province;
        let updateLocalentitiesLandline = "landline";
        let updateLocalentitiesFirstName = "first_name";
        let updateLocalentitiesSecondName = "second_name";
        let updateLocalentitiesPresident = president;
        let updateLocalentitiesSurfaceExtension = "surface_extension";
        let updateLocalentitiesPopulation = "population";
        let updateLocalentitiesExpense = "expense";
        let updateLocalentitiesIncome = "income";

        let result = "";
        let resultStatus = "";
    
        async function getLocalentities_dato () {
            resultStatus = result = "";
            const res = await fetch(API, {
                method: 'GET'
            });
            try{
                const data = await res.json();
                console.log(data);
                result = JSON.stringify(data,null,2);
                updateLocalentitiesProvince = data.province;
                updateLocalentitiesLandline = data.landline;
                updateLocalentitiesFirstName = data.first_name;
                updateLocalentitiesSecondName = data.second_name;
                updateLocalentitiesPresident = data.president_appointment_date;
                updateLocalentitiesSurfaceExtension = data.surface_extension;
                updateLocalentitiesPopulation = data.population;
                updateLocalentitiesExpense = data.expense;
                updateLocalentitiesIncome = data.income;

            }catch(error){
                console.log(`Error al parsear el resultado: ${error}`);
            }

            const status = await res.status;
            resultStatus = status;	
            if(status==404){
                aviso = `La ruta solicitada "${province}/${president}" no existe`;
            }
        }

        async function updateLocalentities (){
            resultStatus = result = "";
            const res = await fetch(API, {
                method: "PUT",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    province: updateLocalentitiesProvince,
                    landline: updateLocalentitiesLandline,
                    first_name: updateLocalentitiesFirstName,
                    second_name: updateLocalentitiesSecondName,
                    president: updateLocalentitiesPresident,
                    surface_extension: updateLocalentitiesSurfaceExtension,
                    population: updateLocalentitiesPopulation,
                    expense: updateLocalentitiesExpense,
                    income: updateLocalentitiesIncome

                })
            });
           
            const status = await res.status;
            resultStatus = status;
            if(status==200){
                getLocalentities_dato();
                aviso = "Se ha actualizado el dato";
            }else if(status==400){ 
                aviso = "Los datos introducidos no son válidos";
            }else{
                aviso = "No se ha podido actualizar el dato";
            }       
        }
    
    
        
    
    </script>

    <h1 style="text-align: center; font-family:'Monaco', monospace, serif; font-size: 60px;">Local Entities Cambios</h1>
      
    {#if aviso !=""}
        <h2 style="color: red; text-align: center; font-family:Arial, Helvetica, sans-serif">{aviso}</h2>
    {/if}

    <Table striped>
        <thead>
          <tr>
            <th style="text-decoration: underline;">Provincia</th>
            <th style="text-decoration: underline;">Teléfono</th>
            <th style="text-decoration: underline;">Nombre</th>
            <th style="text-decoration: underline;">Apellido</th>
            <th style="text-decoration: underline;">Fecha nombramiento presidente</th>
            <th style="text-decoration: underline;">Superficie</th>
            <th style="text-decoration: underline;">Poblacion</th>
            <th style="text-decoration: underline;">Gastos</th>
            <th style="text-decoration: underline;">Ingresos</th>
            <th style="text-decoration: underline;">Acción</th>
          </tr>
        </thead>
        <tbody>
            <tr>
                <td>{updateLocalentitiesProvince}</td>
                <td><input bind:value={updateLocalentitiesLandline}></td>
                <td><input bind:value={updateLocalentitiesFirstName}></td>
                <td><input bind:value={updateLocalentitiesSecondName}></td>
                <td>{updateLocalentitiesPresident}</td>
                <td><input bind:value={updateLocalentitiesSurfaceExtension}></td>
                <td><input bind:value={updateLocalentitiesPopulation}></td>
                <td><input bind:value={updateLocalentitiesExpense}></td>
                <td><input bind:value={updateLocalentitiesIncome}></td>

                <td><Button color="primary" on:click={updateLocalentities}>Actualiza</Button></td>
            </tr>
        </tbody>
    </Table>

    <div style="justify-content: center; display:flex;">
        <Button color="secondary" href= "/localentities">Atrás</Button>
    </div>