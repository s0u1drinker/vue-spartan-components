import type { IconName } from '@components/VscIcon/types';

export interface VscRatingProps {
  /**
   * Имя иконки.
   */
  ratingIcon: IconName;
  /**
   * Текущее значение.
   */
  currentValue: number;
  /**
   * Максимальное значение.
   */
  maxValue?: number;
  /**
   * Отобразить минимальную версию.
   */
  minimize?: boolean;
  /**
   * Показывать максимальное значение.
   */
  showMaxValue?: boolean;
}
