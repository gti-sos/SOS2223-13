<script>
    // @ts-nocheck
    
        import { onMount } from 'svelte';
        import { dev } from '$app/environment';
        import { Button,Table } from 'sveltestrap';
        import { page } from '$app/stores';

        onMount(async () => {
            getEmployment();
        });

       
        
        let advertencia = "";
        let region = $page.params.region;
        let year = $page.params.year;
        
        let API = '/api/v2/employment-stats'+'/'+region+'/'+year;
        
        
        if(dev)
            API = 'http://localhost:8080'+API
            
        let updatedEmploymentRegion = region;
        let updatedEmploymentYear = year;
        let updatedEmploymentPeriod = 'period';
        let updatedEmploymentDate = 'date';
        let updatedEmploymentEmployedPerson = 'employed person';
        let updatedEmploymentInactivePerson = 'inactive person';
        let updatedEmploymentUnemployedPerson = 'unemployed person';
    
        let result = "";
        let resultStatus = "";
    
        async function getEmployment () {
            resultStatus = result = "";
            const res = await fetch(API, {
                method: 'GET'
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data,null,2);
                updatedEmploymentRegion = data.region;
                updatedEmploymentYear = data.year;
                updatedEmploymentPeriod = data.period;
                updatedEmploymentDate = data.date;
                updatedEmploymentEmployedPerson = data.employed_person;
                updatedEmploymentInactivePerson = data.inactive_person;
                updatedEmploymentUnemployedPerson = data.unemployed_person;

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


        async function updateEmployment (){
            resultStatus = result = "";
            const res = await fetch(API, {
                method: 'PUT',
                headers:{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({
                    region: updatedEmploymentRegion,
                    year: updatedEmploymentYear,
                    period: updatedEmploymentPeriod,
                    date: updatedEmploymentDate,
                    employed_person: updatedEmploymentEmployedPerson,
                    inactive_person: updatedEmploymentInactivePerson,
                    unemployed_person: updatedEmploymentUnemployedPerson
                })     
            });
            const status = await res.status;
            resultStatus = status;
            if(status==200){
                getEmployment ();
                advertencia = "Recurso actualizado";
            }else if(status==400){
                advertencia = "Estadística erronea";
            }else{
                advertencia = "Error servidor";
            }
    }

   

        

    
    
    
    
        
    
    </script>
    <h1> Employments Details</h1>
    {#if advertencia !=""}
    <h2 style="color: red; text-align: center; font-family:Arial, Helvetica, sans-serif">{advertencia}</h2>
    {/if}
    <Table>
        <thead>
          <tr>
            <th>Region</th>
            <th>Year</th>
            <th>Date</th>
            <th>Period</th>
            <th>Employed person</th>
            <th>Inactive person</th>
            <th>Unemployed person</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            <td>{updatedEmploymentRegion}</td>
            <td>{updatedEmploymentYear}</td>
            <td><input bind:value={updatedEmploymentDate}></td>
            <td><input bind:value={updatedEmploymentPeriod}></td>
            <td><input bind:value={updatedEmploymentEmployedPerson}></td>
            <td><input bind:value={updatedEmploymentInactivePerson}></td>
            <td><input bind:value={updatedEmploymentUnemployedPerson}></td>
            <td><Button on:click={updateEmployment}>Update</Button></td>
          
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