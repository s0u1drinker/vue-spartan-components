import { computed } from 'vue';
import { isNonNegativeNumber, isPositiveNumber } from '@utils';
import type { UseRatingParams, UseRatingReturn } from './types';

export function useRating(rating: UseRatingParams): UseRatingReturn {
  /** Текущее значение правильное. */
  const isValidCurrentValue = computed(() => {
    if (!isNonNegativeNumber(rating.current.value)) {
      console.error(
        `[VscRating]: текущее значение рейтинга <${rating.current.value}> не число или < 0.`
      );
      return false;
    }

    return true;
  });

  /** Максимальное значение правильное. */
  const isValidMaxValue = computed(() => {
    if (!isPositiveNumber(rating.max.value)) {
      console.error(
        `[VscRating]: максимальное значение рейтинга <${rating.max.value}> не число или <= 0.`
      );
      return false;
    }

    return true;
  });

  /** Значение иконки верное. */
  const isValidIcon = computed(() => {
    if (!rating.icon.value) {
      console.error('[VscRating]: не передано значение иконки.');
      return false;
    }

    return true;
  });

  /** Логика работы компонента не нарушена. */
  const isValidLogic = computed(() => {
    if (rating.max.value < rating.current.value) {
      console.error(
        '[VscRating]: максимальное значение рейтинга меньше текущего.'
      );
      return false;
    }

    return true;
  });

  // Проверки, не мешающие работе компонента.
  if (rating.setRating.value && rating.current.value !== 0) {
    rating.current.value = 0;
    console.warn(
      `[VscRating]: при установленном флаге "setRating" текущее значение должно быть равно 0 (передано: ${rating.current.value}).`
    );
  }

  /** Данные валидны. */
  const isValidData = computed(() => {
    return (
      isValidCurrentValue.value &&
      isValidMaxValue.value &&
      isValidIcon.value &&
      isValidLogic.value
    );
  });

  return {
    isValidData,
  };
}
