import type { Ref } from 'vue';
import type { VscRatingProps } from '../types';

/**
 * Параметры composable useRating.
 */
export interface useRatingParams {
  /**
   * Текущее значение рейтинга.
   */
  current: Ref<VscRatingProps['currentValue']>;
  /**
   * Максимальное значение.
   */
  max: NonNullable<VscRatingProps['maxValue']>;
  /**
   * Иконка.
   */
  icon: VscRatingProps['ratingIcon'];
}

/**
 * Возвращаемое значение composable useRating.
 */
export interface useRatingReturn {
  /**
   * Данные валидны.
   */
  isValidData: Ref<boolean>;
}
