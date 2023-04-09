<script>
    // @ts-nocheck
    
        import { onMount } from 'svelte';
        import { dev } from '$app/localentities';
        import { Button,Table } from 'sveltestrap';

        onMount(async () => {
            getLocalentities();
        });
        
        let API = '/api/v1/localentities-stats';
        
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


        async function createLocalentities (){
            resultStatus = result = "";
            const res = await fetch(API, {
                method: 'POST',
                headers:{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({
                    province: newLocalentitiesProvince,
                    landline: newLocalentitiesLandline,
                    first_name: newLocalentitiesFirstName,
                    second_name: newLocalentitiesSecondName,
                    president_appointment_date: newLocalentitiesPresidentAppointmentDate,
                    surface_extension: newLocalentitiesSurfaceExtension,
                    population: newLocalentitiesPopulation,
                    expense: newLocalentitiesExpense,
                    income: newLocalentitiesIncome

                })     
            });
            const status = await res.status;
            resultStatus = status;
            if(status==201){
                getLocalentities ();
            }	
        }

        async function deleteLocalentitiesAll () {
            resultStatus = result = "";
            const res = await fetch(API, {
                method: 'DELETE'
            });
            const status = await res.status;
            resultStatus = status;
            if(status==200){
                await getLocalentities ();
            }		
        }
    
    
    
    
        
    
    </script>
    <h1>Local Entities</h1>
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
            <td>{loen.landline}</td>
            <td>{loen.first_name}</td>
            <td>{loen.second_name}</td>
            <td>{loen.president_appointment_date}</td>
            <td>{loen.surface_extension}</td>
            <td>{loen.population}</td>
            <td>{loen.expense}</td>
            <td>{loen.income}</td>
            <td>&nbsp</td>
           
          </tr>
        {/each}

        <td><Button on:click={deleteLocalentitiesAll}>Delete all</Button></td>
          
        </tbody>
    </Table>


    {#if resultStatus != ""}
        <p>
            Result:
        </p>
        <pre>
{resultStatus}
{result}
        </pre>
    {/if}