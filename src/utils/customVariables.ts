import { isValidCSSColor, isValidCustomColorProperty } from '@types'
import { CUSTOM_COLOR_THEME_CLASSES } from '@constants'
import type { VscCustomColorTheme } from '@types'

/**
 * Устанавливает пользовательские настройки цвета (CSS-переменные) для настраиваемой темы.
 * @param customColors 
 * @param element 
 */
export function setVarsForCustomColorTheme(customColors: VscCustomColorTheme, element?: HTMLElement): void {
  const el = element ?? document.documentElement

  for (const prop in customColors) {
    // Проверяем свойство.
    if (isValidCustomColorProperty(prop)) {
      const colorValue = customColors[prop]
      // Проверяем цвет.
      if (isValidCSSColor(colorValue)) {
        // Устанавливаем значение цвета в переменную.
        el.style.setProperty(CUSTOM_COLOR_THEME_CLASSES[prop], colorValue)
      } else {
        console.error(`Неизвестное значение цвета: "${colorValue}"`)
      }
    }
  }
}