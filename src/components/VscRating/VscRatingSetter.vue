<template>
  <div
    class="vsc-rating__setter"
    role="radiogroup"
    tabindex="0"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <VscIcon
      v-for="elem of elementsArray"
      :key="`border-icon-${elem.value}`"
      :class="getIconClasses(elem.selected)"
      :icon-name="iconName"
      :size="iconSize"
      :data-rating="elem.value"
    />
  </div>
</template>

<script setup lang="ts">
  import { reactive, onBeforeMount, computed } from 'vue';
  import { VscIcon } from '@components';
  import { useRatingContext } from './composables/useRatingContext';
  import { KEY_ARROWS } from '@constants';
  import { MIN_RATING_VALUE, DATA_ATTR_NAME, CLASSES, ICON_MAIN_CLASS } from './constants';
  import type { VscRatingSetterProps, VscRatingSetterElements } from './types';

  const { iconName, iconSize } = useRatingContext();

  const props = defineProps<VscRatingSetterProps>();

  const emit = defineEmits<{
    /** Обновление рейтинга. */
    (e: 'updateRating', value: number): void;
  }>();

  /** Список элементов. */
  const elementsArray = reactive<VscRatingSetterElements>([]);

  /** Количество выделенных иконок. */
  const selectedElementsCount = computed<number>(() => {
    return elementsArray.filter((el) => el.selected).length;
  });

  /**
   * При клике по иконке забирает значение рейтинга из атрибута
   * и устанавливает его в качестве нового значения.
   * @param event Событие.
   */
  const handleClick = (event: PointerEvent): void => {
    const target = event.target;

    if (target instanceof Element) {
      /** Родительский элемент. */
      const parent = target.closest(ICON_MAIN_CLASS.selector);

      if (parent) {
        /** Значение рейтинга. */
        const dataRating = Number(parent.getAttribute(DATA_ATTR_NAME));

        setNewRatingValue(dataRating);
      }
    }
  };

  /**
   * Обработчик нажатия на клавишу.
   * @param event
   */
  const handleKeydown = (event: KeyboardEvent): void => {
    const currentValue = selectedElementsCount.value;

    // Если нажата стрелка влево и текущее значение больше минимального.
    if (event.key === KEY_ARROWS.left && currentValue > MIN_RATING_VALUE) {
      setNewRatingValue(currentValue - 1);
    }

    // Если нажата стрелка вправо и текущее значение меньше максимального.
    if (event.key === KEY_ARROWS.right && currentValue < props.maxValue) {
      setNewRatingValue(currentValue + 1);
    }
  };

  /**
   * Задаёт новое значение рейтинга.
   * @param value Значение.
   */
  const setNewRatingValue = (value: number): void => {
    selectElementsTo(value);
    emit('updateRating', value);
  };

  /**
   * Устанавливает флаг "selected" у элементов до значения (включительно).
   * @param selectedValue Выбранное значение.
   */
  const selectElementsTo = (selectedValue: number): void => {
    elementsArray.forEach((elem) => (elem.selected = elem.value <= selectedValue));
  };

  /**
   * Классы иконки.
   * @param isSelected Иконка выбрана.
   */
  const getIconClasses = (isSelected: boolean) => {
    return [ICON_MAIN_CLASS.name, { [CLASSES.selected]: isSelected }];
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
      .vsc-rating__icon {
        color: var(--vsc-rating-icon-color-filled);
        cursor: pointer;
      }
    }

    @include focus-visible(var(--vsc-rating-icon-color-filled));

    .vsc-rating__icon {
      &:hover {
        & ~ .vsc-rating__icon {
          color: var(--vsc-rating-icon-color-unfilled);
        }

        & ~ .vsc-rating__icon_selected {
          color: var(--vsc-rating-icon-color-selected);
        }
      }
    }
  }
</style>
