import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import VscInputBase from './VscInputBase.vue';
import { VscInput } from '@components';
import { LABEL_STYLE } from './constants';

const meta = {
  title: 'VscInputBase',
  component: VscInputBase,
  args: {
    label: 'Имя пользователя',
    id: 'input-id',
  },
} satisfies Meta<typeof VscInputBase>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = {
  render: (args) => ({
    components: { VscInputBase, VscInput },
    setup() {
      const modelValue = ref('');

      return { args, modelValue };
    },
    template: `
      <VscInputBase v-bind="args">
        <VscInput :id="args.id" v-model="modelValue" />
      </VscInputBase>
    `,
  }),
};

export const Default: Story = {
  ...Template,
  name: 'По умолчанию',
  args: {
    label: 'Стандартное поле',
  },
};

export const Required: Story = {
  ...Template,
  name: 'Обязательное поле',
  args: {
    label: 'Имя пользователя',
    required: true,
  },
};

export const RequiredCustomMark: Story = {
  ...Template,
  name: 'Кастомная метка',
  args: {
    label: 'Пароль',
    required: true,
    requiredMark: '(обязательно)',
  },
};

export const ColumnLayout: Story = {
  ...Template,
  name: 'Раскладка Column',
  args: {
    label: 'Комментарий',
    labelStyle: LABEL_STYLE.column,
  },
};

export const WithError: Story = {
  ...Template,
  name: 'С ошибкой',
  args: {
    label: 'Возраст',
    showError: true,
    error: {
      isError: true,
      message: 'Возраст должен быть больше 18 лет',
      icon: 'mdi:alert-circle',
    },
  },
};

export const InteractiveError: Story = {
  name: 'Интерактивная ошибка',
  render: (args) => ({
    components: { VscInputBase, VscInput },
    setup() {
      const modelValue = ref('');
      const isError = ref(false);

      const validate = () => {
        isError.value = modelValue.value.length < 3;
      };

      return { args, modelValue, isError, validate };
    },
    template: `
      <div>
        <VscInputBase
          v-bind="args"
          :show-error="isError"
          :error="{ isError: true, message: 'Минимум 3 символа!', icon: 'mdi:alert' }"
        >
          <VscInput 
            :id="args.id"
            v-model="modelValue" 
            placeholder="Введите минимум 3 символа" 
            @input="validate"
            :aria-invalid="isError"
            aria-describedby="description-id"
          />
        </VscInputBase>
        <p id="description-id" style="margin-top: 10px; font-size: 12px; color: gray;">
          Введите что-нибудь, чтобы проверить валидацию.
        </p>
      </div>
    `,
  }),
};
