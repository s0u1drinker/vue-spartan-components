import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import VscRatingIcons from './VscRatingIcons.vue';
import { CLASSES } from './constants';

const ICON = {
  name: 'public:star',
  size: '1.75rem',
};

vi.mock('./composables/useRatingContext', () => ({
  useRatingContext: () => ({
    iconName: ICON.name,
    iconSize: ICON.size,
  }),
}));

describe('VscRatingIcons', () => {
  const stubs = { VscIcon: true };

  it('Рендерит указанное количество иконок.', () => {
    const COUNT_ICONS = 5;
    const wrapper = mount(VscRatingIcons, {
      props: {
        count: COUNT_ICONS,
        filled: false,
      },
      global: { stubs },
    });
    const icons = wrapper.findAllComponents({ name: 'VscIcon' });

    expect(icons).toHaveLength(COUNT_ICONS);
  });

  it('Передает правильные пропсы в VscIcon.', () => {
    const wrapper = mount(VscRatingIcons, {
      props: {
        count: 1,
      },
      global: { stubs },
    });
    const icon = wrapper.findComponent({ name: 'VscIcon' });

    expect(icon.props('iconName')).toBe(ICON.name);
    expect(icon.props('size')).toBe(ICON.size);
  });

  it('Применяет класс "filled", если filled = true.', () => {
    const wrapper = mount(VscRatingIcons, {
      props: {
        count: 1,
        filled: true,
      },
      global: { stubs },
    });
    const icon = wrapper.findComponent({ name: 'VscIcon' });
    const classes = icon.classes();

    expect(classes).toContain(CLASSES.main);
    expect(classes).toContain(CLASSES.filled);
    expect(classes).not.toContain(CLASSES.unfilled);
  });

  it('Применяет класс "unfilled", если filled = false.', () => {
    const wrapper = mount(VscRatingIcons, {
      props: {
        count: 1,
        filled: false,
      },
      global: { stubs },
    });
    const icon = wrapper.findComponent({ name: 'VscIcon' });
    const classes = icon.classes();

    expect(classes).toContain(CLASSES.main);
    expect(classes).toContain(CLASSES.unfilled);
    expect(classes).not.toContain(CLASSES.filled);
  });

  describe('Генерирует правильные ключи для списка иконок', () => {
    it('Заполненные иконки.', () => {
      const wrapper = mount(VscRatingIcons, {
        props: {
          count: 2,
          filled: true,
        },
        global: { stubs },
      });
      const icons = wrapper.findAllComponents({ name: 'VscIcon' });

      expect(icons).toHaveLength(2);

      for (let i = 0; i < 2; i++) {
        expect(icons[i]!.vm.$.vnode.key).toBe(`filled-icon-${i + 1}`);
      }
    });

    it('Незаполненные иконки.', () => {
      const wrapper = mount(VscRatingIcons, {
        props: {
          count: 1,
          filled: false,
        },
        global: { stubs },
      });
      const icon = wrapper.findComponent({ name: 'VscIcon' });

      expect(icon.vm.$.vnode.key).toBe('unfilled-icon-1');
    });
  });
});
