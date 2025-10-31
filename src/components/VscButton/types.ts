import type { ColorThemes, VscCustomColorTheme } from '@types';
import type { IconName } from '@components/VscIcon/types';

export type VscButtonClasses = Record<`vsc-button_${string}`, boolean>;

type ButtonType = 'button' | 'submit' | 'reset';
type ButtonStyle = 'plain' | 'outline';

export interface VscButtonProps {
  /**
   * Тип кнопки: button | submit | reset. По умолчанию "button".
   */
  buttonType?: ButtonType;
  /**
   * Стиль кнопки: plain | outline.
   */
  buttonStyle?: ButtonStyle;
  /**
   * Цветовая тема: primary | accent | success | error.
   */
  colorTheme?: ColorThemes;
  /**
   * Настройка своей цветовой темы.
   */
  customColorTheme?: VscCustomColorTheme;
  /**
   * Атрибут "disabled". По умолчанию "false".
   */
  disabled?: boolean;
  /**
   * Добавление тени.
   */
  elevated?: boolean;
  /**
   * Круглые края.
   */
  rounded?: boolean;
  /**
   * Текст.
   */
  text?: string;
  /**
   * Атрибут "aria-label".
   */
  ariaLabel?: string;
  /**
   * Икнока слева от текста.
   */
  iconLeft?: IconName;
  /**
   * Иконка справа от текста.
   */
  iconRight?: IconName;
  /**
   * Цвет иконки.
   */
  iconColor?: string;
  /**
   * Отключение возможности дать инлайн-стили кнопке.
   */
  style?: never;
}
