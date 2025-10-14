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
  if (!color) {
    console.error('Не передано значение цвета.')
    return false
  }
  if (typeof color !== 'string') {
    console.error(`Неверный тип переменной: ${typeof color}. Ожидалась строка.`)
    return false
  }
  // Создаем HTML-элемент и забираем CSSStyleDeclaration.
  const s = document.createElement('div').style
  // Пытаемся присвоить переданное значение цвета.
  // Если это значение не является валидным, то браузер его проигнорирует и вернёт пустую строку.
  s.color = color
  // Проверяем на пустую строку.
  return !!s.color
}
/**
 * Проверка свойства на наличие в структуре VscCustomColorTheme.
 * @param prop Свойство.
 * @returns Результат проверки.
 */
export function isValidCustomColorProperty(prop: string): prop is CustomColorProperties {
  return (prop in CUSTOM_COLOR_THEME_CLASSES)
}
/**
 * Проверка структуры объекта на соответствие структуре VscCustomColorTheme.
 * @param customColors Объект, который необходимо проверить.
 * @returns Результат проверки.
 */
export function isValidCustomColorTheme(customColors: object): customColors is VscCustomColorTheme {
  if (!customColors) {
    console.error('Не переданы данные о цветах настраиваемой темы.')
    return false
  }

  const etalonKeys = Object.keys(CUSTOM_COLOR_THEME_CLASSES)
  const customKeys = Object.keys(customColors)

  if (etalonKeys.length !== customKeys.length) return false

  return etalonKeys.every((key) => customKeys.includes(key))
}