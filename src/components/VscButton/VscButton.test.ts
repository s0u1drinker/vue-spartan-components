import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import VscButton from './VscButton.vue'

describe('VscButton: Контент кнопки', () => {
  it('Отображение кнопки с текстом.', () => {
    const wrapper = mount(VscButton, {
      props: {
        text: 'Принять'
      }
    })

    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.classes()).toContain('vsc-button')
    expect(wrapper.text()).toBe('Принять')
  })

  it('Выводит в консоль ошибку, если не переданы "text" и "iconLeft"/"iconRight".', () => {
    const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {})

    mount(VscButton)

    expect(consoleErrorMock).toHaveBeenCalledWith('Необходимо указать иконку или текст для кнопки.')

    consoleErrorMock.mockRestore()
  })

  it('Отображение текста в <slot>.', () => {
    const wrapper = mount(VscButton, {
      slots: {
        default: 'Отправить'
      }
    })

    expect(wrapper.text()).toBe('Отправить')
  })

  it('Отображение HTML в <slot>.', () => {
    const wrapper = mount(VscButton, {
      slots: {
        default: '<span>Отмена</span>'
      }
    })

    const span = wrapper.find('span')

    expect(span).toBeTruthy()
    expect(span.text()).toBe('Отмена')
  })

  // TODO: После добавления компонента VscIcon необходимо дописать тесты для проверки отображения иконок.
})

describe('VscButton: Атрибут "aria-label"', () => {
  it('Значение передано в props.', () => {
    const wrapper = mount(VscButton, {
      props: {
        ariaLabel: 'Показать содержимое',
        text: 'Показать'
      }
    })

    expect(wrapper.attributes('aria-label')).toBe('Показать содержимое')
  })

  it('Значение не передано в props, но передано значение "text".', () => {
    const wrapper = mount(VscButton, {
      props: {
        text: 'Показать'
      }
    })

    expect(wrapper.attributes('aria-label')).toBe('Показать')
  })

  it('В props не переданы значения "aria-label" и "text".', () => {
    const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {})

    mount(VscButton, {
      props: {
        iconLeft: 'heart'
      }
    })

    expect(consoleErrorMock).toHaveBeenCalledWith('Необходимо указать значение <text> или <aria-label>.')

    consoleErrorMock.mockRestore()
  })
})

describe('VscButton: Атрибут "disabled"', () => {
  it('Проверка атрибута disabled по умолчанию (false).', () => {
    const wrapper = mount(VscButton)

    expect(wrapper.attributes('disabled')).toBeUndefined()
    expect(wrapper.classes()).not.toContain('vsc-button_disabled')
  })

  it('Применяется класс disabled, если в props передано "disabled: true".', () => {
    const wrapper = mount(VscButton, {
      props: {
        disabled: true
      }
    })

    expect(wrapper.classes()).toContain('vsc-button_disabled')
  })

  it('Вызывает событие click, если "disabled" не установлен.', async () => {
    const wrapper = mount(VscButton, {
      props: {
        text: 'Забрать подарок'
      }
    })

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('Не вызывает событие "click", если в props передано "disabled: true".', async () => {
    const wrapper = mount(VscButton, {
      props: {
        disabled: true
      }
    })

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeUndefined()
  })
})

describe('VscButton: Тип кнопки', () => {
  it('Устанавливает тип кнопки, если передан props "buttonType".', () => {
    const wrapper = mount(VscButton, {
      props: {
        buttonType: 'submit'
      }
    })

    expect(wrapper.attributes('type')).toBe('submit')
  })

  it('Устанавливает тип кнопки по умолчанию, если не передан props "buttonType".', () => {
    const wrapper = mount(VscButton)

    expect(wrapper.attributes('type')).toBe('button')
  })
})

vi.mock('@utils', async () => {
  const actual = await vi.importActual('@utils')

  return {
    ...actual,
    setVarsForCustomColorTheme: vi.fn(),
  }
})

describe('VscButton: Стилевое оформление', () => {
  it('Устанавливает классы для стилевого оформления (тема, стиль, elevated, rounded).', () => {
    const buttonStyle = 'plain'
    const colorTheme = 'success'

    const wrapper = mount(VscButton, {
      props: {
        text: 'Рассчитать',
        buttonStyle,
        colorTheme,
        elevated: true,
        rounded: true,
      }
    })

    expect(wrapper.classes()).toContain(`vsc-button_${buttonStyle}`)
    expect(wrapper.classes()).toContain(`vsc-button_color_${colorTheme}`)
    expect(wrapper.classes()).toContain('vsc-button_elevated')
    expect(wrapper.classes()).toContain('vsc-button_rounded')
  })

  it('Применение настраиваемого стиля.', async () => {
    const { setVarsForCustomColorTheme } = await import('@utils')
    const customColorTheme = {
      text: 'white',
      background: 'purple',
      dark: 'rgb(75,0,130)',
      light: '#DDA0DD',
    }

    const wrapper = mount(VscButton, {
      props: {
        text: 'Обновить',
        customColorTheme
      }
    })

    expect(wrapper.classes()).toContain('vsc-button_color_custom')
    expect(setVarsForCustomColorTheme).toHaveBeenCalledTimes(1)
    expect(setVarsForCustomColorTheme).toHaveBeenCalledWith(customColorTheme, wrapper.find('button').element)
  })
})