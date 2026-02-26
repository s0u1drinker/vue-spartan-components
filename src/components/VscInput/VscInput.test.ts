import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { INPUT_TYPES } from './constants';
import VscInput from './VscInput.vue';

describe('VscInput', () => {
  it('Класс "vsc-input".', () => {
    const wrapper = mount(VscInput);
    const input = wrapper.find('input');

    expect(input.exists()).toBe(true);
    expect(input.classes()).toContain('vsc-input');
  });

  it('Prop "type".', async () => {
    const wrapper = mount(VscInput, {
      props: { type: INPUT_TYPES.email },
    });
    const input = wrapper.find('input');

    expect(input.attributes('type')).toBe(INPUT_TYPES.email);

    await wrapper.setProps({ type: INPUT_TYPES.password });

    expect(input.attributes('type')).toBe(INPUT_TYPES.password);
  });

  it('Prop "placeholder".', () => {
    const PLACEHOLDER = 'Введите ваш текст';
    const wrapper = mount(VscInput, {
      props: {
        type: INPUT_TYPES.text,
        placeholder: PLACEHOLDER,
      },
    });
    const input = wrapper.find('input');

    expect(input.attributes('placeholder')).toBe(PLACEHOLDER);
  });

  it('Prop "disabled".', () => {
    const wrapper = mount(VscInput, {
      props: {
        type: INPUT_TYPES.text,
        disabled: true,
      },
    });
    const input = wrapper.find('input');

    expect(input.attributes('disabled')).toBe('');
    expect(input.element.disabled).toBe(true);
  });

  it('Prop "readonly".', () => {
    const wrapper = mount(VscInput, {
      props: {
        type: INPUT_TYPES.text,
        readonly: true,
      },
    });
    const input = wrapper.find('input');

    expect(input.attributes('readonly')).toBe('');
    expect(input.element.readOnly).toBe(true);
  });

  it('Prop "required".', () => {
    const wrapper = mount(VscInput, {
      props: {
        type: INPUT_TYPES.text,
        required: true,
      },
    });
    const input = wrapper.find('input');

    expect(input.attributes('required')).toBe('');
    expect(input.element.required).toBe(true);
  });

  it('Prop "aria-invalid".', () => {
    const wrapper = mount(VscInput, {
      props: {
        type: INPUT_TYPES.text,
        ariaInvalid: 'true',
      },
    });
    const input = wrapper.find('input');

    expect(input.attributes('aria-invalid')).toBe('true');
  });

  it('Prop "aria-describedby".', () => {
    const DESCRIBED_BY = 'password-info-id';
    const wrapper = mount(VscInput, {
      props: {
        type: INPUT_TYPES.password,
        ariaDescribedby: DESCRIBED_BY,
      },
    });
    const input = wrapper.find('input');

    expect(input.attributes('aria-describedby')).toBe(DESCRIBED_BY);
  });

  it('Prop "aria-labelledby".', () => {
    const LABELLED_BY = 'label-id';
    const wrapper = mount(VscInput, {
      props: {
        type: INPUT_TYPES.url,
        ariaLabelledby: LABELLED_BY,
      },
    });
    const input = wrapper.find('input');
    expect(input.attributes('aria-labelledby')).toBe(LABELLED_BY);
  });

  it('Корректное отображение v-model.', async () => {
    const MODEL_VALUE = 'Начальный текст';
    const NEW_MODEL_VALUE = 'Новый текст';
    const wrapper = mount(VscInput, {
      props: {
        type: INPUT_TYPES.text,
        modelValue: MODEL_VALUE,
      },
    });
    const input = wrapper.find('input');

    expect(input.element.value).toBe(MODEL_VALUE);

    await wrapper.setProps({ modelValue: NEW_MODEL_VALUE });

    expect(input.element.value).toBe(NEW_MODEL_VALUE);
  });

  it('Срабатывает update:modelValue при вводе.', async () => {
    const MODEL_VALUE = 'Привет';
    const wrapper = mount(VscInput, {
      props: {
        type: INPUT_TYPES.search,
        modelValue: '',
        'update:modelValue': (e: string) => wrapper.setProps({ modelValue: e }),
      },
    });
    const input = wrapper.find('input');

    await input.setValue(MODEL_VALUE);

    expect(input.element.value).toBe(MODEL_VALUE);
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([MODEL_VALUE]);
  });
});
