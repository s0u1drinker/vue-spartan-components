import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import VscInputBase from './VscInputBase.vue';
import { BASE_CLASS, LABEL_STYLE } from './constants';
import type { VscMessageProps } from './../VscMessage/types';
import type { VueWrapper } from '@vue/test-utils';

describe('VscInputBase', () => {
  const DEFAULT_ID = 'input-id';
  const DEFAULT_LABEL = 'Описание';
  const DEFAULT_PROPS = {
    id: DEFAULT_ID,
    label: DEFAULT_LABEL,
  };
  const DEFAULT_ERROR_MSG = 'Текст ошибки';
  const ERROR_ICON = 'mdi:alert-circle';
  const SLOT_ELEMENT_CLASS = 'test-input';
  const SLOT_ELEMENT_SELECTOR = `.${SLOT_ELEMENT_CLASS}`;
  const SLOT_CONTENT = `<input class="${SLOT_ELEMENT_CLASS}" />`;

  const findLabelComponent = (wrapper: VueWrapper) => wrapper.findComponent({ name: 'VscLabel' });

  const findMessageComponent = (wrapper: VueWrapper) =>
    wrapper.findComponent({ name: 'VscMessage' });

  it('Имеет базовый CSS класс.', () => {
    const wrapper = mount(VscInputBase, {
      props: DEFAULT_PROPS,
    });

    expect(wrapper.classes()).toContain(BASE_CLASS);
  });

  it('Рендерит содержимое слота.', () => {
    const wrapper = mount(VscInputBase, {
      props: DEFAULT_PROPS,
      slots: {
        default: SLOT_CONTENT,
      },
    });

    expect(wrapper.find(SLOT_ELEMENT_SELECTOR).exists()).toBe(true);
  });

  it('Содержит wrapper для input и VscMessage.', () => {
    const wrapper = mount(VscInputBase, {
      props: DEFAULT_PROPS,
      slots: {
        default: SLOT_CONTENT,
      },
    });

    const wrapperDiv = wrapper.find('.vsc-input-base__wrapper');

    expect(wrapperDiv.exists()).toBe(true);
    expect(wrapperDiv.find(SLOT_ELEMENT_SELECTOR).exists()).toBe(true);
  });

  describe('Label', () => {
    it('Не отображает VscLabel, если prop не передан.', () => {
      const wrapper = mount(VscInputBase, {
        // @ts-ignore
        props: {
          id: DEFAULT_ID,
        },
      });

      expect(findLabelComponent(wrapper).exists()).toBe(false);
    });

    it('Отображает VscLabel, если prop передан.', () => {
      const wrapper = mount(VscInputBase, {
        props: DEFAULT_PROPS,
      });

      const label = findLabelComponent(wrapper);

      expect(label.exists()).toBe(true);
      expect(label.props('labelText')).toBe(DEFAULT_LABEL);
    });

    it('Передает "id", "required", "requiredMark" в VscLabel.', () => {
      const MARK = '**';
      const wrapper = mount(VscInputBase, {
        props: {
          ...DEFAULT_PROPS,
          required: true,
          requiredMark: MARK,
        },
      });

      const label = findLabelComponent(wrapper);
      expect(label.props('id')).toBe(DEFAULT_ID);
      expect(label.props('required')).toBe(true);
      expect(label.props('requiredMark')).toBe(MARK);
    });

    it('Применяет модификатор _column, если labelStyle === "column".', () => {
      const wrapper = mount(VscInputBase, {
        props: {
          ...DEFAULT_PROPS,
          labelStyle: LABEL_STYLE.column,
        },
      });

      expect(wrapper.classes()).toContain(`${BASE_CLASS}_column`);
    });
  });

  describe('Сообщение об ошибке', () => {
    it('Не отображает сообщение об ошибке по умолчанию.', () => {
      const wrapper = mount(VscInputBase, {
        props: DEFAULT_PROPS,
      });

      expect(findMessageComponent(wrapper).exists()).toBe(false);
    });

    it('Отображает ошибку, если showError === true.', () => {
      const wrapper = mount(VscInputBase, {
        props: {
          ...DEFAULT_PROPS,
          showError: true,
          error: { message: DEFAULT_ERROR_MSG },
        },
      });

      const message = findMessageComponent(wrapper);

      expect(message.exists()).toBe(true);
      expect(message.props('message')).toBe(DEFAULT_ERROR_MSG);
    });

    it('Не отображает ошибку, если showError === false.', () => {
      const wrapper = mount(VscInputBase, {
        props: {
          ...DEFAULT_PROPS,
          showError: false,
          error: {
            message: DEFAULT_ERROR_MSG,
            isError: true,
          },
        },
      });

      expect(findMessageComponent(wrapper).exists()).toBe(false);
    });

    it('Передает объект error в VscMessage через v-bind.', () => {
      const ERROR_OBJ: VscMessageProps = {
        message: DEFAULT_ERROR_MSG,
        isError: true,
        icon: ERROR_ICON,
      };
      const wrapper = mount(VscInputBase, {
        props: {
          ...DEFAULT_PROPS,
          showError: true,
          error: ERROR_OBJ,
        },
      });

      const message = findMessageComponent(wrapper);

      expect(message.props('message')).toBe(DEFAULT_ERROR_MSG);
      expect(message.props('isError')).toBe(true);
      expect(message.props('icon')).toBe(ERROR_ICON);
    });

    it('Выводит пустую строку, если props.error.message не передан.', () => {
      const wrapper = mount(VscInputBase, {
        props: {
          ...DEFAULT_PROPS,
          showError: true,
          // @ts-ignore
          error: {
            isError: true,
          },
        },
      });

      const message = findMessageComponent(wrapper);

      expect(message.props('message')).toBe('');
    });
  });
});
