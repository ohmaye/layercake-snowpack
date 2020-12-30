<script>
    import { fade, slide } from "svelte/transition";
    export let root;

    const isType = (d) => {
        if (!d) {
            return null;
        } else if (!d.parent) {
            return "root";
        } else if (d.children) {
            return "POS";
        } else {
            return "leaf";
        }
    };
</script>

<style>
    .label {
        position: absolute;
        left: var(--left);
        top: var(--top);
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
            0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    .POS {
        background-color: white;
        border-radius: 30px;
        font-size: 1.5rem;
        padding: 10px;
    }

    .leaf {
        position: absolute;
        left: var(--left);
        top: var(--top);
        font-size: 2rem;
        padding: 5px;
        border-radius: 10px;
    }
</style>

{#each [...root] as d}
    {#if isType(d) === 'POS' && d?.r > 50}
        <div
            transition:slide
            class="label POS"
            style="--left:{d.x - 20}px; --top:{d.y - 20}px;">
            {d.data[0]}
        </div>
    {:else if isType(d) === 'leaf' && d?.r > 50}
        <div
            transition:slide
            class="label leaf"
            style="--left:{d.x - 30}px; --top:{d.y - 20}px;">
            {d.data.de || ''}
        </div>
    {/if}
{/each}
