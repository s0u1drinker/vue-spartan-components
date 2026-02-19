import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import VscLabel from './VscLabel.vue';

describe('VscLabel', () => {
  const DEFAULT_ID = 'test-input-id';
  const DEFAULT_LABEL_TEXT = 'Имя пользователя';
  const DEFAULT_MARK = '*';
  const MARK_CLASS = '.vsc-label__mark';
  const DEFAULT_PROPS = {
    id: DEFAULT_ID,
    labelText: DEFAULT_LABEL_TEXT,
  };

  it('Текст label.', () => {
    const wrapper = mount(VscLabel, {
      props: DEFAULT_PROPS,
    });

    expect(wrapper.text()).toContain(DEFAULT_LABEL_TEXT);
  });

  it('Идентификатор в for.', () => {
    const wrapper = mount(VscLabel, {
      props: DEFAULT_PROPS,
    });

    expect(wrapper.attributes('for')).toBe(DEFAULT_ID);
  });

  it('Отображает required mark, если "required" true.', async () => {
    const wrapper = mount(VscLabel, {
      props: {
        ...DEFAULT_PROPS,
        required: true,
      },
    });
    const mark = wrapper.find(MARK_CLASS);

    expect(mark.exists()).toBe(true);
    expect(mark.html()).toContain(DEFAULT_MARK);
    expect(mark.attributes('aria-hidden')).toBe('true');
  });

  it('Кастомный required mark.', () => {
    const CUSTOM_MARK = '#';
    const wrapper = mount(VscLabel, {
      props: {
        ...DEFAULT_PROPS,
        required: true,
        requiredMark: CUSTOM_MARK,
      },
    });
    const mark = wrapper.find(MARK_CLASS);

    expect(mark.exists()).toBe(true);
    expect(mark.html()).toContain(CUSTOM_MARK);
  });

  it('Не отображает required mark, если "required" false.', () => {
    const wrapper = mount(VscLabel, {
      props: DEFAULT_PROPS,
    });
    const mark = wrapper.find(MARK_CLASS);

    expect(mark.exists()).toBe(false);
  });
});
