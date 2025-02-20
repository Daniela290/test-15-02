<template>
  <header class="default-layout-header container flex flex-justify-between flex-align">
    <h2 class="default-layout-header__title">{{ title }}</h2>

    <div class="default-layout-header__time">{{ date }}</div>
  </header>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useRoute} from "vue-router";
import {getDay, getHoursMin} from "@/utils/time.ts";
import {globalState} from "@/api/global.state.ts";

const route = useRoute()

const title = computed(() => {
  if (route?.params?.id) {
    return `Cекция ${route?.params?.id}`
  }
  return 'Главная'
})

const date = computed(() => {
  return `${getDay(globalState.currentDate)}, ${getHoursMin(globalState.currentDate)}`
})
</script>

<style lang="scss" scoped>
.default-layout-header {
  margin: auto;
  border-bottom: 1px solid #000;
  //background: $primary;
  @include value('padding-left', 30px, 100px);
  @include value('min-height', 60px, 201px);

  &__title {
    margin: 0;
    font-weight: 700;
    text-transform: uppercase;
    @include value('line-height', 40px, 121.02px);
    @include value('font-size', 24px, 100px);
  }

  &__time {
    font-weight: 700;
    @include value('font-size', 16px, 60px);
    @include value('line-height', 36px, 72.61px);
  }
}
</style>