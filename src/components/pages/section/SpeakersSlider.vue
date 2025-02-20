<template>
  <div ref="container" class="keen-slider base-slider">
    <div v-for="(item, i) in slides"
         class="keen-slider__slide"
         :key="i">
      <slot name="item" :item="item"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useKeenSlider} from "keen-slider/vue";

const props = defineProps({
  autoplay: {type: Boolean, default: true},
  slides: {type: Array, default: () => ([])}
})

const [container, slider] = useKeenSlider({
  loop: true,
  slides: {
    perView: 2
  },
  drag: false
}, [])

const interval = setInterval(() => {
  slider.value?.next()
}, 10000)
</script>

<style lang="scss" scoped>
.base-slider {

}
</style>