import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import VscRatingPartialIcon from './VscRatingPartialIcon.vue';
import { FILLED_PART_CLASSES, UNFILLED_PART_CLASSES } from './constants';

const ICON = {
  name: 'public:star',
  size: '1.5rem',
};

vi.mock('./composables/useRatingContext', () => ({
  useRatingContext: () => ({
    iconName: ICON.name,
    iconSize: ICON.size,
  }),
}));

describe('VscRatingPartialIcon', () => {
  const stubs = { VscIcon: true };

  it('Рендерит две иконки: нижний и верхний слои.', () => {
    const wrapper = mount(VscRatingPartialIcon, {
      props: {
        partialValue: 0.5,
      },
      global: { stubs },
    });
    const icons = wrapper.findAllComponents({ name: 'VscIcon' });

    expect(icons).toHaveLength(2);
  });

  it('Применяет правильные CSS-классы.', () => {
    const wrapper = mount(VscRatingPartialIcon, {
      props: {
        partialValue: 0.5,
      },
      global: { stubs },
    });
    const icons = wrapper.findAllComponents({ name: 'VscIcon' });

    expect(icons).toHaveLength(2);

    expect(icons[0]!.classes()).toEqual(expect.arrayContaining([...FILLED_PART_CLASSES]));
    expect(icons[1]!.classes()).toEqual(expect.arrayContaining([...UNFILLED_PART_CLASSES]));
  });

  it('Пробрасывает данные в обе иконки.', () => {
    const wrapper = mount(VscRatingPartialIcon, {
      props: {
        partialValue: 0.45,
      },
      global: { stubs },
    });
    const icons = wrapper.findAllComponents({ name: 'VscIcon' });

    icons.forEach((icon) => {
      expect(icon.props('iconName')).toBe(ICON.name);
      expect(icon.props('size')).toBe(ICON.size);
    });
  });

  describe('Вычисление clip-path', () => {
    const TEST_CASES = [
      [0, '0% 0, 0% 100%'],
      [33, '33% 0, 33% 100%'],
      [50, '50% 0, 50% 100%'],
      [100, '100% 0, 100% 100%'],
    ];

    it.each(TEST_CASES)('%s', (val, expected) => {
      const wrapper = mount(VscRatingPartialIcon, {
        props: {
          partialValue: Number(val) / 100,
        },
        global: { stubs },
      });
      const icon = wrapper.findAllComponents({ name: 'VscIcon' })[0];
      const style = icon!.attributes('style');

      expect(style).toContain(expected);
    });
  });
});
