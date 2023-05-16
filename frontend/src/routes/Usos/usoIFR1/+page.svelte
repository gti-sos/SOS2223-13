<script>
    //@ts-nocheck
    import { Table } from "sveltestrap";
    import { onMount } from "svelte";
    const delay = ms => new Promise(res => setTimeout(res, ms));


    let datos = [];

    let precio = [];
    let unidad = [];
    let lugar = [];

    let result = "";
    let resultStatus = "";


    onMount(async () => {
        getDatos();
    });
    const url = 'https://marktdaten-deutschland.p.rapidapi.com/marketdata?zip=69256';
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '14bb23eb3dmshaaee84a74703686p1964ddjsn6905a0bff0f4',
		'X-RapidAPI-Host': 'marktdaten-deutschland.p.rapidapi.com'
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
                datos = dat.data;
                console.log(datos);
                datos.forEach(element => {
                    precio.push(element['marketprice']);
                    unidad.push(element['unit']);
                    lugar.push(element['localcell']);


                    
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
            <th>Precio:</th>
            <th>Unidad:</th>
            <th>Lugar y código postal:</th>
          </tr>
        </thead>
        <tbody>
           

        {#each datos as d}
          <tr>
            <td>{d["marketprice"]}</td>
            <td>{d["unit"]}</td>
            <td>{d["localcell"]}</td>
          </tr>
        {/each}
          
        </tbody>
    </Table>

    <p style="text-align:center">
        Precio de la electricidad en Alemania en la región de Mauer
    </p>
    <br>
</main>

