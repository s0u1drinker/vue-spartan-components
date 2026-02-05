<template>
  <div
    :class="ratingClasses"
    v-if="isValidData"
  >
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
      <template v-if="props.showMaxValue">
        {{ `/ ${props.maxValue}` }}
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineAsyncComponent, toRef, computed, provide } from 'vue';
  import { useRating } from './composables/useRating';
  import { MIN_RATING_VALUE, RATING_PROP_NAMES, RATING_KEYS, DEFAULT_ICON_SIZE } from './constants';
  import type { VscRatingProps } from './types';
  const VscRatingIndicator = defineAsyncComponent(() => import('./VscRatingIndicator.vue'));
  const VscRatingSetter = defineAsyncComponent(() => import('./VscRatingSetter.vue'));

  const props = withDefaults(defineProps<VscRatingProps>(), {
    maxValue: 5,
    minimize: false,
    showMaxValue: false,
    iconSize: DEFAULT_ICON_SIZE,
    setRating: false,
  });

  /** Текущее значение. */
  const currentValue = defineModel<number>({ default: MIN_RATING_VALUE });

  const { isValidData } = useRating({
    current: currentValue,
    icon: toRef(props, RATING_PROP_NAMES.iconName),
    max: toRef(props, RATING_PROP_NAMES.maxValue),
    setRating: toRef(props, RATING_PROP_NAMES.setRating),
  });

  const ratingClasses = computed(() => ['vsc-rating', { 'vsc-rating_minimize': props.minimize }]);

  /** Количество иконок. */
  const iconsCount = computed<number>(() => {
    return props.minimize ? 1 : props.maxValue;
  });

  // Если данные валидны, то отправляем данные об иконке потомкам.
  if (isValidData.value) {
    provide(RATING_KEYS.iconName, props.iconName);
    provide(RATING_KEYS.iconSize, props.iconSize);
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
    --vsc-rating-gap-minimize: var(--vsc-indent-half);
    --vsc-rating-icon-color: transparent;
    --vsc-rating-icon-color-filled: var(--vsc-warning);
    --vsc-rating-icon-color-unfilled: transparent;
    --vsc-rating-icon-color-selected: color-mix(
      in srgb,
      var(--vsc-rating-icon-color-filled),
      transparent 60%
    );
    --vsc-rating-stroke-color: var(--vsc-rating-icon-color-filled);
    --vsc-rating-stroke-width: 1px;

    display: flex;
    gap: var(--vsc-rating-gap);
    align-items: center;

    &_minimize {
      gap: var(--vsc-rating-gap-minimize);
    }

    :deep(.vsc-rating__icon) {
      color: var(--vsc-rating-icon-color);
      stroke: var(--vsc-rating-stroke-color);
      stroke-width: var(--vsc-rating-stroke-width);
    }

    :deep(.vsc-rating__icon_selected) {
      color: var(--vsc-rating-icon-color-selected);
    }

    :deep(.vsc-rating__icon_filled) {
      color: var(--vsc-rating-icon-color-filled);
    }

    :deep(.vsc-rating__icon_unfilled) {
      color: var(--vsc-rating-icon-color-unfilled);
    }

    :deep(.vsc-rating__icon_partial) {
      position: absolute;
      left: 0;
      top: 0;
    }
  }
</style>
