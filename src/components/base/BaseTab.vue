<template>
  <component :is="tag"
             :class="['base-tab', {active:isActive, filled:isFilled}]">
    <slot/>
  </component>
</template>

<script setup lang="ts">
const props = defineProps({
  tag: {type: String, default: 'div'},
  isActive: {type: Boolean, default: false},
  isFilled: {type: Boolean, default: false},
})
</script>

<style lang="scss" scoped>
.base-tab {
  text-align: center;
  transition: 300ms;

  font-weight: 400;
  background: transparent;
  color: $dark-grey;
  border: 1px solid $dark-grey;
  @include value('font-size', 14px, 20px);
  @include value('border-radius', 4px, 8px);
  @include value('font-size', 15px, 24.2px);
  @include value('padding-top', 4px, 12px);
  @include value('padding-bottom', 4px, 12px);
  @include value('padding-left', 10px, 20px);
  @include value('padding-right', 10px, 20px);

  &.filled {
    background: $dark-grey;
    color: $grey;
  }

  &.active {
    border-color: $green;
    color: $grey;
  }

  &.active.filled {
    background: $yellow;
    border-color: $yellow;
    color: $dark-grey;
  }
}
</style>