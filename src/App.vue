<template>
  <default-layout>
    <RouterView/>
  </default-layout>
</template>

<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import DefaultLayout from "@/layouts/default/DefaultLayout.vue";
import {calcScaleCoeff, globalState} from "@/api/global.state.ts";
import {onBeforeUnmount} from "vue";

calcScaleCoeff()

const interval = setInterval(() => {
  globalState.currentDate = new Date();
}, globalState.updateTimeDelay)

onBeforeUnmount(()=>{
  clearInterval(interval)
})
</script>

<style scoped lang="scss">
</style>
