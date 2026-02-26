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

  it('По умолчанию role === "status".', () => {
    const wrapper = mount(VscMessage, {
      props: DEFAULT_PROPS,
    });

    expect(wrapper.attributes('role')).toBe('status');
  });

  it('Устанавливает role="alert", если isError === true.', () => {
    const wrapper = mount(VscMessage, {
      props: {
        ...DEFAULT_PROPS,
        isError: true,
      },
    });

    expect(wrapper.attributes('role')).toBe('alert');
  });

  it('Позволяет переопределить role через prop.', () => {
    const PROP_ROLE = 'log';
    const wrapper = mount(VscMessage, {
      props: {
        ...DEFAULT_PROPS,
        role: PROP_ROLE,
        isError: true,
      },
    });

    expect(wrapper.attributes('role')).toBe(PROP_ROLE);
  });

  it('По умолчанию aria-atomic === "true".', () => {
    const wrapper = mount(VscMessage, {
      props: DEFAULT_PROPS,
    });

    expect(wrapper.attributes('aria-atomic')).toBe('true');
  });

  it('Позволяет изменить aria-atomic через prop.', () => {
    const ARIA_ATOMIC = 'false';
    const wrapper = mount(VscMessage, {
      props: {
        ...DEFAULT_PROPS,
        ariaAtomic: ARIA_ATOMIC,
      },
    });

    expect(wrapper.attributes('aria-atomic')).toBe(ARIA_ATOMIC);
  });

  it('Все props переданы.', () => {
    const PROP_ROLE = 'none';
    const ARIA_ATOMIC = 'false';
    const wrapper = mount(VscMessage, {
      props: {
        message: DEFAULT_MESSAGE,
        icon: DEFAULT_ICON,
        showBackground: true,
        isError: true,
        role: PROP_ROLE,
        ariaAtomic: ARIA_ATOMIC,
      },
    });

    expect(wrapper.props('isError')).toBe(true);
    expect(wrapper.text()).toContain(DEFAULT_MESSAGE);
    expect(wrapper.find(ICON_CLASS).exists()).toBe(true);
    expect(wrapper.classes()).toContain(BACKGROUND_CLASS);
    expect(wrapper.attributes('role')).toBe(PROP_ROLE);
    expect(wrapper.attributes('aria-atomic')).toBe(ARIA_ATOMIC);
  });
});
