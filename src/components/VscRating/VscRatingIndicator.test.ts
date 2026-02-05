import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import VscRatingIndicator from './VscRatingIndicator.vue';
import type { VueWrapper } from '@vue/test-utils';

describe('VscRatingIndicator', () => {
  const stubs = {
    VscRatingIcons: true,
    VscRatingPartialIcon: true,
  };

  const findIconGroups = (wrapper: VueWrapper) => {
    const allIcons = wrapper.findAllComponents({ name: 'VscRatingIcons' });
    const filledGroup = allIcons.find((w: any) => w.props('filled') === true);
    const unfilledGroup = allIcons.find((w: any) => !w.props('filled'));

    return {
      allIcons,
      filledGroup,
      unfilledGroup,
    };
  };

  it('Рендерит целое число (4 из 5).', () => {
    const CURRENT_VALUE = 4;
    const ICONS_COUNT = 5;
    const wrapper = mount(VscRatingIndicator, {
      props: {
        currentValue: CURRENT_VALUE,
        iconsCount: ICONS_COUNT,
        minimize: false,
      },
      global: { stubs },
    });
    const { filledGroup, unfilledGroup } = findIconGroups(wrapper);

    expect(filledGroup).toBeDefined();
    expect(filledGroup?.props('count')).toBe(CURRENT_VALUE);

    expect(unfilledGroup).toBeDefined();
    expect(unfilledGroup?.props('count')).toBe(ICONS_COUNT - CURRENT_VALUE);

    expect(wrapper.findComponent({ name: 'VscRatingPartialIcon' }).exists()).toBe(false);
  });

  it('Рендерит дробное число (7.6 из 10).', () => {
    const CURRENT_VALUE = 7.6;
    const FRACTIONAL_PART = CURRENT_VALUE - Math.floor(CURRENT_VALUE);
    const ICONS_COUNT = 10;
    const UNFILLED_ICONS_COUNT = ICONS_COUNT - Math.ceil(CURRENT_VALUE);
    const wrapper = mount(VscRatingIndicator, {
      props: {
        currentValue: CURRENT_VALUE,
        iconsCount: ICONS_COUNT,
        minimize: false,
      },
      global: { stubs },
    });
    const { filledGroup, unfilledGroup } = findIconGroups(wrapper);

    expect(filledGroup?.props('count')).toBe(Math.trunc(CURRENT_VALUE));

    const partialIcon = wrapper.findComponent({ name: 'VscRatingPartialIcon' });

    expect(partialIcon.exists()).toBe(true);
    expect(partialIcon.props('partialValue')).toBeCloseTo(FRACTIONAL_PART);

    expect(unfilledGroup?.props('count')).toBe(UNFILLED_ICONS_COUNT);
  });

  it('Режим minimize: показывает только 1 заполненную звезду.', () => {
    const wrapper = mount(VscRatingIndicator, {
      props: {
        currentValue: 2.6,
        iconsCount: 5,
        minimize: true,
      },
      global: { stubs },
    });

    const { filledGroup, unfilledGroup, allIcons } = findIconGroups(wrapper);

    expect(allIcons).toHaveLength(1);

    expect(filledGroup).toBeDefined();
    expect(filledGroup?.props('count')).toBe(1);

    expect(unfilledGroup).toBeUndefined();
    expect(wrapper.findComponent({ name: 'VscRatingPartialIcon' }).exists()).toBe(false);
  });

  it('В максимальном рейтинге нет блока пустых иконок.', () => {
    const VALUE = 5;
    const wrapper = mount(VscRatingIndicator, {
      props: {
        currentValue: VALUE,
        iconsCount: VALUE,
        minimize: false,
      },
      global: { stubs },
    });

    const { unfilledGroup, filledGroup } = findIconGroups(wrapper);

    expect(filledGroup?.props('count')).toBe(VALUE);
    expect(unfilledGroup).toBeUndefined();
  });

  it('Нулевой рейтинг.', () => {
    const ZERO = 0;
    const ICONS_COUNT = 5;
    const wrapper = mount(VscRatingIndicator, {
      props: {
        currentValue: ZERO,
        iconsCount: ICONS_COUNT,
        minimize: false,
      },
      global: { stubs },
    });

    const { filledGroup, unfilledGroup } = findIconGroups(wrapper);

    expect(filledGroup).toBeDefined();
    expect(filledGroup?.props('count')).toBe(ZERO);

    expect(unfilledGroup).toBeDefined();
    expect(unfilledGroup?.props('count')).toBe(ICONS_COUNT);
  });
});
