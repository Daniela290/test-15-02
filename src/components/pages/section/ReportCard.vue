<template>
  <div class="report-card" :class="{event:isEvent, active}">
    <div class="report-card__point"></div>

    <div class="report-card__content flex flex-col">
      <progress-bar v-if="active"
                    :start-time="report.time_start as Date"
                    :end-time="report.time_end as Date"
                    class="report-card__progress"/>

      <div class="report-card__time">
        {{ timeStart }} - {{ timeEnd }}

        <still-time v-if="active"
                    :end-time="report.time_end as Date">
          осталось 16 мин
        </still-time>
      </div>

      <div v-if="!isEvent"
           class="report-card__speakers flex">
        <base-slider :slides="report.speakers">
          <template #item="{item}">
            <profile-info :active="active"
                          :img="report.speakers_photo as string"
                          :speaker="item as SectionSpeakerI"/>
          </template>
        </base-slider>
      </div>

      <div class="report-card__title">
        {{ report.title }}
      </div>

      <div v-if="!isEvent"
           class="report-card__footer flex flex-wrap">
        <base-tab is-filled :is-active="active">{{ report?.event_type }}</base-tab>
        <base-tab :is-active="active">{{ report?.lang }}</base-tab>
        <base-tab :is-active="active">{{ report?.theme }}</base-tab>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, type PropType, ref} from "vue";
import type {SectionItemI, SectionSpeakerI} from "@/types/sections.ts";
import ProfileInfo from "@/components/base/BaseProfileInfo.vue";
import BaseTab from "@/components/base/BaseTab.vue";
import {getHoursMin} from "@/utils/time.ts";
import ProgressBar from "@/components/base/TimeProgressBar.vue";
import StillTime from "@/components/pages/section/StillTime.vue";
import BaseSlider from "@/components/pages/section/SpeakersSlider.vue";

const props = defineProps({
  report: {type: Object as PropType<SectionItemI>, required: true},
  active: {type: Boolean, default: false},
})
const isEvent = computed(() => {
  return props.report?.speakers?.length === 0
})

const timeEnd = computed(() => getHoursMin(props.report?.time_end as Date))
const timeStart = computed(() => getHoursMin(props.report?.time_start as Date))

</script>

<style lang="scss" scoped>
.report-card {
  overflow: hidden;
  position: relative;
  color: $dark-grey;
  @include value('padding-left', 15px, 70px);

  :deep(.keen-slider__slide) {
    //width: ;
    //@include value('max-width', 260px, 420px);
    //@include value('min-width', 200px, 370px);
  }

  &__content {
    background: $grey;
    overflow: hidden;
    position: relative;
    @include value('border-radius', 10px, 32px);
    @include value('padding-top', 12px, 26px);
    @include value('padding-bottom', 12px, 30px);
    @include value('padding-left', 12px, 30px);
    @include value('padding-right', 12px, 30px);
    @include value('gap', 12px, 30px);
  }

  &__time {
    font-weight: 700;
    white-space: nowrap;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    @include value('font-size', 18px, 60px);
    @include value('line-height', 20px, 60.61px);

    .end-time {
    }
  }

  &__title {
    font-weight: 700;
    @include value('font-size', 14px, 48px);
    @include value('line-height', 25px, 58.09px);
  }

  &__speakers {
    @include value('width', calc(100% + 12px), calc(100% + 30px));
  }

  &__footer {
    @include value('gap', 10px, 33px);
  }

  &__point {
    position: absolute;
    display: flex;
    align-items: center;
    left: 0;
    @include value('top', 16px, 53px);
    @include value('width', 15px, 70px);

    &::before {
      content: '';
      display: block;
      border-radius: 50%;
      border-style: solid;
      border-color: $grey-c1;
      @include value('border-width', 3px, 7px);
      @include value('width', 8px, 20px);
      @include value('height', 8px, 20px);
    }

    &::after {
      content: '';
      display: block;
      flex-grow: 1;
      background: $grey-c1;
      margin-left: -1px;
      @include value('height', 1px, 3px);
      @include value('width', 8px, 51px);
    }
  }

  &__progress {
    position: absolute;
    top: 0;
    left: 0;
  }

  &.event {
    .report-card {
      &__content {
        border-color: $grey-c1;
        border-style: solid;
        background: transparent;
        flex-direction: row;
        align-items: center;
        @include value('padding-top', 8px, 20px);
        @include value('padding-bottom', 8px, 20px);
        @include value('border-width', 1px, 3px);
        @media screen and (max-width: 500px) {
          flex-wrap: wrap;
        }
      }

      &__point {
        @include value('top', 15px, 40px);
      }

      &__title {
        font-weight: 400;
        @include value('font-size', 14px, 46px);
        @include value('line-height', 15px, 55.67px);
      }
    }
  }

  &.active {
    color: #fff;

    .report-card {
      &__content {
        background: $primary;
        @include value('padding-top', 22px, 36px);
      }

      &__point {
        &::before {
          border-color: $green;
        }

        &::after {
          background: $green;
        }
      }
    }
  }

  &.active.event {
    color: $dark-grey;

    .report-card {
      &__content {
        border-color: $green;
        background: transparent;
      }

      &__time {
        width: 100%;
      }

      &__content {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  }
}
</style>