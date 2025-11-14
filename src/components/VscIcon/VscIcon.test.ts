import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ref } from 'vue';
import { mount } from '@vue/test-utils';
import VscIcon from './VscIcon.vue';

const { mockUseIcon } = vi.hoisted(() => ({
  mockUseIcon: vi.fn(),
}));
const svgIconContent =
  '<path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"></path>';

vi.mock('./composables/useIcon', () => ({
  useIcon: mockUseIcon,
}));

describe('VscIcon: Корректное отображение иконки', () => {
  beforeEach(() => {
    mockUseIcon.mockReturnValue({
      viewBox: ref('0 0 24 24'),
      iconContent: ref(svgIconContent),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('При указании "size", "color" и атрибутов.', async () => {
    const size = '1.5rem';
    const iconColor = 'red';
    const iconName = 'public:attach-file';

    const wrapper = mount(VscIcon, {
      props: {
        iconName,
        iconColor,
        size,
        ariaHidden: false,
      },
      attrs: {
        class: 'test-class',
        'data-test': 'icon-test',
      },
    });

    const expectedStyle = `color: ${iconColor}`;

    expect(mockUseIcon).toHaveBeenCalledWith(
      expect.objectContaining({
        value: iconName,
      })
    );

    expect(wrapper.attributes('width')).toBe(size);
    expect(wrapper.attributes('height')).toBe(size);
    expect(wrapper.attributes('class')).toBe('test-class');
    expect(wrapper.attributes('data-test')).toBe('icon-test');
    expect(wrapper.attributes('aria-hidden')).toBe('false');
    expect(wrapper.attributes('style')).toContain(expectedStyle);

    expect(wrapper.html()).toContain(
      `<svg xmlns="http://www.w3.org/2000/svg" style="${expectedStyle};" width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="false" class="test-class" data-test="icon-test">
  ${svgIconContent}
</svg>`
    );
  });

  it('С размерами и aria-hidden по умолчанию.', async () => {
    const iconName = 'mdi:home';
    const wrapper = mount(VscIcon, {
      props: {
        iconName,
      },
    });

    expect(mockUseIcon).toHaveBeenCalledWith(
      expect.objectContaining({
        value: iconName,
      })
    );

    expect(wrapper.attributes('width')).toBe('1rem');
    expect(wrapper.attributes('height')).toBe('1rem');
    expect(wrapper.attributes('style')).toBeUndefined();
    expect(wrapper.attributes('aria-hidden')).toBe('true');
  });

  it('Обновление иконки при изменении iconName.', async () => {
    const iconName = 'mdi:airplane';
    const wrapper = mount(VscIcon, {
      props: {
        iconName,
      },
    });

    expect(mockUseIcon).toHaveBeenCalledWith(
      expect.objectContaining({
        value: iconName,
      })
    );

    const newIconName = 'public:attach-file';

    await wrapper.setProps({ iconName: newIconName });

    expect(mockUseIcon).toHaveBeenCalledWith(
      expect.objectContaining({
        value: newIconName,
      })
    );
  });

  it('Отображение viewBox из composable.', async () => {
    mockUseIcon.mockReturnValue({
      viewBox: ref('0 0 32 32'),
      iconContent: ref(svgIconContent),
    });

    const wrapper = mount(VscIcon, {
      props: {
        iconName: 'mdi:home',
      },
    });

    expect(wrapper.attributes('viewBox')).toBe('0 0 32 32');
  });

  it('Отсутствие иконки при ошибке обработки.', async () => {
    mockUseIcon.mockReturnValue({
      viewBox: ref('0 0 24 24'),
      iconContent: ref(''),
    });

    const wrapper = mount(VscIcon, {
      props: {
        iconName: 'public:icon',
      },
    });

    expect(wrapper.html()).not.toContain('<path');
  });
});
