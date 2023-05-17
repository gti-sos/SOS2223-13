<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import { Button, Table } from 'sveltestrap';
    onMount(async () =>{
            getMarket();
        });
    let mercado = [];
    async function getMarket() {
            console.log("Fetching market....");
            const res = await fetch(
                "https://sos2223-21.appspot.com/api/v3/market-prices-stats/"
            );
            if (res.ok) {
                const data = await res.json();
                mercado = data;
                console.log("Received market: " + mercado.length);
            }

    }
</script>

<main>
    <figure class="text-center">
        <blockquote class="blockquote">
            <h1>API: market-prices-stats</h1>
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
    {#await mercado}
        loading
    {:then mercado}
        <Table bordered>
            <thead id="titulitos">
                <tr>
                    <th style="text-decoration: underline;">Provincia:</th>
                    <th style="text-decoration: underline;">Año:</th>
                    <th style="text-decoration: underline;">Precio Actual del Pib:</th>
                    <th style="text-decoration: underline;">Estructura de porcentaje de Pib:</th>
                    <th style="text-decoration: underline;">Ratio de variación del Pib:</th>
                  </tr>
            </thead>
            <tbody>
                <tr />
                {#each mercado as m }
          <tr>
            <td>{m.province}</td>
            <td>{m.year}</td>
            <td>{m.pib_current_price}</td>
            <td>{m.pib_percentage_structure}</td>
            <td>{m.pib_variation_rate}</td>
          </tr>
        {/each}
            </tbody>
        </Table>
    {/await}

    <ul>
        <li><b style="font-size: 25px;">USOS DE IRENE:</b></li>
            <br>
            <ul>
                    <ul><a href="/localentities/UsoTelefonos" style="font-size: 20px;">Prefijo de Teléfonos de algunos países.</a></ul>
                    <ul><a href="/localentities/UsoLol" style="font-size: 20px;">Campeones Lol con su porcentaje de victorias.</a></ul>
                    <ul><a href="/localentities/UsoPokemon" style="font-size: 20px;">Tipo de ataques de algunos Pokemons.</a></ul>
                    <ul><a href="/localentities/UsoCodigo" style="font-size: 20px;">Códigos con sus abreviaturas.</a></ul>
                    <ul><a href="/localentities/Pelis" style="font-size: 20px;">Películas en Reino Unido.</a></ul>


            </ul>
            <br>
    </ul>

</main>