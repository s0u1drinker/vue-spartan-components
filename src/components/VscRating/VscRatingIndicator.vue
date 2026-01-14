<template>
  <div class="vsc-rating__indicator">
    <VscRatingIndicatorIcons :count="iconsFilledCount" />
    <template v-if="!props.minimize">
      <VscRatingIndicatorIconPartial
        v-if="partiallyFilledValue > 0"
        :partial-value="partiallyFilledValue"
      />
      <VscRatingIndicatorIcons v-if="iconsUnfilledCount" :count="iconsUnfilledCount" unfilled />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import VscRatingIndicatorIcons from './VscRatingIndicatorIcons.vue';
import VscRatingIndicatorIconPartial from './VscRatingIndicatorIconPartial.vue';
import type { VscRatingIndicatorProps } from './types';

const props = defineProps<VscRatingIndicatorProps>();
/** Количество заполненных иконок. */
const iconsFilledCount = computed<number>(() => {
  return props.minimize ? 1 : Math.trunc(props.currentValue);
});
/** Стиль для частично заполненной иконки. */
const partiallyFilledValue = computed<number>(() => {
  return props.currentValue % 1;
});
/** Количество незаполненных иконок. */
const iconsUnfilledCount = computed<number>(() => {
  return props.iconsCount - Math.ceil(props.currentValue);
});
</script>

<style lang="scss" scoped>
.vsc-rating__indicator {
  display: flex;

  :deep(.vsc-rating__icon) {
    color: var(--vsc-rating-icon-color);
    stroke: var(--vsc-rating-stroke-color);
    stroke-width: var(--vsc-rating-stroke-width);
  }

  :deep(.vsc-rating__icon_unfilled) {
    color: var(--vsc-rating-icon-color-unfilled);
  }
}
</style>
