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
      <VscInput v-bind="args" type="text" v-model="value" />
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
