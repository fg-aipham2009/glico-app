<template>
  <div id="overlay">
    <div class="spinner">
      <span class="loading-ajax"></span>
    </div>
  </div>
</template>
<script>
export default {
  name: "SpinnerLoading"
};
</script>
<style lang="scss">
#overlay {
  position: fixed;
  top: 0;
  z-index: 99999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  .spinner {
    position: relative;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    --width-spinner: 40px;
    .loading-ajax {
      width: var(--width-spinner);
      height: var(--width-spinner);
      border: 4px #ddd solid;
      border-top-color: #518ef5;
      border-radius: 50%;
      animation: sp-anime 0.8s infinite linear;
    }
    @keyframes sp-anime {
      100% {
        transform: rotate(360deg);
      }
    }
  }
}
</style>
