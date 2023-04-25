<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import { Button, Table } from 'sveltestrap';
    onMount(async () =>{
            getAgroclimatic();
        });
    let agroclimatics = [];
    async function getAgroclimatic() {
        const res1 = await fetch(
            "https://sos2223-12.appspot.com/api/v2/agroclimatic/loadinitialdata"
        );
        if (res1.ok) {
            console.log("Fetching agroclimatics....");
            const res = await fetch(
                "https://sos2223-12.appspot.com/api/v2/agroclimatic"
            );
            if (res.ok) {
                const data = await res.json();
                agroclimatics = data;
                console.log("Received agroclimatics: " + agroclimatics.length);
            }
        }
    }
</script>

<main>
    <figure class="text-center">
        <blockquote class="blockquote">
            <h1>API: agroclimatic</h1>
        </blockquote>
    </figure>
    <td align="center">
        <Button
            color="success"
            on:click={function () {
                window.location.href = `https://sos2223-13.appspot.com/Usos/uso1chart`;
            }}
        >
            Gráfica
        </Button>
    </td>
    {#await agroclimatics}
        loading
    {:then agroclimatics}
        <Table bordered>
            <thead id="titulitos">
                <tr>
                    <th style="text-decoration: underline;">Provincia:</th>
                    <th style="text-decoration: underline;">Año:</th>
                    <th style="text-decoration: underline;">Máxima Temperatura:</th>
                    <th style="text-decoration: underline;">Mínima Temperatura:</th>
                    <th style="text-decoration: underline;">Media Temperatura:</th>
                  </tr>
            </thead>
            <tbody>
                <tr />
                {#each agroclimatics as agroclimatic }
          <tr>
            <td>{agroclimatic.province}</td>
            <td>{agroclimatic.year}</td>
            <td>{agroclimatic.maximun_temperature}</td>
            <td>{agroclimatic.minimun_temperature}</td>
            <td>{agroclimatic.medium_temperature}</td>
          </tr>
        {/each}
            </tbody>
        </Table>
    {/await}
</main>