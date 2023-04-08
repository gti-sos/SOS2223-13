<script>
    // @ts-nocheck
    
        import { onMount } from 'svelte';
        import { dev } from '$app/environment';
        import { Button,Table } from 'sveltestrap';

        onMount(async () => {
            getEmployments();
        });
        
        let API = '/api/v2/employment-stats';
        let advertencia = "";
        
        if(dev)
            API = 'http://localhost:8080'+API
            
        let employments = [];
        let newEmploymentYear = 'year';
        let newEmploymentPeriod = 'period';
        let newEmploymentDate = 'date';
        let newEmploymentRegion = 'region';
        let newEmploymentEmployedPerson = 'employed person';
        let newEmploymentInactivePerson = 'inactive person';
        let newEmploymentUnemployedPerson = 'unemployed person';
    
        let result = "";
        let resultStatus = "";
    
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
            if(status==200){
                await getEmployments ();
            }		
        }
    
    
    
    
        
    
    </script>
    <h1> Employments</h1>
    {#if advertencia !=""}
    <h2 style="color: red; text-align: center; font-family:Arial, Helvetica, sans-serif">{advertencia}</h2>
    {/if}
    <Table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Period</th>
            <th>Date</th>
            <th>Region</th>
            <th>Employed person</th>
            <th>Inactive person</th>
            <th>Unemployed person</th>
            <th>Action</th>
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
            <td><Button on:click={createEmployment}>Create</Button></td>
           

        {#each employments as employment}
          <tr>
            <td>{employment.year}</td>
            <td>{employment.period}</td>
            <td>{employment.date}</td>
            <td>{employment.region}</td>
            <td>{employment.employed_person}</td>
            <td>{employment.inactive_person}</td>
            <td>{employment.unemployed_person}</td>
            <td><Button on:click={deleteEmployment(employment.region,employment.year)}>Delete</Button></td>
           
          </tr>
        {/each}

        <td><Button on:click={deleteEmploymentAll}>Delete all</Button></td>
          
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