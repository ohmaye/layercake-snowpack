<script>
    export let text = "All";
    export let english = "";
    export let x = 150;
    export let y = 100;
</script>

<style>
    .rect {
        position: absolute;
        left: var(--left);
        top: var(--top);
        width: 120px;
        height: 50px;
        z-index: 9999;
        background-color: white;
        padding: 3px;
        border: 2px solid black;
        border-radius: 5px;
        box-shadow: 10px 10px 5px grey;
    }

    span {
        color: black;
        z-index: 99999;
    }

    .de {
        font-size: 1.2rem;
        color: blue;
    }
</style>

<div class="rect" style="--left:{x - 120}px; --top:{y - 50}px;">
    <div class="de">{text}</div>
    <div>{english}</div>
</div>
