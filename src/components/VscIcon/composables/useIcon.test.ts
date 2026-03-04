import { ref, defineComponent } from 'vue';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { useIcon } from './useIcon';
import type { Ref } from 'vue';
import type { MockInstance } from 'vitest';
import type { IconName } from '../types';

const mockIconContent = '<path d="test"></path>';

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
      getIcon: vi.fn().mockResolvedValue(`<svg viewBox="0 0 24 24">${mockIconContent}</svg>`),
      loadError: ref(''),
    });
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    vi.clearAllMocks();
  });

  const mountWithIcon = (iconNameRef: Ref<IconName>) => {
    const wrapper = mount(
      defineComponent({
        setup() {
          const result = useIcon(iconNameRef);
          return { ...result };
        },
        template: '<div></div>',
      }),
    );
    return wrapper;
  };

  it('Стандартное поведение.', async () => {
    const iconName = ref<IconName>('public:attach-file');
    const wrapper = mountWithIcon(iconName);

    await flushPromises();

    expect(wrapper.vm.viewBox).toBe('0 0 24 24');
    expect(consoleSpy).not.toHaveBeenCalled();
    expect(wrapper.vm.iconContent).toBe(mockIconContent);
  });

  it('Реактивное изменение иконки и viewBox.', async () => {
    const mockIcons = [
      '<svg viewBox="0 0 32 32"><path d="1"></path></svg>',
      '<svg viewBox="0 0 48 48"><path d="2"></path></svg>',
    ];

    const getIconMock = vi
      .fn()
      .mockResolvedValueOnce(mockIcons[0])
      .mockResolvedValueOnce(mockIcons[1]);

    mockUseIconLoader.mockReturnValue({
      getIcon: getIconMock,
      loadError: ref(''),
    });

    const iconName = ref<IconName>('mdi:home');
    const wrapper = mountWithIcon(iconName);

    await flushPromises();

    expect(wrapper.vm.viewBox).toBe('0 0 32 32');
    expect(consoleSpy).not.toHaveBeenCalled();
    expect(wrapper.vm.iconContent).toBe('<path d="1"></path>');

    iconName.value = 'mdi:airplane';

    await flushPromises();

    expect(wrapper.vm.viewBox).toBe('0 0 48 48');
    expect(consoleSpy).not.toHaveBeenCalled();
    expect(wrapper.vm.iconContent).toBe('<path d="2"></path>');
    expect(getIconMock).toHaveBeenCalledTimes(2);
  });
});

describe('useIcon: Ошибки', () => {
  let consoleSpy: MockInstance;

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    vi.clearAllMocks();
  });

  const mountWithIcon = (iconNameRef: Ref<IconName>) => {
    return mount(
      defineComponent({
        setup() {
          return useIcon(iconNameRef);
        },
        template: '<div></div>',
      }),
    );
  };

  it('Не найден тег .', async () => {
    mockUseIconLoader.mockReturnValue({
      getIcon: vi.fn().mockResolvedValueOnce('Нет SVG'),
      loadError: ref(''),
    });

    const iconName = ref<IconName>('public:no-svg-content');
    const wrapper = mountWithIcon(iconName);

    await flushPromises();

    expect(wrapper.vm.iconContent).toBe('');
    expect(consoleSpy).toHaveBeenCalledWith(
      'Ошибка при загрузке иконки:',
      'Не смог найти тег <svg>.',
    );
    expect(consoleSpy).toHaveBeenCalledWith('Не удалось получить SVG-контент.');
  });

  it('Ошибка при загрузке иконки.', async () => {
    mockUseIconLoader.mockReturnValue({
      getIcon: vi.fn().mockResolvedValueOnce(''),
      loadError: ref('Некорректное название иконки: wrong-icon-name'),
    });

    // @ts-ignore
    const iconName = ref('wrong-icon-name');
    const wrapper = mountWithIcon(iconName as Ref<IconName>);

    await flushPromises();

    expect(wrapper.vm.iconContent).toBe('');
    expect(consoleSpy).toHaveBeenCalledWith(
      'Ошибка при загрузке иконки:',
      'Некорректное название иконки: wrong-icon-name',
    );
  });

  it('Не удалось получить SVG-контент.', async () => {
    mockUseIconLoader.mockReturnValue({
      getIcon: vi.fn().mockRejectedValue('Network Error'),
      loadError: ref(''),
    });

    // @ts-ignore
    const iconName = ref('');

    mountWithIcon(iconName as Ref<IconName>);

    await flushPromises();

    expect(consoleSpy).toHaveBeenCalledWith('Не удалось получить SVG-контент.');
  });
});
