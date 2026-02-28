import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import VscInputText from './VscInputText.vue';
import { INPUT_TYPES } from './constants';
import type { VueWrapper } from '@vue/test-utils';
import type { VscMessageProps } from './../VscMessage/types';

describe('VscInputText', () => {
  const CUSTOM_ID = 'custom-id';
  const LABEL = 'Тестовое поле';
  const DEFAULT_PROPS = {
    id: CUSTOM_ID,
    label: LABEL,
  };
  const PLACEHOLDER = 'Введите текст';
  const ERROR_MSG = 'Поле обязательно';
  const ERROR_ICON = 'mdi:alert-circle';
  const ERROR_OBJ: VscMessageProps = {
    message: ERROR_MSG,
    isError: true,
    icon: ERROR_ICON,
  };
  const INPUT_CLASS = 'vsc-input-text';
  const INPUT_SELECTOR = `.${INPUT_CLASS}`;
  const ARIA_INVALID = 'aria-invalid';

  const findBaseComponent = (wrapper: VueWrapper) =>
    wrapper.findComponent({ name: 'VscInputBase' });

  it(`Рендерит input с классом "${INPUT_CLASS}".`, () => {
    const wrapper = mount(VscInputText, {
      props: DEFAULT_PROPS,
    });
    const input = wrapper.find(INPUT_SELECTOR);

    expect(input.exists()).toBe(true);
    expect(input.classes()).toContain(INPUT_CLASS);
  });

  it('Input имеет атрибут type="text".', () => {
    const wrapper = mount(VscInputText, {
      props: DEFAULT_PROPS,
    });
    const input = wrapper.find(INPUT_SELECTOR);

    expect(input.attributes('type')).toBe(INPUT_TYPES.text);
  });

  describe('Генерация идентификатора', () => {
    it('Генерирует ID, если prop "id" не передан.', () => {
      const wrapper = mount(VscInputText, {
        label: LABEL,
      });
      const input = wrapper.find(INPUT_SELECTOR);
      const base = findBaseComponent(wrapper);
      const inputId = input.attributes('id');

      expect(inputId).toBeDefined();
      expect(inputId).not.toBe(CUSTOM_ID);
      expect(base.props('id')).toBe(inputId);
    });

    it('Использует переданный prop "id".', () => {
      const wrapper = mount(VscInputText, {
        props: DEFAULT_PROPS,
      });
      const input = wrapper.find(INPUT_SELECTOR);
      const base = findBaseComponent(wrapper);

      expect(input.attributes('id')).toBe(CUSTOM_ID);
      expect(base.props('id')).toBe(CUSTOM_ID);
    });
  });

  describe('Передача props', () => {
    it('Передает props в VscInput.', () => {
      const wrapper = mount(VscInputText, {
        props: {
          ...DEFAULT_PROPS,
          placeholder: PLACEHOLDER,
          disabled: true,
          readonly: true,
          required: true,
        },
      });
      const input = wrapper.find(INPUT_SELECTOR);
      const inputElement = input.element as HTMLInputElement;

      expect(input.attributes('placeholder')).toBe(PLACEHOLDER);
      expect(inputElement.disabled).toBe(true);
      expect(inputElement.readOnly).toBe(true);
      expect(inputElement.required).toBe(true);
    });

    it('Передает props в VscInputBase.', () => {
      const MARK = '**';
      const wrapper = mount(VscInputText, {
        props: {
          ...DEFAULT_PROPS,
          required: true,
          requiredMark: MARK,
        },
      });
      const base = findBaseComponent(wrapper);

      expect(base.props('label')).toBe(LABEL);
      expect(base.props('required')).toBe(true);
      expect(base.props('requiredMark')).toBe(MARK);
    });

    it('Передает showError и error в VscInputBase.', () => {
      const wrapper = mount(VscInputText, {
        props: {
          ...DEFAULT_PROPS,
          showError: true,
          error: ERROR_OBJ,
        },
      });
      const base = findBaseComponent(wrapper);

      expect(base.props('showError')).toBe(true);
      expect(base.props('error')).toEqual(ERROR_OBJ);
    });
  });

  describe(`Атрибут ${ARIA_INVALID}`, () => {
    it('Равен "true", если error.isError === true.', () => {
      const wrapper = mount(VscInputText, {
        props: {
          ...DEFAULT_PROPS,
          error: ERROR_OBJ,
        },
      });
      const input = wrapper.find(INPUT_SELECTOR);

      expect(input.attributes(ARIA_INVALID)).toBe('true');
    });

    it('Равен "false", если ошибки нет.', () => {
      const wrapper = mount(VscInputText, {
        props: DEFAULT_PROPS,
      });
      const input = wrapper.find(INPUT_SELECTOR);

      expect(input.attributes(ARIA_INVALID)).toBe('false');
    });
  });

  describe('v-model', () => {
    it('Корректно отображает значение.', () => {
      const MODEL_VALUE = 'Токио';
      const wrapper = mount(VscInputText, {
        props: {
          ...DEFAULT_PROPS,
          modelValue: MODEL_VALUE,
        },
      });
      const input = wrapper.find(INPUT_SELECTOR);

      expect((input.element as HTMLInputElement).value).toBe(MODEL_VALUE);
    });

    it('Происходит событие update:modelValue при вводе.', async () => {
      const NEW_VALUE = 'Киото';
      const wrapper = mount(VscInputText, {
        props: {
          ...DEFAULT_PROPS,
          modelValue: '',
        },
      });
      const input = wrapper.find(INPUT_SELECTOR);

      await input.setValue(NEW_VALUE);

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([NEW_VALUE]);
    });
  });
});
