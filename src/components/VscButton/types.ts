import type { ColorThemes, VscCustomColorTheme } from '@types'

export type VscButtonClasses = Record<`vsc-button_${string}`, boolean>

type ButtonType = 'button' | 'submit' | 'reset'
type ButtonStyle = 'plain' | 'outline'

export interface VscButtonProps {
  buttonType?: ButtonType,
  buttonStyle?: ButtonStyle,
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