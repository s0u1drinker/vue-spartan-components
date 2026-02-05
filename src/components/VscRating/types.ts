import type { IconName, IconSize } from '@components/VscIcon/types';

export type VscRatingProps = {
  /** Имя иконки. */
  iconName: IconName;
  /** Отобразить минимальную версию. */
  minimize?: boolean;
  /** Размер иконки. */
  iconSize?: IconSize;
  /** Максимальное значение. */
  maxValue?: number;
  /** Показывать максимальное значение. */
  showMaxValue?: boolean;
  /** Флаг установки рейтинга. */
  setRating?: boolean;
};

export type VscRatingPropsNames = {
  [K in keyof VscRatingProps]: K;
};

export interface VscRatingIndicatorProps {
  /** Текущее значение. */
  currentValue: number;
  /** Отобразить минимальную версию. */
  minimize: boolean;
  /** Количество иконок для отображения. */
  iconsCount: number;
}

export interface VscRatingIconsProps {
  /** Количество иконок. */
  count: number;
  /** Иконки закрашены. */
  filled?: boolean;
}

export interface VscRatingSetterProps {
  /** Максимальное значение. */
  maxValue: number;
}

interface SetterElement {
  selected: boolean;
  value: number;
}

export type VscRatingSetterElements = SetterElement[];
