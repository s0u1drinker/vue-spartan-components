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

describe('VscIcon: Контент иконки', () => {
  let mockParent: HTMLElement
  let consoleSpy: MockInstance

  beforeEach(() => {
    mockParent = document.createElement('button')
    document.body.appendChild(mockParent)
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleSpy.mockRestore()
    document.body.removeChild(mockParent)
    vi.clearAllMocks()
  })

  it('Корректное отображение иконки при указании "size" и атрибутов.', async () => {
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

  it('Корректное отображение иконки с размерами по умолчанию.', async () => {
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