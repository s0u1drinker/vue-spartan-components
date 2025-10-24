import type { Meta, StoryObj } from '@storybook/vue3';
import { VscButton } from '@components';

const meta = {
  title: 'VscButton',
  component: VscButton,
} satisfies Meta<typeof VscButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = {
  render: (args) => ({
    components: { VscButton },
    setup() {
      return { args };
    },
    template: `<div style="display:flex;gap:1rem;">
      <VscButton v-bind="args" />
      <VscButton v-bind="args" buttonStyle="outline" />
      <VscButton v-bind="args" buttonStyle="plain" />
      </div>`,
  }),
};

export const Primary: Story = {
  ...Template,
  args: {
    text: 'Primary',
    colorTheme: 'primary',
    disabled: false,
  },
};

export const Accent: Story = {
  ...Template,
  args: {
    text: 'Accent',
    colorTheme: 'accent',
    disabled: false,
  },
};

export const Success: Story = {
  ...Template,
  args: {
    text: 'Success',
    colorTheme: 'success',
    disabled: false,
  },
};

export const Error: Story = {
  ...Template,
  args: {
    text: 'Error',
    colorTheme: 'error',
    disabled: false,
  },
};

export const Custom: Story = {
  ...Template,
  args: {
    text: 'Custom',
    customColorTheme: {
      background: 'darkorange',
      dark: 'orangered',
      light: '#FFAE4255',
      text: 'white',
    },
    disabled: false,
  },
};

export const ButtonWithIcon: Story = {
  name: 'С иконками',
  render: (args) => ({
    components: { VscButton },
    setup() {
      return { args };
    },
    template: `<div style="display:flex;gap:1rem;">
      <VscButton v-bind="args" text="" iconLeft="public:attach-file" />
      <VscButton v-bind="args" iconLeft="mdi:airplane" />
      <VscButton v-bind="args" iconRight="mdi:fire" buttonStyle="outline" />
      <VscButton v-bind="args" iconLeft="mdi:arrow-top" iconRight="mdi:arrow-top" buttonStyle="plain" />
      </div>`,
  }),
  args: {
    ariaLabel: 'Icon',
    text: 'Icon',
    disabled: false,
  },
};

export const ButtonWithOptions: Story = {
  name: 'С настройками',
  args: {
    text: 'Кнопка',
    elevated: true,
    rounded: true,
    disabled: false,
  },
};
