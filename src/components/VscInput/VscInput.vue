<template>
  <input
    class="vsc-input"
    :type
    :placeholder
    :disabled
    :readonly
    :required
    :aria-invalid
    :aria-describedby
    :aria-labelledby
    v-model="model"
  />
</template>

<script setup lang="ts">
  import type { VscInputProps } from './types';

  defineProps<VscInputProps>();

  const model = defineModel();
</script>

<style lang="scss">
  .vsc-input {
    --vsc-input-padding: var(--vsc-indent-quarter);
    --vsc-input-border: var(--vsc-border) var(--vsc-gray-500);
    --vsc-input-bg: transparent;
    --vsc-input-radius: var(--vsc-border-radius);
    --vsc-input-hover: var(--vsc-gray-600);
    --vsc-input-focus: var(--vsc-primary);
    --vsc-input-disabled-bg: var(--vsc-gray-200);
    --vsc-input-disabled-border: var(--vsc-gray-300);

    display: flex;
    position: relative;
    padding: var(--vsc-input-padding);
    background-color: var(--vsc-input-bg);
    border: var(--vsc-input-border);
    border-radius: var(--vsc-input-radius);
    transition:
      border-color var(--vsc-transition),
      background-color var(--vsc-transition),
      color var(--vsc-transition);

    &:focus {
      border-color: var(--vsc-input-focus);
    }

    @include hover {
      border-color: var(--vsc-input-hover);
    }

    @include focus-visible(var(--vsc-input-focus));

    &::placeholder {
      font-style: italic;
    }

    &:disabled {
      background-color: var(--vsc-input-disabled-bg);
      border-color: var(--vsc-input-disabled-border);
      cursor: not-allowed;
    }

    &:read-only {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
</style>
