<script>
    // @ts-nocheck
    
        import { onMount } from 'svelte';
        import { dev } from '$app/environment';
        import { Button,Table } from 'sveltestrap';

        onMount(async () => {
            getEvolution();
        });
        
        let API = '/api/v1/evolution-stats';
        
        if(dev)
            API = 'http://localhost:8080'+API
            
        let evolution = [];
        let newEvolutionPeriod = 'period';
        let newEvolutionTerritory = 'territory';
        let newEvolutionTotalPopulation = 'total_population';
        let newEvolutionMan = 'man';
        let newEvolutionWoman = 'woman';
        let newEvolutionUndersixteenyears = 'under_sixteen_years';
        let newEvolutionSixteensixtyfouryears = 'from_sixteen_to_sixty_four_years';
        let newEvolutionSixtyfiveoveryears = 'sixty_five_and_over';
    
        let result = "";
        let resultStatus = "";
    
        async function getEvolution () {
            resultStatus = result = "";
            const res = await fetch(API, {
                method: 'GET'
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data,null,2);
                evolution = data;
            }catch(error){
                console.log(`Error parsing result: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;	
        }


        async function createEvolution (){
            resultStatus = result = "";
            const res = await fetch(API, {
                method: 'POST',
                headers:{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({
                    period: newEvolutionPeriod,
                    territory: newEvolutionTerritory,
                    total_population: newEvolutionTotalPopulation,
                    man: newEvolutionMan,
                    woman: newEvolutionWoman,
                    under_sixteen_years: newEvolutionUndersixteenyears,
                    from_sixteen_to_sixty_four_years: newEvolutionSixteensixtyfouryears,
                    sixty_five_and_over: newEvolutionSixtyfiveoveryears
                })     
            });
            const status = await res.status;
            resultStatus = status;
            if(status==201){
                getEvolution ();
            }	
        }

        async function deleteEvolutionAll () {
            resultStatus = result = "";
            const res = await fetch(API, {
                method: 'DELETE'
            });
            const status = await res.status;
            resultStatus = status;
            if(status==200){
                await getEvolution ();
            }		
        }
    
    
    
    
        
    
    </script>
    <h1> Evolution</h1>
    <Table>
        <thead>
          <tr>
            <th>Period</th>
            <th>Territory</th>
            <th>Total_population</th>
            <th>Man</th>
            <th>Woman</th>
            <th>Under_sixteen_years</th>
            <th>From_sixteen_to_sixty_four_years</th>
            <th>Sixty_five_and_over</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            <td><input bind:value={newEvolutionPeriod}></td>
            <td><input bind:value={newEvolutionTerritory}></td>
            <td><input bind:value={newEvolutionTotalPopulation}></td>
            <td><input bind:value={newEvolutionMan}></td>
            <td><input bind:value={newEvolutionWoman}></td>
            <td><input bind:value={newEvolutionUndersixteenyears}></td>
            <td><input bind:value={newEvolutionSixteensixtyfouryears}></td>
            <td><input bind:value={newEvolutionSixtyfiveoveryears}></td>
            <td><Button on:click={createEvolution}>Create</Button></td>
           

        {#each evolution as evol}
          <tr>
            <td>{evol.period}</td>
            <td>{evol.territory}</td>
            <td>{evol.total_population}</td>
            <td>{evol.man}</td>
            <td>{evol.woman}</td>
            <td>{evol.under_sixteen_years}</td>
            <td>{evol.from_sixteen_to_sixty_four_years}</td>
            <td>{evol.sixty_five_and_over}</td>
            <td>&nbsp</td>
           
          </tr>
        {/each}

        <td><Button on:click={deleteEvolutionAll}>Delete all</Button></td>
          
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