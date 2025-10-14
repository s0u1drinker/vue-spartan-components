import { isValidCSSColor, isValidCustomColorProperty, isValidCustomColorTheme } from '@types'
import { CUSTOM_COLOR_THEME_CLASSES } from '@constants'
import type { VscCustomColorTheme } from '@types'

/**
 * Устанавливает пользовательские настройки цвета (CSS-переменные) для настраиваемой темы.
 * @param customColors Список цветов настраиваемой темы.
 * @param element Элемент, для которого задаётся настраиваемая тема.
 */
export function setVarsForCustomColorTheme(customColors: VscCustomColorTheme, element?: HTMLElement): void {
  if (!customColors) {
    console.error('Не передан список цветов для настраиваемой темы.')
    return
  }

  if (!isValidCustomColorTheme(customColors)) {
    console.error('Неверная структура объекта с настраиваемой темой.')
    return
  }
  
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