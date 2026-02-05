import { inject } from 'vue';
import { RATING_KEYS, DEFAULT_ICON_SIZE } from '../constants';
import type { UseRatingContextReturn } from './types';

export function useRatingContext(): UseRatingContextReturn {
  const iconName = inject(RATING_KEYS.iconName);
  const injectedSize = inject(RATING_KEYS.iconSize);

  if (!iconName) {
    throw new Error(`[VscRating]: компоненту не передан размер иконки (${iconName}).`);
  }

  const iconSize = injectedSize || DEFAULT_ICON_SIZE;

  if (!injectedSize) {
    console.warn(
      `[VscRating]: компоненту не передан размер иконки (${injectedSize}). Используется значение по умолчанию.`,
    );
  }

  return {
    iconName,
    iconSize,
  };
}
