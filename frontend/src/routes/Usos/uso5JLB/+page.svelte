<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import { Table } from 'sveltestrap';


    onMount(async () =>{
            getData();
        });


    let dataReceived = [];

    async function getData() {
            const res = await fetch(
                "https://sos2223-17.appspot.com/api/v2/emergency-call-stats/loadInitialData"
            );
            if (res.ok) {
                const data = await res.json();
                dataReceived = data;
                console.log("Longitud de datos de la api emergencency-call-stats : " + dataReceived.length);
            }

    }
</script>

<main>
    <figure class="text-center">
        <blockquote class="blockquote">
            <h1>API: emergency-call-stats (Santiago)</h1>
        </blockquote>
    </figure>
    {#await dataReceived}
        cargando ...
    {:then dataReceived}
        <Table bordered>
            <thead>
                <tr>
                    <th>Provincia</th>
                    <th>Mes</th>
                    <th>Llamada por teléfono</th>
                    <th>Telemáticas</th>
                    <th>Llamadas de emergencia</th>
                    <th>Año</th>
                  </tr>
            </thead>
            <tbody>
                <tr />
                {#each dataReceived as dR }
          <tr>
            <td>{dR.province}</td>
            <td>{dR.month}</td>
            <td>{dR.phone_call_activation_organization}</td>
            <td>{dR.telematic_activation_organization}</td>
            <td>{dR.emergency_call}</td>
            <td>{dR.year}</td>
          </tr>
        {/each}
            </tbody>
        </Table>
    {/await}
</main>