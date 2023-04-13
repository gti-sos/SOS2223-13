<script>
    // @ts-nocheck
        import { dev } from "$app/environment";
        
        let API = '/api/v2/evolution';
        
        if(dev)
            API = 'http://localhost:8080'+API
            

        let evolutions = [];
        let result = "";
        let resultStatus = "";
    
    async function getEvolution(){
            resultStatus = result = "";
            const res = await fetch(API+"?offset=0&limit=10", {
                method: "GET"
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                evolutions = data;
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
        }

</script>

<nav>
    <a href="/">Menú</a>
    <a href="/employment">Empleos</a>
    <a on:click={() => getEvolution()} href="/evolution">Evolución</a>
    <a href="/localentities">Entidades locales</a>
</nav>