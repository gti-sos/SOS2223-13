<script>
    import Integracion2 from "./apiRapid.svelte";
    import Integracion3 from "./Integracion3.svelte";
</script>

<main>
    <slot></slot> 
    <hr style="margin-left: 100%; margin-right: 100%">
    <Integracion2></Integracion2>
    <hr style="margin-left: 100%; margin-right: 100%">
    <Integracion3></Integracion3>
</main>