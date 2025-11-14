import { ref } from 'vue';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useIconLoader } from './useIconLoader';
import type { MockInstance } from 'vitest';
import type { IconName } from '../types';

const svgIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20.56 3.91c.59.59.59 1.54 0 2.12l-3.89 3.89l2.12 9.19l-1.41 1.42l-3.88-7.43L9.6 17l.36 2.47l-1.07 1.06l-1.76-3.18l-3.19-1.77L5 14.5l2.5.37L11.37 11L3.94 7.09l1.42-1.41l9.19 2.12l3.89-3.89c.56-.58 1.56-.58 2.12 0"/></svg>';

describe('useIconLoader: Корректная загрузка иконки', () => {
  let consoleSpy: MockInstance;
  let fetchSpy: MockInstance;

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    fetchSpy = vi.spyOn(global, 'fetch');
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    fetchSpy.mockRestore();
    vi.clearAllMocks();
  });

  it('Загружает иконку из Iconify.', async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      text: async () => svgIcon,
    });

    const iconName = ref<IconName>('mdi:alarm-check');
    const { getIcon } = useIconLoader(iconName);

    await getIcon();

    expect(fetchSpy).toHaveBeenCalledWith(
      'https://api.iconify.design/mdi/alarm-check.svg'
    );
  });

  it('Загружает иконку из папки /icons.', async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      text: async () => svgIcon,
    });

    const iconName = ref<IconName>('public:home');
    const { getIcon } = useIconLoader(iconName);

    await getIcon();

    expect(fetchSpy).toHaveBeenCalledWith('/icons/home.svg');
  });

  it('Вызывает fetch только один раз, всё остальное загружается из кэша.', async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      text: async () => svgIcon,
    });

    const iconName = ref<IconName>('public:arrow-left');
    const { getIcon } = useIconLoader(iconName);

    await getIcon();
    await getIcon();
    await getIcon();

    expect(fetchSpy).toBeCalledTimes(1);
  });
});

describe('useIconLoader: Ошибки при загрузке иконки', () => {
  it('Не передано значение.', async () => {
    // @ts-ignore
    const { getIcon, loadError } = useIconLoader();

    await getIcon();

    expect(loadError.value).toBe('Не передано значение переменной.');
  });

  it('Неверный тип.', async () => {
    const wrongIconName = ref<string[]>(['public:sun']);
    const wrongType = typeof wrongIconName;

    // @ts-ignore
    const { getIcon, loadError } = useIconLoader(wrongIconName);

    await getIcon();

    expect(loadError.value).toBe(
      `Неверный тип переменной (${wrongIconName.value}): ${wrongType}.`
    );
  });

  it('Название иконки.', async () => {
    // @ts-ignore
    const wrongIconName = ref<IconName>('public:');
    const { getIcon, loadError } = useIconLoader(wrongIconName);

    await getIcon();

    expect(loadError.value).toBe(
      `Некорректное название иконки: ${wrongIconName.value}`
    );
  });

  it('Иконка не найдена.', async () => {
    const iconName = ref<IconName>('public:file');
    const fetchStatus = 404;
    let consoleSpy: MockInstance = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    let fetchSpy: MockInstance = vi.spyOn(global, 'fetch');

    fetchSpy.mockResolvedValue({
      ok: false,
      status: fetchStatus,
    });

    const { getIcon } = useIconLoader(iconName);

    await getIcon();

    expect(fetchSpy).toHaveBeenCalledWith('/icons/file.svg');
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        message: `Не получилось загрузить иконку с именем "${iconName.value}". Статус: ${fetchStatus}`,
      })
    );

    fetchSpy.mockRestore();
  });
});
