import type { Ref } from 'vue';

type IconSize = `${number}px` | `${number}%` | `${number}rem` | `${number}em`;

export type IconName = `${any}${string}:${any}${string}`;

export interface IconProps {
  /**
   * Наименование иконки.
   */
  iconName: IconName;
  /**
   * Размер иконки (опционально). По умолчанию "1rem".
   */
  size?: IconSize;
  /**
   * Цвет иконки (опционально).
   */
  iconColor?: string;
  /**
   * Атрибут "aria-hidden" (опционально). По умолчанию "true".
   */
  ariaHidden?: boolean;
}

export interface UseIcon {
  viewBox: Ref<string>;
  iconContent: Ref<string>;
}

export interface UseIconLoader {
  getIcon: () => Promise<string>;
  loadError: Ref<string>;
}

export type CacheIcon = Map<IconName, string>;
export type CachePromise = Map<IconName, Promise<boolean>>;

export type IconPath =
  | `/icons/${string}.svg`
  | `https://api.iconify.design/${string}/${string}.svg`;
