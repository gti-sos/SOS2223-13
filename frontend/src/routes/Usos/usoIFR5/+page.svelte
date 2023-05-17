<!--

<script>
    //@ts-nocheck
    import { Table } from "sveltestrap";
    import { onMount } from "svelte";
    const delay = ms => new Promise(res => setTimeout(res, ms));


    let datos = [];

    let codigo = [];
    let nombre = [];
    

    let result = "";
    let resultStatus = "";


    onMount(async () => {
        getDatos();
    });
    const url = 'https://online-code-compiler.p.rapidapi.com/v1/languages/';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '01cd34b806msh61c7b8a29784bfdp11335ejsnb506b37121ad',
		'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
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
                datos = dat;
                console.log(datos);
                datos.forEach(element => {
                    codigo.push(element['id']);
                    nombre.push(element['name']);


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
    <h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 45px; text-decoration:underline;">Datos: Marktdaten Deutschland
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

          </tr>
        </thead>
        <tbody>
           

        {#each datos as d}
          <tr>
            <td>{d["id"]}</td>
            <td>{d["name"]}</td>


          </tr>
        {/each}
          
        </tbody>
    </Table>

    <p style="text-align:center">
        Precio de la electricidad en Alemania en la región de Mauer
    </p>
    <br>
</main>

-->