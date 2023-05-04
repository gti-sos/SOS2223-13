<script>
    import Uso2 from "./uso2chart/+page.svelte";
    import Uso1JLB from "./uso1JLB/+page.svelte";
    import Uso2JLB from "./uso2JLB/+page.svelte";
    import Uso3JLB from "./uso3JLB/+page.svelte";
</script>

<main>

    <slot></slot> 
    <hr style="margin-left: 100%; margin-right: 100%">
    <Uso2></Uso2>
    <hr style="margin-left: 100%; margin-right: 100%">
    <Uso1JLB></Uso1JLB>
    <hr style="margin-left: 100%; margin-right: 100%">
    <Uso2JLB></Uso2JLB>
    <hr style="margin-left: 100%; margin-right: 100%">
    <Uso3JLB></Uso3JLB>
</main>