import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type { MockInstance } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import VscIcon from './VscIcon.vue'

const svgIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"/></svg>'
const mockGetIcon = vi.fn().mockResolvedValue(svgIcon)

vi.mock('@/composables/useIconLoader', () => ({
  useIconLoader: () => ({
    getIcon: mockGetIcon
  })
}))

describe('VscIcon: Корректное отображение иконки', () => {
  let mockParent: HTMLElement

  beforeEach(() => {
    mockParent = document.createElement('button')
    document.body.appendChild(mockParent)
  })

  afterEach(() => {
    document.body.removeChild(mockParent)
    vi.clearAllMocks()
  })

  it('При указании "size" и атрибутов.', async () => {
    const size = '1.5rem'

    mount(VscIcon, {
      props: {
        iconName: 'public:attach-file',
        size
      },
      attrs: {
        class: 'test-class',
        'data-test': 'icon-test'
      },
      attachTo: mockParent
    })

    expect(mockGetIcon).toHaveBeenCalledWith('public:attach-file')

    await flushPromises()

    const svg = mockParent.querySelector('svg')

    expect(svg).toBeTruthy()
    
    if (svg) {
      expect(svg.getAttribute('width')).toBe(size)
      expect(svg.getAttribute('height')).toBe(size)
      expect(svg.getAttribute('class')).toBe('test-class')
      expect(svg.getAttribute('data-test')).toBe('icon-test')
    }

    expect(mockParent.querySelector('i')).toBeNull()
  })

  it('С размерами по умолчанию.', async () => {
    mount(VscIcon, {
      props: {
        iconName: 'mdi:home',
      },
      attachTo: mockParent
    })

    expect(mockGetIcon).toHaveBeenCalledWith('mdi:home')

    await flushPromises()

    const svg = mockParent.querySelector('svg')

    expect(svg).toBeTruthy()

    if (svg) {
      expect(svg.getAttribute('width')).toBe('1rem')
      expect(svg.getAttribute('height')).toBe('1rem')
    }
  })
})

describe('VscIcon: Ошибки', () => {
  let consoleSpy: MockInstance
  let mockUseTemplateRef: MockInstance = vi.fn()

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.resetModules()
  })

  afterEach(() => {
    consoleSpy.mockRestore()
    vi.clearAllMocks()
  })

  vi.doMock('vue', async (importOriginal) => {
    const actual = await (importOriginal() as any)
    
    return {
      ...actual,
      useTemplateRef: mockUseTemplateRef
    }
  })

  it('Не найден родительский элемент.', async () => {
    const orphanElement = document.createElement('i')
    
    mockUseTemplateRef.mockReturnValue({ 
      value: orphanElement
    })
    
    const { default: VscIconLocal } = await import('./VscIcon.vue')

    mount(VscIconLocal, {
      props: {
        iconName: 'mdi:file',
      }
    })

    await flushPromises()

    expect(consoleSpy).toHaveBeenCalledWith('Не найден родитель для элемента.')
  })

  it('Не найден элемент с ref="icon".', async () => {
    mockUseTemplateRef.mockReturnValue({ 
      value: null
    })
    
    const { default: VscIconLocal } = await import('./VscIcon.vue')

    mount(VscIconLocal, {
      props: {
        iconName: 'mdi:file',
      }
    })

    await flushPromises()

    expect(consoleSpy).toHaveBeenCalledWith('Не найден элемент с ref="icon".')
  })

  const mockGetIconWithoutSvg: MockInstance = vi.fn()

  vi.doMock('@/composables/useIconLoader', () => ({
    useIconLoader: () => ({
      getIcon: mockGetIconWithoutSvg
    })
  }))

  it('Не смог найти тег <svg>.', async () => {
    const mockIconElement = document.createElement('i')
    const mockParent = document.createElement('div')
    
    mockParent.appendChild(mockIconElement)
    mockGetIconWithoutSvg.mockResolvedValue('<div>Not an SVG</div>')
    
    mockUseTemplateRef.mockReturnValue({ 
      value: mockIconElement
    })

    const { default: VscIconLocal } = await import('./VscIcon.vue')

    mount(VscIconLocal, {
      props: {
        iconName: 'mdi:file',
      }
    })

    await flushPromises()

    expect(consoleSpy).toHaveBeenCalledWith('Не смог найти тег <svg>.')
  })
})