import type { VscCustomColorTheme } from '@components'

/**
 * Устанавливает пользовательские настройки цвета (CSS-переменные) для настраиваемой темы.
 * @param customColors 
 * @param element 
 */
export function setVarsForCustomColorTheme(customColors: VscCustomColorTheme, element?: HTMLElement | null): void {
  if (!element) {
    console.error('Передано значение <null> вместо элемента.')

    return
  }

  const el = element ?? document.documentElement

  el.style.setProperty('--vsc-custom-bg', customColors.background)
  el.style.setProperty('--vsc-custom-txt', customColors.text)
  el.style.setProperty('--vsc-custom-bg-dark', customColors.dark)
  el.style.setProperty('--vsc-custom-bg-light', customColors.light)
}