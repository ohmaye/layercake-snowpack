<script>
    export let text = "All";
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
        background-color: rgb(211, 10, 10);
    }

    span {
        color: yellow;
        z-index: 99999;
    }
</style>

<div class="rect" style="--top:{y}px; --left:{x}px;"><span>{text}</span></div>
<!-- <g transform="translate({x},{y})">
    <rect />
    <text>Hello there</text>
    <text>lfjlsdjsdflj</text>
</g> -->
