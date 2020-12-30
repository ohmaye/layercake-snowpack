<script>
    export let node;

    const setData = (node) => {
        if (!node || !node.parent) {
            return { de: "All" };
        } else if (!node.children) {
            return node.data;
        } else {
            return {
                de: node.data[0],
            };
        }
    };

    $: data = setData(node);
</script>

<style>
    .rect {
        position: absolute;
        left: var(--left);
        top: var(--top);
        width: 120px;
        height: 50px;
        background-color: white;
        padding: 3px;
        border: 2px solid black;
        border-radius: 5px;
        box-shadow: 10px 10px 5px grey;
        visibility: var(--visibility);
    }

    .de {
        font-size: 1.2rem;
        color: blue;
    }
</style>

<div class="rect" style="--left:{node?.x - 120}px; --top:{node?.y - 50}px;">
    <div class="de">{data.de || ''}</div>
    <div>{data.en || ''}</div>
</div>
