<template>
  <div class="vsc-rating__setter" @click="handleClick($event)">
    <VscIcon
      :class="[
        'vsc-rating__icon_border',
        { 'vsc-rating__icon_selected': elem.selected },
      ]"
      :icon-name="iconName"
      :size="iconSize"
      v-for="elem of elementsArray"
      :data-rating="elem.value"
      :key="`border-icon-${elem.value}`"
    />
  </div>
</template>

<script setup lang="ts">
import { inject, reactive, onBeforeMount } from 'vue';
import { VscIcon } from '@components';
import type { VscRatingSetterProps, VscRatingSetterElements } from './types';
import type { IconName, IconSize } from '@components/VscIcon/types';

const iconName = inject('iconName') as IconName;
const iconSize = inject('iconSize') as IconSize;

const props = defineProps<VscRatingSetterProps>();

const emit = defineEmits<{
  /** Обновление рейтинга. */
  (e: 'updateRating', value: number): void;
}>();

const elementsArray = reactive<VscRatingSetterElements>([]);
/**
 * Обработчик клика по иконке.
 * @param event СОбытие.
 */
const handleClick = (event: PointerEvent): void => {
  const target = event.target;

  if (target instanceof Element) {
    /** Родительский элемент. */
    const parent = target.closest('.vsc-rating__icon_border');

    if (parent) {
      /** Значение рейтинга. */
      const dataRating = Number(parent.getAttribute('data-rating'));

      selectElementsTo(dataRating);
      emit('updateRating', dataRating);
    }
  }
};
/**
 * Устанавливает флаг "selected" у элементов до значения (включительно).
 * @param selectedValue Выбранное значение.
 */
const selectElementsTo = (selectedValue: number): void => {
  elementsArray.forEach(
    (elem) => (elem.selected = elem.value <= selectedValue)
  );
};

onBeforeMount(() => {
  /** Заполняем массив элементов начальными значениями. */
  for (let i = 0; i < props.maxValue; i++) {
    elementsArray.push({
      selected: false,
      value: i + 1,
    });
  }
});
</script>

<style lang="scss" scoped>
.vsc-rating__setter {
  display: flex;

  &:hover {
    .vsc-rating__icon_border {
      color: var(--vsc-rating-icon-color-hover);
    }
  }
}

.vsc-rating__icon_border {
  color: transparent;
  stroke: var(--vsc-rating-stroke-color);
  stroke-width: var(--vsc-rating-stroke-width);
  cursor: pointer;

  &:hover {
    & ~ .vsc-rating__icon_border {
      color: transparent;
    }

    & ~ .vsc-rating__icon_selected {
      color: var(--vsc-rating-icon-color-selected);
    }
  }
}

.vsc-rating__icon_selected {
  color: var(--vsc-rating-icon-color-selected);
}
</style>
