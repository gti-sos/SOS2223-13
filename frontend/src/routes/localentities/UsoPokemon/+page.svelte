
    <script>
    //@ts-nocheck
    import { Table } from "sveltestrap";
    import { onMount } from "svelte";
    const delay = ms => new Promise(res => setTimeout(res, ms));


    let datos = [];

    let nombre = [];
    let daño = [];
    let ident = [];

    let result = "";
    let resultStatus = "";


    onMount(async () => {
        getDatos();
    });
    const url = 'https://pokemon-unite-pokemons.p.rapidapi.com/pokemon?page=1&pageSize=10';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '01cd34b806msh61c7b8a29784bfdp11335ejsnb506b37121ad',
		'X-RapidAPI-Host': 'pokemon-unite-pokemons.p.rapidapi.com'
	}
};


    async function getDatos(){
        resultStatus = result = "";
            const res = await fetch(url, options)
            console.log(res);
                
        if(res.ok){   
            try{
                const dat = await res.json();
                result = JSON.stringify(dat, null, 2);
                datos = dat.items;
                console.log(datos);
                datos.forEach(element => {
                    nombre.push(element['name']);
                    daño.push(element['id']);
                    ident.push(element['damageType']);
                });
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
        }else{
            console.log("Error al devolver la gráfica");
        } 
        await delay(500);
    }

</script>


<main>
    <h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 45px; text-decoration:underline;">Datos: Pokemon Unite Pokemons
</h1>
    <br>
    <div style="text-align:center;">
        <strong >Número de datos: {datos.length}</strong>
    </div>
    <br>
    <Table striped hover style="text-align: center;">
        <thead>
          <tr style="font-weight: bold; text-decoration:underline">
            <th>ID:</th>
            <th>Nombre:</th>
            <th>Tipo de Daño:</th>
          </tr>
        </thead>
        <tbody>
           

        {#each datos as d}
          <tr>
            <td>{d["id"]}</td>
            <td>{d["name"]}</td>
            <td>{d["damageType"]}</td>
          </tr>
        {/each}
          
        </tbody>
    </Table>

    <p style="text-align:center">
        Tipo de Ataque de pokemons.
    </p>
    <br>
</main>
