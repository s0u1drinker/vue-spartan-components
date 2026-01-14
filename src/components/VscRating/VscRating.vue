<template>
  <div class="vsc-rating" v-if="isValidData">
    <VscRatingSetter
      v-if="props.setRating"
      :max-value="props.maxValue"
      @update-rating="updateRatingValue"
    />
    <VscRatingIndicator
      v-else
      :current-value="currentValue"
      :minimize="props.minimize"
      :iconsCount
    />
    <div class="vsc-rating__value">
      {{ currentValue }}
      <template v-if="props.showMaxValue">{{ `/ ${props.maxValue}` }}</template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, toRef, computed, provide } from 'vue';
import { useRating } from './composables/useRating';
import type { VscRatingProps } from './types';
// Lazy components.
const VscRatingIndicator = defineAsyncComponent(
  () => import('./VscRatingIndicator.vue')
);
const VscRatingSetter = defineAsyncComponent(
  () => import('./VscRatingSetter.vue')
);

const props = withDefaults(defineProps<VscRatingProps>(), {
  maxValue: 5,
  minimize: false,
  showMaxValue: false,
  iconSize: '1rem',
  setRating: false,
});

/** Текущее значение. */
const currentValue = defineModel<number>({ default: 0 });

const { isValidData } = useRating({
  current: currentValue,
  icon: toRef(props, 'iconName'),
  max: toRef(props, 'maxValue'),
  setRating: toRef(props, 'setRating'),
});

/** Количество иконок. */
const iconsCount = computed<number>(() => {
  return props.minimize ? 1 : props.maxValue;
});

// Если данные валидны, то отправляем данные об иконке потомкам.
if (isValidData.value) {
  provide('iconName', props.iconName);
  provide('iconSize', props.iconSize);
}

/**
 * Обновляет значение рейтинга.
 * @param newRatingValue Новое значение.
 */
function updateRatingValue(newRatingValue: number) {
  currentValue.value = newRatingValue;
}
</script>

<style lang="scss" scoped>
.vsc-rating {
  --vsc-rating-gap: var(--vsc-indent);
  --vsc-rating-stroke-color: var(--vsc-rating-icon-color);
  --vsc-rating-stroke-width: 1px;
  --vsc-rating-icon-color: var(--vsc-warning);
  --vsc-rating-icon-color-light: color-mix(
    in srgb,
    var(--vsc-rating-icon-color),
    transparent 60%
  );
  --vsc-rating-icon-color-unfilled: transparent;
  --vsc-rating-icon-color-selected: var(--vsc-rating-icon-color-light);
  --vsc-rating-icon-color-hover: var(--vsc-rating-icon-color);

  display: flex;
  gap: var(--vsc-rating-gap);
  align-items: center;
}
</style>
