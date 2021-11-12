<script lang="ts">
  import {
    createGameState,
    generateBoard,
    generateRandomData,
  } from "./data/state";
  import { writable } from "svelte/store";
  import Board from "./game/Board.svelte";
  import type { IGridSize } from "./domain/grid";
  import { timeFormatter } from "./data/time";

  const gridSize: IGridSize = { x: 8, y: 4 };
  const cardsAmount: number = gridSize.x * gridSize.y;
  const pairsAmount: number = cardsAmount / 2;

  const timeState = createTimeState(0);
  const cardsState = writable({
    matched: 0,
    reveled: 0,
  });
  const data = writable([]);
  const gameState = createGameState({
    source: generateBoard(gridSize, {
      active: false,
      complete: false,
    }),
    active: [],
  });

  generateRandomData(gridSize).then((response) => {
    console.log("generated data: ", response);

    data.set(generateBoard(gridSize, response));
  });

  gameState.subscribe((store) => {
    console.log("data changed: ", store.active);

    if (store.active.length) {
      cardsState.update((data) => {
        data.reveled += 1;

        return data;
      });
    }

    if (store.active.length === 2) {
      const [first, second]: any[] = store.active;
      const firstElement = getNestedData(first, $data);
      const secondElement = getNestedData(second, $data);
      const isSame: boolean = firstElement.id === secondElement.id;

      if (isSame) {
        cardsState.update((data) => {
          data.matched += 1;

          return data;
        });
        gameState.setComplete(store.active);
      } else {
        setTimeout(() => {
          gameState.toggleActive(store.active);
          gameState.clearActive();
        }, 2000);
      }

      console.log(firstElement, secondElement);
    }
  });

  function getNestedData(path: string, data: any): any {
    return path.split(".").reduce((acc, cur) => {
      return acc[cur] ?? acc;
    }, data);
  }

  function createTimeState<T>(data: T) {
    const { set, subscribe } = writable(data);

    const startDate = new Date();
    const interval = setInterval(() => {
      if ($cardsState.matched !== pairsAmount) {
        set(new Date() - startDate);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return {
      subscribe,
    };
  }
</script>

<div class="header">
  <div class="header__element">{$cardsState.matched} / {pairsAmount}</div>
  <div class="header__element">{$cardsState.reveled} / {cardsAmount}</div>
  <div class="header__element">{timeFormatter($timeState)}</div>
</div>

<Board
  data={$data}
  state={gameState}
  gridSize={gridSize}
  let:element
  let:element-state={elementState}
/>

<style lang="scss">
  .header {
    display: flex;
    justify-content: center;
    font-size: 2rem;
    &__element {
      display: flex;
      width: 150px;
    }
  }
</style>
