<template>
  <div class="vsc-rating__indicator">
    <VscRatingIcons
      :count="iconsFilledCount"
      filled
    />
    <template v-if="!props.minimize">
      <VscRatingPartialIcon
        v-if="partiallyFilledValue > 0"
        :partial-value="partiallyFilledValue"
      />
      <VscRatingIcons
        v-if="iconsUnfilledCount"
        :count="iconsUnfilledCount"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import VscRatingIcons from './VscRatingIcons.vue';
  import VscRatingPartialIcon from './VscRatingPartialIcon.vue';
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
  }
</style>
