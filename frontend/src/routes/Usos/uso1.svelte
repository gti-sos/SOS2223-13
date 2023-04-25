<script>
    import { onMount } from "svelte";
    import { Table, Button } from "sveltestrap";
    let entries = [];
    onMount(async () =>{
        getEntries()
    });
    async function getEntries() {
        const res1 = await fetch(
            "https://sos2223-12.appspot.com/api/v2/agroclimatic/loadInitialData"
        );
        if (res1.ok) {
            console.log("Fetching entries....");
            const res = await fetch(
                "https://sos2223-12.appspot.com/api/v2/agroclimatic"
            );
            if (res.ok) {
                const data = await res.json();
                entries = data;
                console.log("Received entries: " + entries.length);
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
    {#await entries}
        loading
    {:then entries}
        <Table bordered>
            <thead id="titulitos">
                <tr>
                    <th>País</th>
                    <th>Año</th>
                    <th>Temperatura máxima</th>
                    <th>Temperatura mínima</th>
                    <th>Temperatura media</th>
                </tr>
            </thead>
            <tbody>
                <tr />
                {#each entries as entry}
                    <tr>
                        <td>{entry.province}</td>
                        <td>{entry.year}</td>
                        <td>{entry.temp_max}</td>
                        <td>{entry.temp_min}</td>
                        <td>{entry.temp_med}</td>
                    </tr>
                {/each}
            </tbody>
        </Table>
    {/await}
</main>