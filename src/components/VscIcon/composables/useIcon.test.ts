import { ref } from 'vue';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { flushPromises } from '@vue/test-utils';
import { useIcon } from './useIcon';
import type { MockInstance } from 'vitest';
import type { IconName } from '../types';

const mockIconContent = '<path fill="currentColor" d="test"></path>';
const { mockUseIconLoader } = vi.hoisted(() => ({
  mockUseIconLoader: vi.fn(),
}));

vi.mock('./useIconLoader', () => ({
  useIconLoader: mockUseIconLoader,
}));

describe('useIcon: Корректная работа', () => {
  let consoleSpy: MockInstance;

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    mockUseIconLoader.mockReturnValue({
      getIcon: vi
        .fn()
        .mockResolvedValue(
          `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">${mockIconContent}</svg>`
        ),
      loadError: ref(''),
    });
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    vi.clearAllMocks();
  });

  it('Стандартное поведение.', async () => {
    const iconName = ref<IconName>('public:attach-file');
    const { viewBox, iconContent } = useIcon(iconName);

    await flushPromises();

    expect(viewBox.value).toBe('0 0 24 24');
    expect(consoleSpy).not.toHaveBeenCalled();
    expect(iconContent.value).toBe(mockIconContent);
  });

  it('Реактивное изменение иконки и viewBox.', async () => {
    const mockIcons = ['<path d="home"></path>', '<path d="airplane"></path>'];
    const getIconMock = vi
      .fn()
      .mockResolvedValueOnce(
        `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">${mockIcons[0]}</svg>`
      )
      .mockResolvedValueOnce(
        `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">${mockIcons[1]}</svg>`
      );

    mockUseIconLoader.mockReturnValue({
      getIcon: getIconMock,
      loadError: ref(''),
    });

    const iconName = ref<IconName>('mdi:home');
    const { viewBox, iconContent } = useIcon(iconName);

    await flushPromises();

    expect(viewBox.value).toBe('0 0 32 32');
    expect(consoleSpy).not.toHaveBeenCalled();
    expect(iconContent.value).toBe(mockIcons[0]);

    iconName.value = 'mdi:airplane';

    await flushPromises();

    expect(viewBox.value).toBe('0 0 48 48');
    expect(consoleSpy).not.toHaveBeenCalled();
    expect(iconContent.value).toBe(mockIcons[1]);

    expect(getIconMock).toHaveBeenCalledTimes(2);
  });
});

describe('useIcon: Ошибки', () => {
  let consoleSpy: MockInstance;

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    mockUseIconLoader.mockReturnValue({
      getIcon: vi
        .fn()
        .mockResolvedValue(
          `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">${mockIconContent}</svg>`
        ),
      loadError: ref(''),
    });
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    vi.clearAllMocks();
  });

  it('Не найден тег <svg>.', async () => {
    mockUseIconLoader.mockReturnValue({
      getIcon: vi.fn().mockResolvedValueOnce('<div><span>Нет SVG</span></div>'),
      loadError: ref(''),
    });

    const iconName = ref<IconName>('public:no-svg-content');
    const { iconContent } = useIcon(iconName);

    await flushPromises();

    expect(iconContent.value).toBe('');
    expect(consoleSpy).toHaveBeenCalledWith(
      'Ошибка при загрузке иконки:',
      'Не смог найти тег <svg>.'
    );
  });

  it('Ошибка при загрузке иконки.', async () => {
    mockUseIconLoader.mockReturnValue({
      getIcon: vi.fn().mockResolvedValueOnce(''),
      loadError: ref('Некорректное название иконки: wrong-icon-name'),
    });
    // @ts-ignore
    const iconName = ref<IconName>('wrong-icon-name');
    const { iconContent } = useIcon(iconName);

    await flushPromises();

    expect(iconContent.value).toBe('');
    expect(consoleSpy).toHaveBeenCalledWith(
      'Ошибка при загрузке иконки:',
      'Некорректное название иконки: wrong-icon-name'
    );
  });

  it('Не удалось получить SVG-контент.', async () => {
    mockUseIconLoader.mockReturnValue({
      getIcon: vi.fn().mockRejectedValue(''),
      loadError: ref(''),
    });
    // @ts-ignore
    const iconName = ref<IconName>('');
    useIcon(iconName);

    await flushPromises();

    // Проверяем ошибку из watch
    expect(consoleSpy).toHaveBeenCalledWith('Не удалось получить SVG-контент.');
  });
});
