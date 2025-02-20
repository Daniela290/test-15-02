<template>
  <!-- message list -->
  <Transition name="slide-fade">
    <div class="message-container" v-show="visible">
      <!-- content -->
      <div class="message-content"
           :class="[config?.type||localConfig?.type]">
        <!-- message text -->
        <span v-text="config?.content"></span>

        <!-- click to close -->
        <div class="option" v-if="config?.close">
          <i class="ri-close-fill" @click="onClose"></i>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import {type PropType, type Ref, ref} from 'vue';
import type {ConfigI} from "@/components/base/message/types.ts";


const props = defineProps({
  config: {type: Object as PropType<ConfigI | undefined>, default: () => undefined}, // message config
  remove: {type: Function, default: () => undefined} // callback of remove message
});
const localConfig: Ref<ConfigI | undefined | null> = ref(null)

const visible = ref(false);

const onClose = () => {
  visible.value = false;
  setTimeout(() => {
    if (props.remove) {
      props.remove();
    }
  }, 200);
};

const onOpen = (config: ConfigI) => {
  localConfig.value = config
  setTimeout(() => {
    visible.value = true;
  }, 10);

  // remove message in duration
  if (config.duration !== 0) {
    setTimeout(() => {
      onClose();
    }, config.duration);
  }
};

onOpen(props.config as ConfigI);
</script>

<style lang="scss">
$radius: 4px;
$normalHeight: 34px;

.message {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  z-index: 9999;
  transform: translateZ(9999px);
  padding-top: 28px;
  transition: top 0.4s ease;

  .message-container {
    margin-bottom: 14px;

    .message-content {
      display: inline-block;
      padding: 0 18px;
      height: $normalHeight;
      text-align: left;
      line-height: $normalHeight;
      font-size: 14px;
      font-weight: 400;
      border-radius: $radius;
      border: 1px solid $grey-c1;
      color: $dark-grey;
      background: $grey;

      &.error {
        background: #ff8b89;
        color: #fff;
        border-color: red;
      }
      &.success {
        background: #6afd64;
        color: #fff;
        border-color: #0ebb01;
      }

      .option {
        display: inline-block;
        pointer-events: all;
        margin-left: 18px;

        i {
          font-size: 18px;
          font-weight: 400;
          margin-top: -3px;
          display: inline-block;
          box-sizing: border-box;
          vertical-align: middle;
          cursor: pointer;
          color: #d9d9d9;
          transition: color 0.2s ease;

          &:hover {
            color: #ff7c75;
            transition: color 0.2s ease;
          }
        }
      }
    }
  }
}

.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}
</style>