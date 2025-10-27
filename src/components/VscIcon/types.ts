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
