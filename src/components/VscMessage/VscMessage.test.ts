import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import VscMessage from './VscMessage.vue';

describe('VscMessage', () => {
  const DEFAULT_MESSAGE = 'Тестовое сообщение';
  const DEFAULT_ICON = 'mdi:information';
  const ICON_CLASS = '.vsc-message__icon';
  const BACKGROUND_CLASS = 'vsc-message_background';
  const DEFAULT_PROPS = {
    message: DEFAULT_MESSAGE,
  };

  it('Отображает текст сообщения.', () => {
    const wrapper = mount(VscMessage, {
      props: DEFAULT_PROPS,
    });

    expect(wrapper.text()).toContain(DEFAULT_MESSAGE);
  });

  it('Отображает иконку, если передан prop <icon>.', () => {
    const wrapper = mount(VscMessage, {
      props: {
        ...DEFAULT_PROPS,
        icon: DEFAULT_ICON,
      },
    });
    const icon = wrapper.find(ICON_CLASS);

    expect(icon.exists()).toBe(true);
    expect(icon.attributes('aria-hidden')).toBe('true');
  });

  it('Не отображает иконку, если prop <icon> не передан.', () => {
    const wrapper = mount(VscMessage, {
      props: DEFAULT_PROPS,
    });
    const icon = wrapper.find(ICON_CLASS);

    expect(icon.exists()).toBe(false);
  });

  it('Применяет класс фона, если showBackground === true.', () => {
    const wrapper = mount(VscMessage, {
      props: {
        ...DEFAULT_PROPS,
        showBackground: true,
      },
    });

    expect(wrapper.classes()).toContain(BACKGROUND_CLASS);
  });

  it('Не применяет класс фона, если showBackground === false или не передан.', () => {
    const wrapper = mount(VscMessage, {
      props: DEFAULT_PROPS,
    });

    expect(wrapper.classes()).not.toContain(BACKGROUND_CLASS);
  });

  it('Имеет базовый CSS класс <vsc-message>.', () => {
    const wrapper = mount(VscMessage, {
      props: DEFAULT_PROPS,
    });

    expect(wrapper.classes()).toContain('vsc-message');
  });

  it('Все props переданы.', () => {
    const wrapper = mount(VscMessage, {
      props: {
        message: DEFAULT_MESSAGE,
        icon: DEFAULT_ICON,
        showBackground: true,
      },
    });

    expect(wrapper.text()).toContain(DEFAULT_MESSAGE);
    expect(wrapper.find(ICON_CLASS).exists()).toBe(true);
    expect(wrapper.classes()).toContain(BACKGROUND_CLASS);
  });
});
