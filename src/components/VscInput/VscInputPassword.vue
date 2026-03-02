<template>
  <VscInputBase
    :id="inputId"
    :label
    :label-style
    :required
    :required-mark
    :show-error
    :error
  >
    <div
      class="vsc-input-password"
      :class="{ 'vsc-input-password_disabled': disabled }"
      :aria-disabled="disabled"
    >
      <VscInput
        :id="inputId"
        class="vsc-input-password__input"
        :type="inputType"
        :placeholder
        :disabled
        :required
        :aria-invalid="isInvalidValue"
        v-model="model"
      />
      <VscButton
        class="vsc-input-password__button"
        :icon-left="iconName"
        :aria-label="ariaLabel"
        :aria-pressed="showPasswordText"
        :rounded="true"
        :disabled
        @click="togglePasswordText"
      />
    </div>
  </VscInputBase>
</template>

<script setup lang="ts">
  import { useId, computed, ref } from 'vue';
  import VscInputBase from './VscInputBase.vue';
  import { VscInput, VscButton } from '@components';
  import { INPUT_TYPES, LABEL_STYLE } from './constants';
  import { SHOW_STATE_ARRAY } from '@constants';
  import type { IconName } from '@components/VscIcon/types';
  import type { VscInputPasswordProps, VscInputPasswordTypes } from './types';

  const props = withDefaults(defineProps<VscInputPasswordProps>(), {
    labelStyle: LABEL_STYLE.default,
    required: true,
    iconShow: 'mdi:show',
    iconHide: 'mdi:hide',
  });

  const model = defineModel<string>();

  const generatedId = useId();
  /** Режим отображения пароля: звёздочки/текст. */
  const showPasswordText = ref(false);
  /** Идентификатор. */
  const inputId = computed<string>(() => props.id || generatedId);
  /** Флаг ошибки. */
  const isInvalidValue = computed<boolean>(() => !!props?.error?.isError);
  /** Иконка для показа/скрытия пароля. */
  const iconName = computed<IconName>(() =>
    showPasswordText.value ? props.iconHide : props.iconShow,
  );
  /** Тип поля для ввода пароля. */
  const inputType = computed<VscInputPasswordTypes>(() =>
    showPasswordText.value ? INPUT_TYPES.text : INPUT_TYPES.password,
  );
  /** Подпись для иконки. */
  const ariaLabel = computed<string>(() => `${SHOW_STATE_ARRAY[+showPasswordText.value]} пароль`);

  /** Меняет режим отображения пароля. */
  const togglePasswordText = () => {
    showPasswordText.value = !showPasswordText.value;
  };
</script>

<style scoped lang="scss">
  .vsc-input-password {
    --padding-fallback: var(--vsc-indent-half);
    --vsc-input-password-radius: var(--vsc-border-radius);
    --vsc-input-password-border-color: var(--vsc-gray-500);
    --vsc-input-password-border: var(--vsc-border) var(--vsc-input-password-border-color);
    --vsc-input-password-hover: var(--vsc-gray-600);
    --vsc-input-password-focus: var(--vsc-primary);
    --vsc-input-password-disabled-bg: var(--vsc-gray-200);
    --vsc-input-password-disabled-border: var(--vsc-gray-300);

    display: flex;
    align-items: center;
    border: var(--vsc-input-password-border);
    border-radius: var(--vsc-input-password-radius);
    transition:
      border-color var(--vsc-transition),
      background-color var(--vsc-transition),
      color var(--vsc-transition);

    @include hover {
      &:not(.vsc-input-password_disabled):not(:focus-within) {
        border-color: var(--vsc-input-password-hover);
      }
    }

    &_disabled {
      background-color: var(--vsc-input-password-disabled-bg);
      border-color: var(--vsc-input-password-disabled-border);
      cursor: not-allowed;
    }

    &:focus-within {
      border-color: var(--vsc-input-password-focus);

      @include focus-box-shadow(var(--vsc-input-password-focus));
    }

    &__input {
      border: 0 none;
      padding: var(--vsc-input-password-padding, var(--padding-fallback));

      &:focus-visible {
        box-shadow: none;
      }
    }

    &__button {
      border: 0 none;
      background-color: transparent;
      color: var(--vsc-input-password-border-color);

      &:hover {
        background-color: transparent;

        &:not(:disabled) {
          color: var(--vsc-input-password-hover);
        }
      }
    }
  }
</style>
