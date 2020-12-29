<script>
    import { getContext } from "svelte";

    const { width, height } = getContext("LayerCake");

    export let data = {};

    const toolTipWidth = 150;
    const toolTipHeight = 200;
</script>

<style>
    .tooltip {
        position: absolute;
        display: grid;
        grid-template-columns: 1fr 3fr;
        grid-auto-rows: 1.5rem;
        left: var(--left);
        top: var(--top);
        width: var(--width);
        height: var(--height);
        background-color: white;
        padding: 3px;
        border: 2px solid black;
        border-radius: 5px;
        box-shadow: 10px 10px 5px grey;
    }
</style>

<div
    class="tooltip"
    style="--left:{$width - 10 - toolTipWidth}px; --top:{10}px; --width:{toolTipWidth}px; --height:{toolTipHeight}px">
    <span>DE: </span><span>{data.de || 'All'}</span>
    <span>POS: </span><span>{data.POS || ''}</span>
    <span>EN: </span><span>{data.en || ''}</span>
</div>
