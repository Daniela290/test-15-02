<template>
  <div class="section-page" v-loading="loading">
    <sections-list :data="data"
                   page-block-selector=".section-page"/>
  </div>
</template>

<script setup lang="ts">
import sectionsServices from "@/api/sections/sections.services.ts";
import {useRoute, useRouter} from "vue-router";
import {onBeforeUnmount, onMounted, provide, type Ref, ref} from "vue";
import {prepareSections} from "@/utils/prepareSections.ts";
import type {SectionItemI} from "@/types/sections.ts";
import SectionsList from "@/components/pages/section/SectionsList.vue";
import Message from "@/components/base/message";

const route = useRoute()
const router = useRouter()
const data: Ref<SectionItemI[]> = ref([])
const loading = ref(false)
let controller = new AbortController()
loadData()

async function loadData() {
  if (controller) {
    controller.abort();
  }
  loading.value = true
  try {
    controller = new AbortController()
    const resp = await sectionsServices.getSectionById(route.params?.id?.toString(), controller.signal)
    console.log(resp)
    if (typeof resp.data !== 'string') {
      data.value = prepareSections(resp.data)
    }else{
      router.push('/')
      Message.error({
        content: "Такой секции нет...",
        duration: 3000,
        close: true
      });
    }
  } catch (e) {
    Message.error({
      content: "Произошла ошибка...",
      duration: 3000,
      close: true
    });
    router.push('/')
    console.log(e)
  } finally {
    loading.value = false
  }
}

const interval = setInterval(loadData, 300000)
onBeforeUnmount(() => {
  clearInterval(interval)
})

function scrollPage(scrollTop: number): void {
  const block = document.querySelector(".section-page")
  if (!block) return
  block.scrollTo({
    behavior: "smooth",
    top: scrollTop
  })
}

provide('scrollPage', scrollPage)
</script>

<style lang="scss" scoped>
.section-page {
  flex-grow: 1;
  overflow: hidden;
}
</style>