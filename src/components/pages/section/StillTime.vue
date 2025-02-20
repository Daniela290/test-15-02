<template>
  <div class="still-time">
   {{ stillTime }}
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {getDifference} from "@/utils/time.ts";
import {globalState} from "@/api/global.state.ts";

const props = defineProps({
  endTime: {type: Date, default: null}
})

const stillTime = computed(() => {
  let str = 'осталось '
  const {hours, minutes} = getDifference(props.endTime, globalState.currentDate) || {}
  if(!!hours){
    str+=` ${hours}ч`;
  }
  if(!!minutes){
    str+=` ${minutes}мин`
  }
  return str
})

</script>

<style lang="scss" scoped>
.still-time {
  font-weight: 400;
  line-height: normal;
  @include value('font-size', 10px, 24px);
  @include value('margin-right', -10px, -28px);
}
</style>