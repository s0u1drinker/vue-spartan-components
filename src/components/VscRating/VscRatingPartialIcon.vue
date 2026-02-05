<template>
  <div class="vsc-rating__partial-icon">
    <VscIcon
      :class="FILLED_PART_CLASSES"
      :icon-name="iconName"
      :size="iconSize"
      :style="filledPartStyle"
    />
    <VscIcon
      :class="UNFILLED_PART_CLASSES"
      :icon-name="iconName"
      :size="iconSize"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { VscIcon } from '@components';
  import { useRatingContext } from './composables/useRatingContext';
  import { FILLED_PART_CLASSES, UNFILLED_PART_CLASSES } from './constants';

  const { iconName, iconSize } = useRatingContext();

  const props = defineProps<{
    /** Дробное значение. */
    partialValue: number;
  }>();

  /** Нормализованное значение для вычислений. */
  const normalizedValue = computed(() => {
    return props.partialValue * 100;
  });
  /** Левая (закрашена) часть иконки. */
  const filledPartStyle = computed(() => ({
    clipPath: `polygon(0 0, ${normalizedValue.value}% 0, ${normalizedValue.value}% 100%, 0 100%)`,
  }));
</script>

<style lang="scss" scoped>
  .vsc-rating__partial-icon {
    display: flex;
    position: relative;
  }
</style>
