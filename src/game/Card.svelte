<script lang="ts">
  console.log("card");

  export let details;
  export let state;
</script>

<div class="scene" on:click>
  <div
    class="card"
    class:card--active={state.active}
    class:card--complete={state.complete}
  >
    <div class="card__face card__face--front">
      <div class="face__logo">dogos</div>
    </div>
    <div class="card__face card__face--back">
      <img class="face__image" src={details.url} alt="" />
    </div>
    <div class="card__face card__face--complete">&#128525;</div>
  </div>
</div>

<style lang="scss">
  .scene {
    display: flex;
    flex-direction: column;
    flex: 1 0 100%;
    perspective: 600px;
    .card {
      position: relative;
      width: 100%;
      height: 100%;
      cursor: pointer;
      transform-style: preserve-3d;
      transform-origin: center right;
      transition: transform 1s;
      &--active {
        transform: translateX(-100%) rotateY(-180deg);
      }
      &--complete {
        .card__face--complete {
          opacity: 1;
        }
      }
      &__face {
        display: flex;
        flex-direction: column;
        position: absolute;
        width: 100%;
        height: 100%;
        color: white;
        backface-visibility: hidden;
        overflow: hidden;
        border-radius: 1rem;
        transition: opacity 1s;
        user-select: none;
        &--front {
          background: rgba(255, 0, 0, 0.5);
        }
        &--back {
          background: rgba(0, 0, 0, 0.1);
          transform: rotateY(180deg);
        }
        &--complete {
          display: flex;
          background: rgba(0, 0, 0, 0.5);
          transform: rotateY(180deg);
          font-size: 5rem;
          justify-content: center;
          align-items: center;
          opacity: 0;
        }
        .face__logo {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          transform: rotate(-45deg);
          letter-spacing: 1px;
          font-size: 1.5rem;
          text-transform: uppercase;
        }
        .face__image {
          align-self: center;
          height: 100%;
        }
      }
    }
  }
</style>
