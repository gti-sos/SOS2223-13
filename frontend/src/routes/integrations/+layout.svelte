<script>
    import Integracion1JLB from "./Integracion1JLB.svelte";
    import Integracion2JLB from "./Integracion2JLB.svelte";


</script>

<main>
    <slot></slot>
    <hr style="margin-left: 100%; margin-right: 100%">
    <Integracion1JLB></Integracion1JLB>
    <hr style="margin-left: 100%; margin-right: 100%">
    <Integracion2JLB></Integracion2JLB>
</main>