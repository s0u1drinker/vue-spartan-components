import type { Meta, StoryObj } from '@storybook/vue3';
import { VscIcon } from '@components';

const meta = {
  title: 'VscIcon',
  component: VscIcon,
} satisfies Meta<typeof VscIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sizes: Story = {
  name: 'Размер',
  render: (args) => ({
    components: { VscIcon },
    setup() {
      return { args };
    },
    template: `<div style="display:flex;gap:1rem;align-items:center;">
      <VscIcon v-bind="args" size="4rem" />
      <VscIcon v-bind="args" size="3rem" />
      <VscIcon v-bind="args" size="2rem" />
      <VscIcon v-bind="args" size="1rem" />
      <VscIcon v-bind="args" size="0.5rem" />
      </div>`,
  }),
  args: {
    iconName: 'mdi:fire',
  },
};

export const TextWithIcon: Story = {
  name: 'Текст с иконкой',
  render: (args) => ({
    components: { VscIcon },
    setup() {
      return { args };
    },
    template:
      '<p>Lorem ipsum dolor sit amet, consectetur <VscIcon v-bind="args" />adipisicing elit.</p>',
  }),
  args: {
    iconName: 'mdi:alien',
    iconColor: 'red',
  },
};
