import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import VscInputPassword from './VscInputPassword.vue';
import { VscInput, VscButton } from '@components';
import { INPUT_TYPES } from './constants';
import { SHOW_STATE_ARRAY } from '@constants';
import type { VueWrapper } from '@vue/test-utils';

describe('VscInputPassword', () => {
  const CUSTOM_ID = 'pass-id';
  const LABEL = 'Пароль';
  const DEFAULT_PROPS = {
    id: CUSTOM_ID,
    label: LABEL,
  };
  const DISABLED_PROPS = {
    ...DEFAULT_PROPS,
    disabled: true,
  };

  const findInput = (wrapper: VueWrapper) => wrapper.findComponent(VscInput);
  const findButton = (wrapper: VueWrapper) => wrapper.findComponent(VscButton);

  it('Type="password" по умолчанию.', () => {
    const wrapper = mount(VscInputPassword, {
      props: DEFAULT_PROPS,
    });
    const input = findInput(wrapper);

    expect(input.props('type')).toBe(INPUT_TYPES.password);
  });

  describe('Переключение видимости пароля', () => {
    it('Меняет тип input при клике на кнопку.', async () => {
      const wrapper = mount(VscInputPassword, {
        props: DEFAULT_PROPS,
      });
      const button = findButton(wrapper);
      const input = findInput(wrapper);

      expect(input.props('type')).toBe(INPUT_TYPES.password);

      await button.trigger('click');

      expect(input.props('type')).toBe(INPUT_TYPES.text);
    });

    it('Меняет иконку при клике на кнопку.', async () => {
      const wrapper = mount(VscInputPassword);
      const button = findButton(wrapper);

      expect(button.props('iconLeft')).toBe('mdi:show');

      await button.trigger('click');

      expect(button.props('iconLeft')).toBe('mdi:hide');
    });

    it('Обновляет aria-label и aria-pressed на кнопке.', async () => {
      const wrapper = mount(VscInputPassword);
      const button = findButton(wrapper);
      const LABEL_SHOW = `${SHOW_STATE_ARRAY[0]} пароль`;
      const LABEL_HIDE = `${SHOW_STATE_ARRAY[1]} пароль`;

      expect(button.props('ariaLabel')).toBe(LABEL_SHOW);
      expect(button.props('ariaPressed')).toBe(false);

      await button.trigger('click');

      expect(button.props('ariaLabel')).toBe(LABEL_HIDE);
      expect(button.props('ariaPressed')).toBe(true);
    });
  });

  describe('Состояние disabled', () => {
    it('Добавляет класс _disabled и атрибут aria-disabled.', () => {
      const wrapper = mount(VscInputPassword, {
        props: DISABLED_PROPS,
      });
      const container = wrapper.find('.vsc-input-password');

      expect(container.classes()).toContain('vsc-input-password_disabled');
      expect(container.attributes('aria-disabled')).toBe('true');
    });

    it('Передает disabled в VscInput и VscButton.', () => {
      const wrapper = mount(VscInputPassword, {
        props: DISABLED_PROPS,
      });
      const button = findButton(wrapper);
      const input = findInput(wrapper);

      expect(input.props('disabled')).toBe(true);
      expect(button.props('disabled')).toBe(true);
    });
  });
});
