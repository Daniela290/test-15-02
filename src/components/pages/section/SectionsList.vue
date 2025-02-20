<template>
  <div class="sections-list">
    <div v-for="(el, i) in data"
         :class="{'sections-list-active':i === activeItem}"
         class="sections-list__item">
      <report-card :report="el"
                   :active="i === activeItem"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import ReportCard from "@/components/pages/section/ReportCard.vue";
import {computed, inject, onBeforeUnmount, onMounted, type PropType, ref, watch} from "vue";
import type {SectionItemI} from "@/types/sections.ts";
import {globalState} from "@/api/global.state.ts";
import Message from "@/components/base/message";

const props = defineProps({
  data: {type: Array as PropType<SectionItemI[]>, default: () => ([])},
  pageBlockSelector: {type: String, default: ".section-page"},
})

const activeItem = computed(() => {
  return props.data
      ?.findIndex((el) => (el?.time_start as Date) <= globalState.currentDate
          && (el?.time_end as Date) > globalState.currentDate);
})

const scrollPage = inject('scrollPage')

onMounted(() => {
  setTimeout(() => {
    handleScroll()
  }, 100)

  window.addEventListener("resize", handleScroll)
})
onBeforeUnmount(() => {
  window.removeEventListener("resize", handleScroll)
})

function handleScroll() {
  const pageBlock = document.querySelector(props.pageBlockSelector)
  const activIndx = activeItem.value === -1 ? 0 : activeItem.value
  const section = document.querySelectorAll(".sections-list__item")?.[activIndx];

  if (!section || !pageBlock) return
  const {top} = section.getBoundingClientRect() as DOMRect
  const {top: blTop} = pageBlock.getBoundingClientRect() as DOMRect

  (scrollPage as Function)(top - blTop + pageBlock.scrollTop)
}

watch(() => activeItem.value, () => {
  handleScroll()
  if (activeItem.value === -1) {
    Message.success({
      content: "На сегодня все.",
      duration: 3000,
      close: true
    });
  }
})
</script>

<style lang="scss" scoped>
.sections-list {
  transition: 200ms;

  &__item {
    @include value('margin-bottom', 20px, 60px);
  }
}
</style>