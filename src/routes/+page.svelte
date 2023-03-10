<script>
  import { onMount } from "svelte";
  import Wordcard from "./Wordcard.svelte";

  let selected = "";
  let x, y;

  function handleSelect() {
    let selection = document.getSelection();
    if (selection.anchorNode) {
      selected = selection.toString().trim("\n");
      let { right, bottom } = selection.getRangeAt(0).getBoundingClientRect();
      x = right + 5;
      y = bottom + 5;
    }
  }

  onMount(() => {
    document.addEventListener("selectionchange", handleSelect);
  });

  let cards = [];

  function handleClick() {
    cards = [...cards, selected];
  }

  let text = "";
</script>

<input bind:value={text} class="m-5 bg-gray-100 py-1.5 px-2" />

<div class="m-xl">
  <p class="rounded py-1.5 px-2">
    {text}
  </p>
</div>

{#if selected}
  <div class="bg-blue-100 w-full min-h-10 p-3 text-center">
    {selected}
  </div>
{/if}

<div class="fixed bottom-5 self-center flex gap-4">
  {#each cards as query}
    <Wordcard {query} />
  {/each}
</div>

{#if selected}
  <div class="fixed left-$x top-$y" style:--x={x + "px"} style:--y={y + "px"}>
    <button on:click={handleClick} class="p-2 backdrop-blur-md flex flex-row justify-center shadow-lg shadow-black/20 ring-blue-500 text-blue-700 ring-1.5 rounded-lg transition-colors bg-white/80 hover:bg-blue-50/80">
      <div class="i-material-symbols-search text-lg" />
    </button>
  </div>
{/if}
