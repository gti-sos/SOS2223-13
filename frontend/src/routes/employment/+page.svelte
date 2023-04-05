<script>
    // @ts-nocheck
    
        import { onMount } from 'svelte';
        import { dev } from '$app/environment';
        import { Button,Table } from 'sveltestrap';

        onMount(async () => {
            getEmployments();
        });
        
        let API = '/api/v1/employment-stats';
        
        if(dev)
            API = 'http://localhost:8080'+API
            
        let employments = [];
        let newEmploymentYear = 'year';
        let newEmploymentRegion = 'region';
    
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
        }


        async function createEmployment (){
            resultStatus = result = "";
            const res = await fetch(API, {
                method: 'POST'      //
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
        }
    
    
    
    
        
    
    </script>
    <h1> Employments</h1>
    <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Year</th>
            <th>Period</th>
            <th>Region</th>
            <th>Employed person</th>
            <th>Inactive person</th>
            <th>Unemployed person</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            <td><input bind:value={newEmploymentYear}></td>
            <td><input bind:value={newEmploymentRegion}></td>
            <td><Button on:click={createEmployment}>Create</Button></td>
           

        {#each employments as employment}
          <tr>
            <th scope="row">1</th>
            <td>{employment.year}</td>
            <td>{employment.period}</td>
            <td>{employment.region}</td>
            <td>{employment.employed_person}</td>
            <td>{employment.inactive_person}</td>
            <td>{employment.unemployed_person}</td>
            <td>&nbsp</td>
          </tr>
        {/each}
          
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