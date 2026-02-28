import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import VscInputText from './VscInputText.vue';
import type { VscMessageProps } from '../VscMessage/types';

const meta = {
  title: 'VscInputText',
  component: VscInputText,
  args: {
    id: 'text-id',
    label: 'Имя пользователя',
    placeholder: 'Введите текст...',
  },
} satisfies Meta<typeof VscInputText>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = {
  render: (args) => ({
    components: { VscInputText },
    setup() {
      const modelValue = ref(args.modelValue || '');

      return { args, modelValue };
    },
    template: `
      <div style="max-width: 400px;">
        <VscInputText v-bind="args" v-model="modelValue" />
        <p style="margin-top: 8px; font-size: 12px; color: gray;">
          Введенное значение: {{ modelValue }}
        </p>
      </div>
    `,
  }),
};

export const Default: Story = {
  ...Template,
  name: 'По умолчанию',
  args: {
    id: 'default-input',
  },
};

export const Required: Story = {
  ...Template,
  name: 'Обязательное поле',
  args: {
    id: 'required-input',
    label: 'Электронная почта',
    required: true,
    placeholder: 'example@mail.com',
  },
};

export const Disabled: Story = {
  ...Template,
  name: 'Отключенное поле',
  args: {
    id: 'disabled-input',
    label: 'Заблокировано',
    disabled: true,
    modelValue: 'Нельзя редактировать',
  },
};

export const Readonly: Story = {
  ...Template,
  name: 'Только для чтения',
  args: {
    id: 'readonly-input',
    label: 'Режим чтения',
    readonly: true,
    modelValue: 'Только для просмотра',
  },
};

export const WithError: Story = {
  ...Template,
  name: 'С ошибкой',
  args: {
    id: 'error-input',
    label: 'Возраст',
    placeholder: '18+',
    modelValue: '12',
    showError: true,
    error: {
      message: 'Возраст должен быть больше 18 лет',
      isError: true,
      icon: 'mdi:alert-circle',
    },
  },
};

export const ColumnLabelStyle: Story = {
  ...Template,
  name: 'Описание поля сверху',
  args: {
    label: 'Кем выдан',
    placeholder: 'ОУФМС ...',
    labelStyle: 'column',
    required: true,
    requiredMark: '***',
  },
};

export const InteractiveValidation: Story = {
  name: 'Интерактивная валидация',
  render: (args) => ({
    components: { VscInputText },
    setup() {
      const ERROR_OBJ: VscMessageProps = {
        message: 'Минимум 3 символа',
        isError: true,
        icon: 'mdi:alert',
        showBackground: true,
      };
      const showError = ref(false);
      const modelValue = ref('');

      const validate = () => {
        showError.value = modelValue.value.length < 3;
      };

      return { args, modelValue, showError, ERROR_OBJ, validate };
    },
    template: `
      <div style="max-width: 400px;">
        <VscInputText
          v-bind="args"
          v-model="modelValue"
          :error="ERROR_OBJ"
          :show-error="showError"
          @input="validate"
        />
        <p style="margin-top: 8px; font-size: 12px; color: gray;">
          Введите от 3 символов, чтобы увидеть ошибку.
        </p>
      </div>
    `,
  }),
  args: {
    label: 'Краткое описание',
    placeholder: 'Введите текст...',
  },
};
