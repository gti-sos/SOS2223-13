<!--
    <script>
    //@ts-nocheck
    import { Table } from "sveltestrap";
    import { onMount } from "svelte";
    const delay = ms => new Promise(res => setTimeout(res, ms));


    let datos = [];

    let pais = [];
    let codigo = [];
    let prefijo=[];
    

    let result = "";
    let resultStatus = "";


    onMount(async () => {
        getDatos();
    });
    const url = 'https://truecaller4.p.rapidapi.com/api/v1/getCountryCodes';
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '01cd34b806msh61c7b8a29784bfdp11335ejsnb506b37121ad',
		'X-RapidAPI-Host': 'truecaller4.p.rapidapi.com'
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
                    pais.push(element['country']);
                    prefijo.push(element['isdCode']);
                    codigo.push(element['countryCode']);

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
    <h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 45px; text-decoration:underline;">Datos: TrueCaller
</h1>
    <br>
    <div style="text-align:center;">
        <strong >Número de datos: {datos.length}</strong>
    </div>
    <br>
    <Table striped hover style="text-align: center;">
        <thead>
          <tr style="font-weight: bold; text-decoration:underline">
            <th>Pais:</th>
            <th>Prefijo:</th>
            <th>Codigo Pais:</th>


          </tr>
        </thead>
        <tbody>
           

        {#each datos as d}
          <tr>
            <td>{d["country"]}</td>
            <td>{d["isdCode"]}</td>
            <td>{d["countryCode"]}</td>


          </tr>
        {/each}
          
        </tbody>
    </Table>

    <p style="text-align:center">
        Prefijos de algunos países del mundo
    </p>
    <br>
</main>

-->