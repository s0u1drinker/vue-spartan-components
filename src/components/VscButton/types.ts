import type { ColorThemes, VscCustomColorTheme } from '@types'

export type VscButtonClasses = Record<string, boolean>

export interface VscButtonProps {
  buttonType?: 'button' | 'submit' | 'reset',
  buttonStyle?: 'default' | 'plain' | 'outline',
  colorTheme?: ColorThemes,
  customColorTheme?: VscCustomColorTheme,
  disabled?: boolean,
  elevated?: true,
  rounded?: true,
  text?: string,
  ariaLabel?: string,
  iconLeft?: string,
  iconRight?: string,
  style?: never,
}
