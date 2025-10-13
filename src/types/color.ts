import { CUSTOM_COLOR_THEME_CLASSES } from "@constants"

/**
 * Список тем.
 */
export type ColorThemes = 'primary' | 'accent' | 'success' | 'error'
/**
 * Цвет.
 */
export type CSSColor = string
/**
 * Свойства настраиваемой цветовой темы.
 */
export type CustomColorProperties = keyof typeof CUSTOM_COLOR_THEME_CLASSES
/**
 * Пользовательская (настраиваемая) цветовая тема.
 */
export type VscCustomColorTheme = Record<CustomColorProperties, CSSColor>

// TypeGuards
/**
 * Проверка на валидность цвета в CSS.
 * @param color Цвет.
 * @returns Результат проверки.
 */
export function isValidCSSColor(color: string): color is CSSColor {
  // Создаем HTML-элемент и забираем CSSStyleDeclaration.
  const s = document.createElement('div').style
  // Пытаемся присвоить переданное значение цвета.
  // Если это значение не является валидным, то браузер его проигнорирует и вернёт пустую строку.
  s.color = color
  // Проверяем на пустую строку.
  return !!s.color
}
/**
 * Проверка на валидность свойства настраиваемой темы.
 * @param prop Свойство.
 * @returns Результат проверки.
 */
export function isValidCustomColorProperty(prop: string): prop is CustomColorProperties {
  return (prop in CUSTOM_COLOR_THEME_CLASSES)
}