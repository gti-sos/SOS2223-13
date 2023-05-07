<script>
    import Integracion2 from "./apiRapid.svelte";
    import Integracion3 from "./Integracion3.svelte";
    import Integracion4 from "./Integracion4.svelte";
    import Integracion1JLB from "./Integracion1JLB.svelte";
    import Integracion2JLB from "./Integracion2JLB.svelte";
    import IntegracionIFR1 from "./IntegracionIFR1.svelte";
    import IntegracionIFR2 from "./IntegracionIFR2.svelte";

</script>

<main>
    <slot></slot> 
    <hr style="margin-left: 100%; margin-right: 100%">
    <Integracion2></Integracion2>
    <hr style="margin-left: 100%; margin-right: 100%">
    <Integracion3></Integracion3>
    <hr style="margin-left: 100%; margin-right: 100%">
    <Integracion4></Integracion4>
    <hr style="margin-left: 100%; margin-right: 100%">
    <Integracion1JLB></Integracion1JLB>
    <hr style="margin-left: 100%; margin-right: 100%">
    <Integracion2JLB></Integracion2JLB>
    <hr style="margin-left: 100%; margin-right: 100%">
    <IntegracionIFR1></IntegracionIFR1>
    <hr style="margin-left: 100%; margin-right: 100%">
    <IntegracionIFR2></IntegracionIFR2>
</main>