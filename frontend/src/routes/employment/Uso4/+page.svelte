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
                //"http://localhost:8080/job" para testear sin hacer push que el proxy funciona
                "https://sos2223-13.ew.r.appspot.com/job"
            );
            if (res.ok) {
                const data = await res.json();
                dataReceived = data;
                console.log("Longitud de datos de la api jobseekers-studies : " + dataReceived.length);
            }

    }
</script>

<main>
    <figure class="text-center">
        <blockquote class="blockquote">
            <h1>API: jobseekers-studies (Jara)</h1>
        </blockquote>
    </figure>
    {#await dataReceived}
        cargando ...
    {:then dataReceived}
        <Table bordered>
            <thead>
                <tr>
                    <th>Año</th>
                    <th>Genero</th>
                    <th>Región</th>
                    <th>Tipo</th>
                    <th>Primaria</th>
                    <th>Formación profesional</th>
                    <th>Educación general</th>
                    <th>Total</th>
                  </tr>
            </thead>
            <tbody>
                <tr />
                {#each dataReceived as dR }
          <tr>
            <td>{dR.year}</td>
            <td>{dR.gender}</td>
            <td>{dR.territory}</td>
            <td>{dR.type}</td>
            <td>{dR.primary}</td>
            <td>{dR.fp_program}</td>
            <td>{dR.general_education}</td>
            <td>{dR.total}</td>
          </tr>
        {/each}
            </tbody>
        </Table>
    {/await}
</main>