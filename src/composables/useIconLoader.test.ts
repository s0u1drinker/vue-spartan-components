import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useIconLoader } from './useIconLoader'
import type { MockInstance } from 'vitest'

const svgIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20.56 3.91c.59.59.59 1.54 0 2.12l-3.89 3.89l2.12 9.19l-1.41 1.42l-3.88-7.43L9.6 17l.36 2.47l-1.07 1.06l-1.76-3.18l-3.19-1.77L5 14.5l2.5.37L11.37 11L3.94 7.09l1.42-1.41l9.19 2.12l3.89-3.89c.56-.58 1.56-.58 2.12 0"/></svg>'

describe('useIconLoader: Корректная работа функции getIcon()', () => {
  let consoleSpy: MockInstance
  let fetchSpy: MockInstance

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    fetchSpy = vi.spyOn(global, 'fetch')
  })

  afterEach(() => {
    consoleSpy.mockRestore()
    fetchSpy.mockRestore()
    vi.clearAllMocks()
  })

  it('Загружает иконку из Iconify.', async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      text: async () => svgIcon
    })

    const { getIcon } = useIconLoader()

    await getIcon('mdi:alarm-check')

    expect(fetchSpy).toHaveBeenCalledWith('https://api.iconify.design/mdi/alarm-check.svg')
  })

  it('Загружает иконку из папки /icons.', async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      text: async () => svgIcon
    })

    const { getIcon } = useIconLoader()
    
    await getIcon('public:home')

    expect(fetchSpy).toHaveBeenCalledWith('/icons/home.svg')
  })

  it('Вызывает fetch только один раз, всё остальное загружается из кэша.', async () => {
        fetchSpy.mockResolvedValueOnce({
      ok: true,
      text: async () => svgIcon
    })

    const { getIcon } = useIconLoader()
    
    await getIcon('public:arrow-left')
    await getIcon('public:arrow-left')
    await getIcon('public:arrow-left')

    expect(fetchSpy).toBeCalledTimes(1)
  })
})

describe('useIconLoader: Ошибки при работе функции getIcon()', () => {
  let consoleSpy: MockInstance

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleSpy.mockRestore()
    vi.clearAllMocks()
  })

  it('Не передано значение.', async () => {
    const { getIcon } = useIconLoader()
    // @ts-ignore
    await getIcon()

    expect(consoleSpy).toHaveBeenCalledWith('Не передано значение переменной.')
  })

  it('Неверный тип.', async () => {
    const wrongIconName = ['public:sun']
    const wrongType = typeof wrongIconName

    const { getIcon } = useIconLoader()
    // @ts-ignore
    await getIcon(wrongIconName)

    expect(consoleSpy).toHaveBeenCalledWith(`Неверный тип переменной: ${wrongIconName} - ${wrongType}.`)
  })

  it('Название иконки.', async () => {
    const wrongIconName = 'public:'

    const { getIcon } = useIconLoader()
    
    await getIcon(wrongIconName)

    expect(consoleSpy).toHaveBeenCalledWith(`Некорректное название иконки: ${wrongIconName}`)
  })

  it('Иконка не найдена.', async () => {
    const iconName = 'public:file'
    const fetchStatus = 404
    let fetchSpy: MockInstance = vi.spyOn(global, 'fetch')

    fetchSpy.mockResolvedValue({
      ok: false,
      status: fetchStatus
    })

    const { getIcon } = useIconLoader()
    
    await getIcon(iconName)

    expect(fetchSpy).toHaveBeenCalledWith('/icons/file.svg')
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        message: `Не получилось загрузить иконку с именем "${iconName}". Статус: ${fetchStatus}`
      })
    )

    fetchSpy.mockRestore()
  })
})