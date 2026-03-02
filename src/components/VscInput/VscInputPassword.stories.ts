import { ref, watch } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import VscInputPassword from './VscInputPassword.vue';
import type { VscMessageProps } from '../VscMessage/types';

const meta = {
  title: 'VscInputPassword',
  component: VscInputPassword,
  args: {
    id: 'pass-id',
    label: 'Пароль',
    placeholder: 'Введите пароль',
  },
} satisfies Meta<typeof VscInputPassword>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = {
  render: (args) => ({
    components: { VscInputPassword },
    setup() {
      const modelValue = ref(args.modelValue || '');

      return { args, modelValue };
    },
    template: `
      <div style="max-width: 400px;">
        <VscInputPassword v-bind="args" v-model="modelValue" />
      </div>
    `,
  }),
};

export const Default: Story = {
  ...Template,
  name: 'По умолчанию',
  args: {
    id: 'pass-default',
  },
};

export const Disabled: Story = {
  ...Template,
  name: 'Отключенное поле',
  args: {
    id: 'pass-disabled',
    disabled: true,
    modelValue: 'CannotChange',
  },
};

export const WithError: Story = {
  ...Template,
  name: 'С ошибкой',
  args: {
    id: 'pass-error',
    showError: true,
    error: {
      message: 'Пароль должен содержать минимум 8 символов',
      isError: true,
      icon: 'mdi:alert-circle',
    },
    modelValue: '123',
  },
};

export const ColumnLayout: Story = {
  ...Template,
  name: 'Раскладка Column',
  args: {
    id: 'pass-column',
    label: 'Придумайте надежный пароль',
    labelStyle: 'column',
    placeholder: 'Минимум 8 символов...',
    required: false,
  },
};

export const CustomIcons: Story = {
  ...Template,
  name: 'Кастомные иконки',
  args: {
    id: 'pass-icons',
    iconShow: 'mdi:eye-outline',
    iconHide: 'mdi:eye-off-outline',
  },
};

export const InteractiveValidation: Story = {
  name: 'Интерактивная валидация',
  render: (args) => ({
    components: { VscInputPassword },
    setup() {
      const modelValue = ref('');
      const showError = ref(false);
      const ERROR_OBJ: VscMessageProps = {
        message: 'Минимум 8 символов',
        isError: true,
        icon: 'mdi:alert',
        showBackground: true,
      };

      watch(modelValue, (val) => {
        showError.value = val.length < 8;
      });

      return { args, modelValue, showError, ERROR_OBJ };
    },
    template: `
      <div style="max-width: 400px;">
        <VscInputPassword
          v-bind="args"
          v-model="modelValue"
          :error="ERROR_OBJ"
          :show-error="showError"
        />
        <p style="margin-top: 8px; font-size: 12px; color: gray;">
          Введите пароль длиной менее 8 символов, чтобы увидеть ошибку.
        </p>
      </div>
    `,
  }),
  args: {
    label: 'Новый пароль',
    placeholder: 'Минимум 8 символов',
  },
};
