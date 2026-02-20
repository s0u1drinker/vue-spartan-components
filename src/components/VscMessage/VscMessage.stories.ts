import type { Meta, StoryObj } from '@storybook/vue3';
import VscMessage from './VscMessage.vue';

const meta = {
  title: 'VscMessage',
  component: VscMessage,
  argTypes: {
    message: {
      control: 'text',
      description: 'Текст сообщения',
    },
    icon: {
      control: 'text',
      description: 'Имя иконки',
    },
    showBackground: {
      control: 'boolean',
      description: 'Показать фон',
    },
  },
} satisfies Meta<typeof VscMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Partial<Story> = {
  render: (args) => ({
    components: { VscMessage },
    setup() {
      return { args };
    },
    template: `<VscMessage v-bind="args" />`,
  }),
};

export const Default: Story = {
  ...Template,
  name: 'По умолчанию',
  args: {
    message: 'Просто текст. Ничего лишнего.',
  },
};

export const WithIcon: Story = {
  ...Template,
  name: 'С иконкой',
  args: {
    message: 'Сообщение с иконкой',
    icon: 'mdi:information',
  },
};

export const WithBackground: Story = {
  ...Template,
  name: 'С фоном',
  args: {
    message: 'Сообщение с фоном',
    showBackground: true,
  },
};

export const WithIconAndBackground: Story = {
  ...Template,
  name: 'С иконкой и фоном',
  args: {
    message: 'Полное сообщение',
    icon: 'mdi:check-circle',
    showBackground: true,
  },
};

export const MultipleMessages: Story = {
  name: 'Примеры использования',
  args: {
    message: '',
  },
  render: () => ({
    components: { VscMessage },
    template: `<div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <VscMessage
        style="--vsc-message-text-color: red;"
        message="Какая-то ошибка" 
        icon="mdi:alert" 
      />
      <VscMessage
        style="--vsc-message-icon-color: green; --vsc-message-background-color: lightgreen;"
        message="Успешная операция" 
        icon="mdi:check-circle" 
        show-background 
      />
      <VscMessage
        style="--vsc-message-background-color: violet;"
        message="Просто акцентируем внимание на сообщении." 
        show-background 
      />
      <VscMessage
        style="width: 200px;"
        icon="mdi:account-reactivate"
        message="Это очень длинное сообщение, которое должно корректно переноситься и отображаться в компоненте без обрезки." 
      />
      
    </div>`,
  }),
};
