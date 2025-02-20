<template>
  <button class="base-button btn"
          :class="[{outline}]">
    <slot/>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  outline: {type: Boolean, default: false}
})
</script>

<style lang="scss" scoped>
.base-button {
  min-height: 48px;
  font-size: 18px;
  font-weight: 500;
  line-height: 21.6px;
  text-align: center;
  background: var(--blue);
  color: #ffff;
  transition: 300ms;

  &:hover {
    background: var(--bs-heading-color);
    border-color: var(--bs-heading-color);
  }

  &.outline {
    border: 2px solid var(--bs-heading-color);
    background: #fff;
    color: var(--bs-heading-color);

    &:hover {
      border-color: var(--blue);
      color: var(--blue);
    }
  }
}
</style>