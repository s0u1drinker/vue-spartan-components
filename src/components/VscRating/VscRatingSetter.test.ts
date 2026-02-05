import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import VscRatingSetter from './VscRatingSetter.vue';
import { CLASSES } from './constants';
import { KEY_ARROWS } from '@constants';

vi.mock('./composables/useRatingContext', () => ({
  useRatingContext: () => ({
    iconName: 'public:star',
    iconSize: '1.5rem',
  }),
}));

describe('VscRatingSetter', () => {
  const MAX_ICONS_VALUE = 10;
  const defaultProps = {
    maxValue: MAX_ICONS_VALUE,
  };
  const VscIconStub = {
    template: '<div class="stub-icon"></div>',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Отображается правильное количество иконок.', () => {
    const wrapper = mount(VscRatingSetter, {
      props: defaultProps,
      global: {
        stubs: {
          VscIcon: VscIconStub,
        },
      },
    });
    const icons = wrapper.findAll(`.${CLASSES.main}`);

    expect(icons).toHaveLength(MAX_ICONS_VALUE);
  });

  it('Клик по иконке + emit updateRating.', async () => {
    const wrapper = mount(VscRatingSetter, {
      props: defaultProps,
      global: {
        stubs: {
          VscIcon: VscIconStub,
        },
      },
    });
    const icons = wrapper.findAll(`.${CLASSES.main}`);

    expect(icons).toHaveLength(MAX_ICONS_VALUE);

    await icons[2]!.trigger('click');

    expect(wrapper.emitted('updateRating')).toBeTruthy();
    expect(wrapper.emitted('updateRating')![0]).toEqual([3]);

    expect(icons[0]!.classes()).toContain(CLASSES.selected);
    expect(icons[1]!.classes()).toContain(CLASSES.selected);
    expect(icons[2]!.classes()).toContain(CLASSES.selected);
    expect(icons[3]!.classes()).not.toContain(CLASSES.selected);
  });

  it('Имеет правильные атрибуты доступности.', () => {
    const wrapper = mount(VscRatingSetter, {
      props: defaultProps,
      global: {
        stubs: {
          VscIcon: VscIconStub,
        },
      },
    });

    expect(wrapper.attributes('role')).toBe('radiogroup');
    expect(wrapper.attributes('tabindex')).toBe('0');
  });

  describe('Управление клавиатурой', () => {
    it('Увеличивает рейтинг при нажатии стрелки вправо.', async () => {
      const wrapper = mount(VscRatingSetter, {
        props: defaultProps,
        global: {
          stubs: {
            VscIcon: VscIconStub,
          },
        },
      });

      for (let i = 0; i < 3; i++) {
        await wrapper.trigger('keydown', {
          key: KEY_ARROWS.right,
        });

        expect(wrapper.emitted('updateRating')).toBeTruthy();
        expect(wrapper.emitted('updateRating')![i]).toEqual([i + 1]);
      }
    });

    it('Уменьшает рейтинг при нажатии стрелки влево.', async () => {
      const wrapper = mount(VscRatingSetter, {
        props: defaultProps,
        global: {
          stubs: {
            VscIcon: VscIconStub,
          },
        },
      });
      const icons = wrapper.findAll(`.${CLASSES.main}`);

      await icons[4]!.trigger('click');

      await wrapper.trigger('keydown', {
        key: KEY_ARROWS.left,
      });

      expect(wrapper.emitted('updateRating')![1]).toEqual([4]);
    });

    it('Не выходит за пределы максимального значения при нажатии стрелки вправо.', async () => {
      const wrapper = mount(VscRatingSetter, {
        props: {
          maxValue: 2,
        },
        global: {
          stubs: {
            VscIcon: VscIconStub,
          },
        },
      });
      let i: number = 0;

      while (i < 3) {
        await wrapper.trigger('keydown', { key: KEY_ARROWS.right });
        i++;
      }

      const updates = wrapper.emitted('updateRating')!;

      expect(updates).toHaveLength(2);
      expect(updates[1]).toEqual([2]);
    });

    it('Не уходит в минус при нажатии стрелки влево.', async () => {
      const wrapper = mount(VscRatingSetter, {
        props: defaultProps,
        global: {
          stubs: {
            VscIcon: VscIconStub,
          },
        },
      });

      await wrapper.trigger('keydown', {
        key: KEY_ARROWS.left,
      });

      expect(wrapper.emitted('updateRating')).toBeUndefined();
    });
  });
});
