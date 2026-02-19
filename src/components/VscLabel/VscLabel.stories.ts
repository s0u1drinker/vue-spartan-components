import type { Meta, StoryObj } from '@storybook/vue3';
import VscLabel from './VscLabel.vue';

const meta = {
  title: 'VscLabel',
  component: VscLabel,
  args: {
    id: 'my-input-id',
    labelText: 'Имя пользователя',
  },
} satisfies Meta<typeof VscLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = {
  render: (args) => ({
    components: { VscLabel },
    setup() {
      return { args };
    },
    template: '<VscLabel v-bind="args" />',
  }),
};

export const Default: Story = {
  ...Template,
  args: {},
};

export const Required: Story = {
  ...Template,
  args: {
    required: true,
  },
};

export const CustomMark: Story = {
  name: 'Кастомное обозначение',
  ...Template,
  args: {
    required: true,
    requiredMark: ' (обязательно)',
  },
};
