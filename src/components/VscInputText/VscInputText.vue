<template>
  <div class="vsc-input-text">
    <label
      class="vsc-input-text__label"
      :for="inputId"
      v-if="label"
    >
      {{ label }}
      <span
        class="vsc-input-text__mark"
        v-if="required"
        aria-hidden="true"
      >
        *
      </span>
    </label>
    <div class="vsc-input-text__input-wrapper">
      <VscInput
        :id="inputId"
        class="vsc-input-text__input"
        :type="INPUT_TYPES.text"
        :placeholder
        :disabled
        :readonly
        :required
      />
      <VscMessage
        class="vsc-input-text__error"
        v-if="showMessage"
        :message="errorMessage"
        :icon="error?.icon"
        :show-background="error?.showBackground"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useId, computed } from 'vue';
  import { VscInput, VscMessage } from '@components';
  import { LABEL_STYLE } from './constants';
  import { INPUT_TYPES } from '../VscInput/constants';
  import type { VscInputTextProps } from './types';

  const props = withDefaults(defineProps<VscInputTextProps>(), {
    labelStyle: LABEL_STYLE.default,
  });
  const generatedId = useId();
  /** Идентификатор. */
  const inputId = computed<string>(() => props.id || generatedId);
  /** Флаг отображения сообщения. */
  const showMessage = computed<boolean>(() => props?.showError ?? props?.error?.isError ?? false);
  /** Сообщение об ошибке. */
  const errorMessage = computed<string>(() => props.error?.message || '');
</script>

<style scoped lang="scss">
  .vsc-input-text {
    --vsc-input-text-gap: var(--vsc-indent);
    --vsc-input-text-label-width: auto;
    --vsc-input-text-padding: var(--vsc-indent-quarter) var(--vsc-indent-half);
    --vsc-input-text-message-color: var(--vsc-error);
    --vsc-input-text-message-icon-color: var(--vsc-error);
    --vsc-input-text-message-bg-color: color-mix(in oklab, var(--vsc-error) 25%, white);

    display: flex;
    gap: var(--vsc-input-text-gap);
    align-items: baseline;

    &__input {
      --vsc-input-padding: var(--vsc-input-text-padding);
    }

    &__label {
      width: var(--vsc-input-text-label-width);
    }

    &__mark {
      color: var(--vsc-error);
      margin-left: var(--indent-half);
    }

    &__input-wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--vsc-indent-half);
    }

    &__error {
      --vsc-message-icon-color: var(--vsc-input-text-message-icon-color);
      --vsc-message-text-color: var(--vsc-input-text-message-color);
      --vsc-message-background-color: var(--vsc-input-text-message-bg-color);
    }
  }
</style>
