<script>
    import { getContext } from "svelte";
    const { width, height } = getContext("LayerCake");

    export let node;

    const toolTipWidth = 200;
    const toolTipHeight = 250;

    const setData = (node) => {
        if (!node || !node.parent) {
            return { de: "All" };
        } else if (!node.children) {
            return node.data;
        } else {
            return {
                POS: node.data[0],
            };
        }
    };

    $: data = setData(node);
</script>

<style>
    .details {
        position: absolute;
        left: var(--left);
        top: var(--top);
        width: var(--width);
        height: var(--height);
        display: grid;
        grid-template-columns: 1fr 3fr;
        grid-auto-rows: auto-fill;
        background-color: white;
        overflow: hidden;
        padding: 5px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
            0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .value {
        color: blue;
        font-weight: bold;
    }
</style>

<div
    class="details"
    style="--left:{$width - 10 - toolTipWidth}px; --top:{10}px; --width:{toolTipWidth}px; --height:{toolTipHeight}px">
    <span>DE: </span><span class="value">{data?.de || ''}</span>
    <span>POS: </span><span class="value">{data?.POS || ''}</span>
    <span>EN: </span><span class="value">{data?.en || ''}</span>
    <span>Ex: </span><span class="value">{data?.deSample || ''}</span>
    <span>Lvl: </span><span class="value">{data?.level || ''}</span>
</div>
