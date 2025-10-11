type ColorThemes = 'primary' | 'accent' | 'success' | 'error'
type HexColor = `#${string}`
type Color = string | HexColor
export type VscCustomColorTheme = {
  background: Color,
  text: Color,
  dark: Color,
  light: Color,
}

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

export type VscButtonClasses = Record<string, boolean>