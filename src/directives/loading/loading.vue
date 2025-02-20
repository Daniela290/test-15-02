<template>
  <div class="loading-container">
    <div class="loading-container__content">
      <div class="loading-container__circle">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <circle fill="none" stroke-opacity="1" stroke="#FF156D" stroke-width=".5" cx="100" cy="100" r="0">
            <animate attributeName="r" calcMode="spline" dur="2" values="1;80" keyTimes="0;1" keySplines="0 .2 .5 1"
                     repeatCount="indefinite"></animate>
            <animate attributeName="stroke-width" calcMode="spline" dur="2" values="0;25" keyTimes="0;1"
                     keySplines="0 .2 .5 1" repeatCount="indefinite"></animate>
            <animate attributeName="stroke-opacity" calcMode="spline" dur="2" values="1;0" keyTimes="0;1"
                     keySplines="0 .2 .5 1" repeatCount="indefinite"></animate>
          </circle>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.loading-container {
  transition: 300ms;

  &__content {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 66;
    background: rgba(#fff, .6);

    animation: tmp 200ms;

    @keyframes tmp {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }

  &__circle {
    position: absolute;
    inset: 50%;
    height: 70px;
    border-radius: 50%;
    width: 70px;
    transform: translateX(-50%) translateY(-50%);

    circle {
      stroke: $primary;
    }
  }
}
</style>