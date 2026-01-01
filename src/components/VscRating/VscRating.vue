<template>
  <div class="vsc-rating">
    <div class="vsc-rating__indicator">
      <VscIcon :icon-name="props.ratingIcon" />
    </div>
    <div class="vsc-rating__value">{{ props.currentValue }}</div>
  </div>
</template>

<script setup lang="ts">
import { VscIcon } from '@components';
import type { VscRatingProps } from './types';

const props: VscRatingProps = withDefaults(defineProps<VscRatingProps>(), {
  maxValue: 5,
  minimize: true,
  showMaxValue: true,
});
</script>

<style lang="scss" scoped>
.vsc-rating {
  &__indicator {
    color: red;
  }

  &__value {
    color: blue;
  }
}
</style>
