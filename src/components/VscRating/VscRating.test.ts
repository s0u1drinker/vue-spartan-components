import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref, inject, defineComponent } from 'vue';
import VscRating from './VscRating.vue';
import { useRating } from './composables/useRating';
import { RATING_KEYS } from './constants';
import type { VueWrapper } from '@vue/test-utils';
import type { VscRatingProps } from './types';

const getComponentByName = (wrapper: VueWrapper, name: string): VueWrapper => {
  return wrapper.findComponent({ name });
};

const isComponentExists = (wrapper: VueWrapper, name: string): boolean => {
  return getComponentByName(wrapper, name).exists();
};

vi.mock('./composables/useRating', () => ({
  useRating: vi.fn(),
}));

describe('VscRating', () => {
  const defaultProps: VscRatingProps = {
    iconName: 'public:star',
    maxValue: 10,
    minimize: false,
    showMaxValue: true,
    iconSize: '1.5rem',
    setRating: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useRating).mockReturnValue({
      isValidData: ref(true),
    });
  });

  it('isValidData = false.', () => {
    vi.mocked(useRating).mockReturnValue({ isValidData: ref(false) });

    const wrapper = mount(VscRating, {
      props: defaultProps,
    });
    const componentInDOM = wrapper.find('.vsc-rating').exists();

    expect(componentInDOM).toBe(false);
  });

  it('isValidData = true.', () => {
    const wrapper = mount(VscRating, {
      props: defaultProps,
      global: {
        stubs: {
          VscRatingIndicator: true,
          VscRatingSetter: true,
        },
      },
    });
    const componentInDOM = wrapper.find('.vsc-rating').exists();

    expect(componentInDOM).toBe(true);
    // По умолчанию props setRating = false, значит должен отобрпзиться компонент VscRatingIndicator.
    expect(isComponentExists(wrapper, 'VscRatingIndicator')).toBe(true);
    expect(isComponentExists(wrapper, 'VscRatingSetter')).toBe(false);
  });

  it('Отображается компонент VscRatingSetter при setRating = true.', () => {
    const wrapper = mount(VscRating, {
      props: {
        ...defaultProps,
        setRating: true,
      },
      global: {
        stubs: {
          VscRatingIndicator: true,
          VscRatingSetter: true,
        },
      },
    });

    expect(isComponentExists(wrapper, 'VscRatingIndicator')).toBe(false);
    expect(isComponentExists(wrapper, 'VscRatingSetter')).toBe(true);
  });

  it('Класс minimize при minimize = true.', async () => {
    const MINIMIZE_CLASS = 'vsc-rating_minimize';
    const wrapper = mount(VscRating, {
      props: {
        ...defaultProps,
        modelValue: 3,
        minimize: true,
      },
    });

    expect(wrapper.classes()).toContain(MINIMIZE_CLASS);

    await wrapper.setProps({ minimize: false });

    expect(wrapper.classes()).not.toContain(MINIMIZE_CLASS);
  });

  it('Текущее значение отображается.', () => {
    const CURRENT_VALUE = 3.75;
    const wrapper = mount(VscRating, {
      props: {
        ...defaultProps,
        modelValue: CURRENT_VALUE,
      },
    });
    const valueBlock = wrapper.find('.vsc-rating__value');

    expect(valueBlock.exists()).toBe(true);
    expect(valueBlock.text()).toContain(String(CURRENT_VALUE));
  });

  it('Отображает максимальное значение при showMaxValue = true.', () => {
    const MAX_VALUE = 10;
    const MODEL_VALUE = 7;
    const wrapper = mount(VscRating, {
      props: {
        ...defaultProps,
        maxValue: MAX_VALUE,
        showMaxValue: true,
        modelValue: MODEL_VALUE,
      },
    });
    const valueBlock = wrapper.find('.vsc-rating__value');

    expect(valueBlock.text()).toContain(`${MODEL_VALUE} / ${MAX_VALUE}`);
  });

  it('Обновляет v-model при событии от Setter.', async () => {
    const ON_UPDATE_VALUE = 4;
    const wrapper = mount(VscRating, {
      props: {
        ...defaultProps,
        setRating: true,
        modelValue: 0,
        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
      },
      global: {
        stubs: {
          VscRatingSetter: {
            name: 'VscRatingSetter',
            template: '<div />',
            emits: ['update-rating'],
          },
        },
      },
    });
    const setter = getComponentByName(wrapper, 'VscRatingSetter');

    await setter.vm.$emit('update-rating', ON_UPDATE_VALUE);

    expect(wrapper.props('modelValue')).toBe(ON_UPDATE_VALUE);
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([ON_UPDATE_VALUE]);
  });

  it('Отправляет значения iconName и iconSize с помощью provide в дочерние компоненты.', () => {
    const ICON_NAME = 'public:star';
    const ICON_SIZE = '2rem';
    // Дочерний компонент, который попытается получить данные через inject.
    const TestInjector = defineComponent({
      template: '<div />',
      setup() {
        const iconName = inject(RATING_KEYS.iconName);
        const iconSize = inject(RATING_KEYS.iconSize);
        return { iconName, iconSize };
      },
    });

    const wrapper = mount(VscRating, {
      props: {
        ...defaultProps,
        iconName: ICON_NAME,
        iconSize: ICON_SIZE,
      },
      global: {
        stubs: {
          VscRatingIndicator: TestInjector,
          VscRatingSetter: true,
        },
      },
    });
    const childComponent = wrapper.findComponent(TestInjector);

    expect(childComponent.vm.iconName).toBe(ICON_NAME);
    expect(childComponent.vm.iconSize).toBe(ICON_SIZE);
  });
});
