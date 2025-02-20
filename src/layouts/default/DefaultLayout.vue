<template>
  <div class="default-layout">
    <default-layout-header/>

    <main class="default-layout__main container"
          :style="{overflowY: route.params?.id?'hidden':'auto'}">
      <router-view/>
    </main>

    <default-layout-footer/>
  </div>
</template>

<script setup lang="ts">
import DefaultLayoutHeader from "@/layouts/default/components/DefaultLayoutHeader.vue";
import DefaultLayoutFooter from "@/layouts/default/components/DefaultLayoutFooter.vue";
import {useRoute} from "vue-router";

const route = useRoute()
</script>

<style lang="scss" scoped>
.default-layout {
  height: 100%;

  display: flex;
  flex-direction: column;

  &__header {
  }

  &__main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>