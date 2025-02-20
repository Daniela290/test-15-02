<template>
  <div class="profile-info flex flex-col flex-justify"
       :class="{active}">
    <img :src="img" class="profile-info__image"/>

    <div class="profile-info__name">{{ speaker.name }}</div>
    <div class="profile-info__company">{{ speaker.company }}</div>
  </div>
</template>

<script setup lang="ts">
import type {PropType} from "vue";
import type {SectionSpeakerI} from "@/types/sections.ts";

const props = defineProps({
  speaker: {type: Object as PropType<SectionSpeakerI>, required: true},
  img: {type: String, default: null},
  active: {type: Boolean, default: false}
})
</script>

<style lang="scss" scoped>
.profile-info {
  position: relative;
  width: 100%;
  @include value('padding-left', 48px, 150px);
  @include value('min-height', 40px, 140px);

  &__name {
    font-weight: 500;
    text-overflow: ellipsis;
    overflow: hidden;
    @include value('font-size', 14px, 28px);
    @include value('line-height', 16px, 33.89px);
  }

  &__company {
    font-weight: 400;
    text-overflow: ellipsis;
    overflow: hidden;
    @include value('font-size', 12px, 20px);
    @include value('line-height', 16px, 24.2px);
  }

  &__image {
    position: absolute;
    border-radius: 50%;
    opacity: .4;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    transition: 300ms;
    @include value('width', 40px, 140px);
    @include value('height', 40px, 140px);
  }

  &.active &__image {
    opacity: 1;
  }
}
</style>