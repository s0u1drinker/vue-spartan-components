import type { InjectionKey } from 'vue';
import type { IconName, IconSize } from '@components/VscIcon/types';
import type { VscRatingPropsNames } from './types';

/** Размер иконки по умолчанию. */
export const DEFAULT_ICON_SIZE = '1rem' as const;

/** Минимальное значение рейтинга. */
export const MIN_RATING_VALUE = 0 as const;

/** Название атрибута, в котором хранится значение рейтинга. */
export const DATA_ATTR_NAME = 'data-rating' as const;

/** Наименования свойств. */
export const RATING_PROP_NAMES = {
  iconName: 'iconName',
  iconSize: 'iconSize',
  maxValue: 'maxValue',
  minimize: 'minimize',
  setRating: 'setRating',
  showMaxValue: 'showMaxValue',
} as const satisfies VscRatingPropsNames;

// Ключи для provide/inject.
export const RATING_KEYS = {
  iconName: Symbol(RATING_PROP_NAMES.iconName) as InjectionKey<IconName>,
  iconSize: Symbol(RATING_PROP_NAMES.iconSize) as InjectionKey<IconSize>,
} as const;

/** Список используемых классов. */
export const CLASSES = {
  main: 'vsc-rating__icon',
  selected: 'vsc-rating__icon_selected',
  filled: 'vsc-rating__icon_filled',
  unfilled: 'vsc-rating__icon_unfilled',
  partial: 'vsc-rating__icon_partial',
} as const;

export const FILLED_PART_CLASSES = [CLASSES.main, CLASSES.filled, CLASSES.partial] as const;
export const UNFILLED_PART_CLASSES = [CLASSES.main, CLASSES.unfilled] as const;

/** Основной класс иконки. */
export const ICON_MAIN_CLASS = {
  name: CLASSES.main,
  selector: `.${CLASSES.main}`,
} as const;
