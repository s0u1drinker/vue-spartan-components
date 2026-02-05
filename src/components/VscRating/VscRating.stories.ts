import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { VscRating } from '@components';

const meta = {
  title: 'VscRating',
  component: VscRating,
  args: {
    maxValue: 5,
    iconSize: '1.5rem',
    iconName: 'public:star',
    setRating: false,
    minimize: false,
    showMaxValue: false,
  },
} satisfies Meta<typeof VscRating>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = {
  render: (args) => ({
    components: { VscRating },
    setup() {
      const ratingValue = ref(args.modelValue);

      return { args, ratingValue };
    },
    template: `
      <div style="padding: 1rem;">
        <VscRating 
          v-bind="args" 
          v-model="ratingValue"
        />
      </div>
    `,
  }),
};

export const Default: Story = {
  ...Template,
  name: 'Индикатор',
  args: {
    modelValue: 3.5,
    setRating: false,
  },
};

export const Interactive: Story = {
  ...Template,
  name: 'Интерактивный',
  args: {
    modelValue: 0,
    setRating: true,
  },
};

export const WithText: Story = {
  ...Template,
  name: 'Отображается текст максимального значения',
  args: {
    modelValue: 3.5,
    showMaxValue: true,
  },
};

export const Minimized: Story = {
  ...Template,
  name: 'Минималистичный вид',
  args: {
    modelValue: 4.2,
    iconName: 'mdi:heart',
    minimize: true,
  },
};

export const TenStars: Story = {
  ...Template,
  name: '10-балльный рейтинг',
  args: {
    maxValue: 10,
    modelValue: 10,
    showMaxValue: true,
  },
};

export const ZeroRating: Story = {
  ...Template,
  name: 'Нулевой рейтинг',
  args: {
    modelValue: 0,
    setRating: false,
  },
};
