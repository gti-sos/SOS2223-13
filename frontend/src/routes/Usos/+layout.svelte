<script>
    import Uso2 from "./uso2chart/+page.svelte";
    import Uso1JLB from "./uso1JLB/+page.svelte";
</script>

<main>

    <slot></slot> 
    <hr style="margin-left: 100%; margin-right: 100%">
    <Uso2></Uso2>
    <hr style="margin-left: 100%; margin-right: 100%">
    <Uso1JLB></Uso1JLB>
</main>