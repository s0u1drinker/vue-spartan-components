import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type { MockInstance } from 'vitest'
import { isValidCSSColor, isValidCustomColorTheme } from './color'

describe('isValidCSSColor', () => {
  let consoleSpy: MockInstance

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleSpy.mockRestore()
  })

  it('Не передано значение цвета.', () => {
    // @ts-ignore
    isValidCSSColor()

    expect(consoleSpy).toBeCalledWith('Не передано значение цвета.')
  })

  it('Неверный тип переменной.', () => {
    const invalidType = [ 'red' ]
    // @ts-ignore
    isValidCSSColor(invalidType)

    expect(consoleSpy).toBeCalledWith(`Неверный тип переменной: ${typeof invalidType}. Ожидалась строка.`)
  })

  it('Некорректное значение цвета.', () => {
    expect(isValidCSSColor('rgb(a, 0, 300)')).toBe(false)
  })

  it('Корректное значение цвета.', () => {
    expect(isValidCSSColor('hsl(200, 100%, 80%)')).toBe(true)
  })
})

describe('isValidCustomColorTheme', () => {
  it('Не передана переменная.', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    // @ts-ignore
    isValidCustomColorTheme()

    expect(consoleSpy).toBeCalledWith('Не переданы данные о цветах настраиваемой темы.')
  })

  it('Несовпадает количество ключей.', () => {
    const colorTheme = {
      background: 'orange',
      text: 'skyblue',
      dark: 'violet',
      light: 'rgba(100, 150, 200, 0.5)',
      medium: 'hsla(200, 100%, 75%, 0.8)',
    }

    expect(isValidCustomColorTheme(colorTheme)).toBe(false)
  })

  it('Отличается структура данных.', () => {
    const colorTheme = {
      background: 'red',
      text: '#df0aa1',
      gray: 'black',
      light: '#ee11ff00',
    }

    expect(isValidCustomColorTheme(colorTheme)).toBe(false)
  })

  it('Корректные данные.', () => {
    const colorTheme = {
      background: '#ac43ff',
      text: '#eee',
      dark: 'indigo',
      light: '#bbeeff',
    }

    expect(isValidCustomColorTheme(colorTheme)).toBe(true)
  })
})