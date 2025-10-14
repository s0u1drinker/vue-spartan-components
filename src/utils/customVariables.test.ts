import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type { MockInstance } from 'vitest'
import { setVarsForCustomColorTheme } from './customVariables'
import type { VscCustomColorTheme } from '@types'

describe('setVarsForCustomColorTheme', () => {
  let mockElement: HTMLElement
  let consoleSpy: MockInstance

  beforeEach(() => {
    mockElement = document.createElement('div')
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleSpy.mockRestore()
  })

  it('Вывод ошибки, если не передан объект с цветами.', () => {
    // @ts-ignore
    setVarsForCustomColorTheme()

    expect(consoleSpy).toHaveBeenCalledWith('Не передан список цветов для настраиваемой темы.')
  })

  it('Вывод ошибки, если передан объект с некорректной структурой.', () => {
    // @ts-ignore
    const customColorTheme: VscCustomColorTheme = {
      background: 'red',
      text: 'white',
    }

    setVarsForCustomColorTheme(customColorTheme, mockElement)

    expect(consoleSpy).toHaveBeenCalledWith('Неверная структура объекта с настраиваемой темой.')
  })
  
  it('CSS-переменные устанавливаются в переданный элемент.', () => {
    const customColorTheme: VscCustomColorTheme = {
      background: 'purple',
      text: 'white',
      dark: 'rgb(75,0,130)',
      light: '#DDA0DD',
    }

    setVarsForCustomColorTheme(customColorTheme, mockElement)

    expect(mockElement.style.getPropertyValue('--vsc-custom')).toBe('purple')
    expect(mockElement.style.getPropertyValue('--vsc-custom-text')).toBe('white')
    expect(mockElement.style.getPropertyValue('--vsc-custom-dark')).toBe('rgb(75,0,130)')
    expect(mockElement.style.getPropertyValue('--vsc-custom-light')).toBe('#DDA0DD')
  })

  it('CSS-переменные устанавливаются в document.documentElement, если элемент не передан.', () => {
    const customColorTheme: VscCustomColorTheme = {
      background: 'blue',
      text: 'yellow',
      dark: 'darkblue',
      light: 'lightblue',
    }

    setVarsForCustomColorTheme(customColorTheme)

    expect(document.documentElement.style.getPropertyValue('--vsc-custom')).toBe('blue')
    expect(document.documentElement.style.getPropertyValue('--vsc-custom-text')).toBe('yellow')
    expect(document.documentElement.style.getPropertyValue('--vsc-custom-dark')).toBe('darkblue')
    expect(document.documentElement.style.getPropertyValue('--vsc-custom-light')).toBe('lightblue')
  })

  it('Выводит ошибку, если передан некорректный цвет.', () => {
    const invalidColor = 'thisIsNotAColor'
    const customColorTheme: VscCustomColorTheme = {
      background: 'white',
      text: 'blue',
      dark: 'red',
      light: invalidColor,
    }

    setVarsForCustomColorTheme(customColorTheme, mockElement)

    expect(consoleSpy).toHaveBeenCalledWith(`Неизвестное значение цвета: "${invalidColor}"`)
    expect(mockElement.style.getPropertyValue('--vsc-custom')).toBe('white')
    expect(mockElement.style.getPropertyValue('--vsc-custom-text')).toBe('blue')
    expect(mockElement.style.getPropertyValue('--vsc-custom-dark')).toBe('red')
    expect(mockElement.style.getPropertyValue('--vsc-custom-light')).toBe('')
  })
})