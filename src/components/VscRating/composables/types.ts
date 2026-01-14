import type { Ref } from 'vue';
import type { VscRatingProps } from '../types';

/** Параметры composable useRating. */
export interface useRatingParams {
  /** Текущее значение рейтинга. */
  current: Ref<number>;
  /** Максимальное значение. */
  max: Ref<NonNullable<VscRatingProps['maxValue']>>;
  /** Иконка. */
  icon: Ref<VscRatingProps['iconName']>;
  /** Флаг переключения установка/показ рейтинга. */
  setRating: Ref<VscRatingProps['setRating']>;
}

/** Возвращаемое значение composable useRating. */
export interface useRatingReturn {
  /** Данные валидны. */
  isValidData: Ref<boolean>;
}
