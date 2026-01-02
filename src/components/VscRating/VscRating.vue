<template>
  <div class="vsc-rating" v-if="isValidData">
    <div class="vsc-rating__indicator">
      <VscIcon
        :icon-name="props.ratingIcon"
        v-for="i in props.maxValue"
        :key="`icon-${i}`"
      />
    </div>
    <div class="vsc-rating__value">
      {{
        `${props.currentValue}${props.showMaxValue ? `/${props.maxValue}` : ''}`
      }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue';
import { VscIcon } from '@components';
import { useRating } from './composables/useRating';
import type { VscRatingProps } from './types';

const props = withDefaults(defineProps<VscRatingProps>(), {
  maxValue: 5,
  minimize: true,
  showMaxValue: true,
});

const { isValidData } = useRating({
  current: toRef(props, 'currentValue'),
  icon: props.ratingIcon,
  max: props.maxValue,
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
