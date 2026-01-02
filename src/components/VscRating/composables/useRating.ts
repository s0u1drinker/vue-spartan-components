import { computed } from 'vue';
import type { useRatingParams, useRatingReturn } from './types';

export function useRating(rating: useRatingParams): useRatingReturn {
  const isValidData = computed(() => {
    if (typeof rating.current.value !== 'number' || rating.current.value < 0) {
      console.error(
        `[VscRating]: текущее значение рейтинга <${rating.current.value}> не прошло валидацию.`
      );
      return false;
    }

    if (!rating.max) {
      console.error('[VscRating]: не передано максимальное значение рейтинга.');
      return false;
    }

    if (!rating.icon) {
      console.error('[VscRating]: не передано значение иконки.');
      return false;
    }

    if (rating.max < rating.current.value) {
      console.error(
        '[VscRating]: максимальное значение рейтинга меньше текущего.'
      );
      return false;
    }

    return true;
  });

  return {
    isValidData,
  };
}
