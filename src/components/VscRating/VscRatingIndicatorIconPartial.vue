<template>
  <div class="vsc-rating__partial-icon">
    <VscIcon
      class="vsc-rating__icon vsc-rating__icon_partial"
      :icon-name="iconName"
      :size="iconSize"
      :style="filledPartStyle"
    />
    <VscIcon
      class="vsc-rating__icon vsc-rating__icon_unfilled"
      :icon-name="iconName"
      :size="iconSize"
    />
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue';
import { VscIcon } from '@components';
import type { IconName, IconSize } from '@components/VscIcon/types';

const iconName = inject('iconName') as IconName;
const iconSize = inject('iconSize') as IconSize;

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

.vsc-rating__icon_partial {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
