<template>
  <div class="time-progress-bar">
    <div class="time-progress-bar__line"
         :style="{width:`${progress}%`, animationDuration:`${duration}ms`}"></div>
  </div>
</template>

<script setup lang="ts">
import {computed, onBeforeUnmount, ref, watch} from "vue";
import {globalState} from "@/api/global.state.ts";

const props = defineProps({
  duration: {type: Number},
  startTime: {type: [Date, Number]},
  endTime: {type: [Date, Number]},
})
const currentDate = globalState.currentDate

const progress = computed(() => {
  const end = (props?.endTime as Date).getTime()
  const start = (props.startTime as Date).getTime()
  const current = (currentDate).getTime() - start
  const totalTime = (end - start)
  return Math.floor(100 * current / totalTime)
})

const duration = computed(() => {
  const end = (props?.endTime as Date).getTime()
  const current = currentDate.getTime()
  return Math.ceil((end - current) / globalState.updateTimeDelay) * globalState.updateTimeDelay
})
</script>

<style lang="scss" scoped>
.time-progress-bar {
  width: 100%;
  background: $dark-grey;
  @include value('height', 8px, 20px);

  &__line {
    height: 100%;
    background: $green;
    transition: all 100ms;
    animation: tmp linear;
    @keyframes tmp {
      100% {
        width: 100%
      }
    }
  }
}
</style>