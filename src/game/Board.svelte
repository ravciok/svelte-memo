<script lang="ts">
  import Card from "./Card.svelte";

  export let data;
  export let state;
  export let gridSize;

  function handleClick(cellIndex: any) {
    if (
      !$state.source[cellIndex].complete &&
      !$state.source[cellIndex].active &&
      $state.active.length < 2
    ) {
      state.toggleActive([`${cellIndex}`]);
    }
  }

  const width: string = "200px";
</script>

<div class="wrapper" style="--columnLength: {gridSize.x}; --rowLength: {gridSize.y}; --width: {width}">
  <div class="board">
    {#each data as cell, cellIndex}
      <div class="cell">
        <Card
          details={cell}
          state={$state.source[cellIndex]}
          on:click={() => handleClick(cellIndex)}
        />
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100% - 30px);
  }

  .board {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    max-width: calc(var(--width) * var(--columnLength));
    max-height: calc(var(--width) * var(--rowLength));
  }

  .cell {
    display: flex;
    flex: 1 1 100%;
    padding: 10px;
    box-sizing: border-box;
    max-width: var(--width);
    max-height: var(--width);
  }
</style>
