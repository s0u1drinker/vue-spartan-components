import type { Ref } from 'vue';
import type { IconName, IconSize } from '@components/VscIcon/types';
import type { VscRatingProps } from '../types';

/** Параметры composable useRating. */
export interface UseRatingParams {
  /** Текущее значение рейтинга. */
  current: Ref<number>;
  /** Максимальное значение. */
  max: Ref<NonNullable<VscRatingProps['maxValue']>>;
  /** Иконка. */
  icon: Ref<VscRatingProps['iconName']>;
  /** Флаг переключения установка/показ рейтинга. */
  setRating: Ref<NonNullable<VscRatingProps['setRating']>>;
}

/** Возвращаемое значение composable useRating. */
export interface UseRatingReturn {
  /** Данные валидны. */
  isValidData: Ref<boolean>;
}

/** Возвращаемое значение composable useRatingContextReturn. */
export interface UseRatingContextReturn {
  iconName: IconName;
  iconSize: IconSize;
}
