<template>
  <div :class="classes">
    <VscLabel
      class="vsc-input-base__label"
      v-if="label"
      :id
      :label-text="label"
      :required
      :required-mark
    />
    <div class="vsc-input-base__wrapper">
      <slot />
      <VscMessage
        class="vsc-input-base__error"
        v-if="showMessage"
        v-bind="{ ...props.error }"
        :message="messageText"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { VscMessage, VscLabel } from '@components';
  import { LABEL_STYLE, BASE_CLASS } from './constants';
  import type { VscInputBaseProps } from './types';

  const props = withDefaults(defineProps<VscInputBaseProps>(), {
    labelStyle: LABEL_STYLE.default,
  });

  const classes = computed(() => [
    BASE_CLASS,
    {
      [`${BASE_CLASS}_column`]: props?.labelStyle === LABEL_STYLE.column,
    },
  ]);
  const showMessage = computed<boolean>(() => !!props?.showError);
  const messageText = computed<string>(() => props?.error?.message || '');
</script>

<style scoped lang="scss">
  .vsc-input-base {
    --vsc-input-base-gap: var(--vsc-indent);
    --vsc-input-base-gap-grid: var(--vsc-indent-half);
    --vsc-input-base-label-width: auto;
    --vsc-input-base-message-color: var(--vsc-error);
    --vsc-input-base-message-icon-color: var(--vsc-error);
    --vsc-input-base-message-bg-color: color-mix(in oklab, var(--vsc-error) 25%, white);

    display: flex;
    gap: var(--vsc-input-base-gap);
    align-items: baseline;

    &__label {
      width: var(--vsc-input-base-label-width);
    }

    &__wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--vsc-indent-half);
    }

    &__error {
      --vsc-message-icon-color: var(--vsc-input-base-message-icon-color);
      --vsc-message-text-color: var(--vsc-input-base-message-color);
      --vsc-message-background-color: var(--vsc-input-base-message-bg-color);
    }

    &_column {
      flex-direction: column;
      gap: var(--vsc-input-base-gap-grid);
      align-items: stretch;
      width: fit-content;
    }
  }
</style>
