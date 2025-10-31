import type { ColorThemes, VscCustomColorTheme } from '@types';
import type { IconName } from '@components/VscIcon/types';

export type VscButtonClasses = Record<`vsc-button_${string}`, boolean>;

type ButtonType = 'button' | 'submit' | 'reset';
type ButtonStyle = 'plain' | 'outline';

export interface VscButtonProps {
  buttonType?: ButtonType;
  buttonStyle?: ButtonStyle;
  colorTheme?: ColorThemes;
  customColorTheme?: VscCustomColorTheme;
  disabled?: boolean;
  elevated?: boolean;
  rounded?: boolean;
  text?: string;
  ariaLabel?: string;
  iconLeft?: IconName;
  iconRight?: IconName;
  iconColor?: string;
  style?: never;
}
