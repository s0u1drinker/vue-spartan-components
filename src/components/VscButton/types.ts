type ColorThemes = 'primary' | 'accent' | 'success' | 'error'
type HexColor = `#${string}`
type Color = string | HexColor
type CustomColorTheme = {
  background: Color,
  text: Color,
  dark: Color,
  light: Color,
}

export interface ButtonProps {
  buttonType?: 'button' | 'submit' | 'reset',
  buttonStyle?: 'default' | 'plain' | 'outline',
  colorTheme?: ColorThemes,
  customColorTheme?: CustomColorTheme,
  disabled?: boolean,
  elevated?: true,
  rounded?: true,
  text?: string,
  ariaLabel?: string,
  iconLeft?: string,
  iconRight?: string,
}

export type ButtonClasses = Record<string, boolean> | string