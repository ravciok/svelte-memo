import { writable } from "svelte/store";
import type { IGridSize } from "../domain/grid";

function generateData(size: IGridSize, data: any): any[] {
  let arr = [];
  const length: number = size.x * size.y;

  for (let i = 0; i < length; i++) {
    if (data instanceof Array) {
      arr.push(data.pop());
    } else {
      arr.push(data);
    }
  }

  return arr;
}

export function generateBoard(size: IGridSize, data: any) {
  return generateData(size, data);
}

export function createGameState(data: any) {
  const { subscribe, update } = writable(data);

  return {
    subscribe,
    toggleActive: (data: string[]) =>
      update((n) => {
        const deepClone = JSON.parse(JSON.stringify(n));

        data.forEach((cell) => {
          const currentElement: string = `${cell}`;

          deepClone.source[cell].active = !deepClone.source[cell].active;

          if (deepClone.active.indexOf(currentElement) > -1) {
            deepClone.active = deepClone.active.filter(
              (el) => el !== currentElement
            );
          } else {
            deepClone.active.push(`${cell}`);
          }
        });

        return deepClone;
      }),
    setComplete: (data: string[]) =>
      update((n) => {
        let deepClone = JSON.parse(JSON.stringify(n));

        data.forEach((cell) => {
          deepClone.source[cell].complete = true;
        });

        deepClone.active = [];

        return deepClone;
      }),
    clearActive: () => {
      update((n) => {
        n.active = [];

        return n;
      });
    },
  };
}

export async function getDataFromAPI(amount: number) {
  const response = await fetch(
    // `https://cataas.com/api/cats?json=true&limit=${amount}`
    `https://dog.ceo/api/breeds/image/random/${amount}`
    // `https://dog.ceo/api/breed/pug/images/random/${amount}`
  );
  const data = await response.json();

  console.log(data);

  return data.message;
}

export async function generateRandomData(size: IGridSize) {
  const listLength = size.x * size.y;
  const uniqueElements = listLength / 2;
  const data = [];

  const apiData = await getDataFromAPI(uniqueElements);
  let counter = 0;

  for (let i = 0; i < listLength; i++) {
    if (i % 2 === 0) {
      counter += 1;
    }

    data.push({
      id: counter,
      // url: `https://cataas.com/cat/${apiData[counter - 1].id}`,
      url: apiData[counter - 1],
    });
  }

  return data.sort(() => Math.random() - 0.5);
}
