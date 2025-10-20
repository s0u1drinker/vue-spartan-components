import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import VscButton from './VscButton.vue'

const svgIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"/></svg>'
const mockGetIcon = vi.fn().mockResolvedValue(svgIcon)

vi.mock('@/composables/useIconLoader', () => ({
  useIconLoader: () => ({
    getIcon: mockGetIcon
  })
}))

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

  it('Отображение иконки с текстом.', async () => {
    const telegramWrapper = mount(VscButton, {
      props: {
        text: 'Telegram',
        iconLeft: 'tabler:brand-telegram',
      }
    })

    const whatsappButton = mount(VscButton, {
      props: {
        text: 'Whatsapp',
        iconRight: 'tabler:brand-whatsapp',
      }
    })

    await flushPromises()

    expect(telegramWrapper.find('svg').exists()).toBe(true)
    expect(telegramWrapper.find('span').exists()).toBe(true)
    expect(telegramWrapper.text()).toBe('Telegram')
    expect(whatsappButton.find('svg').exists()).toBe(true)
    expect(whatsappButton.find('span').exists()).toBe(true)
    expect(whatsappButton.text()).toBe('Whatsapp')
  })

  it('Отображение иконки без текста.', async () => {
    const xButton = mount(VscButton, {
      props: {
        iconLeft: 'tabler:brand-x',
        ariaLabel: 'x.com',
      }
    })

    const youtubeButton = mount(VscButton, {
      props: {
        iconRight: 'tabler:brand-youtube',
        ariaLabel: 'youtube.com'
      }
    })

    await flushPromises()

    expect(xButton.find('svg').exists()).toBe(true)
    expect(xButton.find('span').exists()).toBe(false)
    expect(xButton.text()).toBe('')
    expect(youtubeButton.find('svg').exists()).toBe(true)
    expect(youtubeButton.find('span').exists()).toBe(false)
    expect(youtubeButton.text()).toBe('')
  })
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
        iconLeft: 'public:attach-file'
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
    expect(wrapper.attributes('aria-disabled')).toBe('true')
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

  it('Применение класса vsc-button_only-icon, если в содержимом только одна иконка.', () => {
    const wrapperIconLeft = mount(VscButton, {
      props: {
        iconLeft: 'mdi:battery'
      }
    })

    const wrapperIconRight = mount(VscButton, {
      props: {
        iconRight: 'mdi:airplane'
      }
    })

    expect(wrapperIconLeft.classes()).toContain('vsc-button_only-icon')
    expect(wrapperIconRight.classes()).toContain('vsc-button_only-icon')
  })
})