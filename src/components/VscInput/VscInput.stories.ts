import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import VscInput from './VscInput.vue';

const meta = {
  title: 'VscInput',
  component: VscInput,
} satisfies Meta<typeof VscInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = {
  args: {
    type: 'text',
  },
  render: (args) => ({
    components: { VscInput },
    setup() {
      const value = ref(args.modelValue);

      return { args, value };
    },
    template: `<div style="display:flex;gap:1rem;">
      <VscInput v-bind="args" v-model="value" />
      <div>Text: {{ value }}</div>
    </div>`,
  }),
};

export const DefaultText: Story = {
  ...Template,
  name: 'По умолчанию',
  args: {
    type: 'text',
    placeholder: 'Введите текст...',
  },
};

export const DisabledInput: Story = {
  ...Template,
  name: 'Disabled',
  args: {
    type: 'search',
    placeholder: 'Этот инпут выключен',
    disabled: true,
  },
};

export const ReadonlyInput: Story = {
  ...Template,
  name: 'Readonly',
  args: {
    type: 'email',
    placeholder: 'Только для чтения',
    readonly: true,
  },
};

export const InvalidInput: Story = {
  name: 'Ошибка валидации (возможный вариант)',
  args: {
    type: 'text',
    placeholder: 'Ошибка',
    ariaInvalid: 'true',
    ariaDescribedby: 'error-message-id',
  },
  render: (args) => ({
    components: { VscInput },
    setup() {
      const value = ref('');
      return { args, value };
    },
    template: `
      <div>
        <VscInput v-bind="args" v-model="value" style="border-color: var(--vsc-color-danger, red);" />
        <span id="error-message-id" style="color: red; font-size: 12px; display: block; margin-top: 4px;">
          Поле заполнено неверно
        </span>
      </div>
    `,
  }),
};

export const CustomStyles: Story = {
  name: 'Кастомные стили через CSS-переменные',
  args: {
    type: 'text',
    placeholder: 'Кастомный вид',
  },
  render: (args) => ({
    components: { VscInput },
    setup() {
      const value = ref('');
      return { args, value };
    },
    template: `
      <VscInput 
        v-bind="args" 
        v-model="value" 
        style="
          --vsc-input-padding: 12px;
          --vsc-input-border: 2px solid purple;
          --vsc-input-radius: 20px;
          --vsc-input-focus: orange;
          --vsc-input-bg: #f0f0f0;
        " 
      />
    `,
  }),
};
