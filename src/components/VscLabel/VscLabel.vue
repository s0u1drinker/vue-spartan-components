<template>
  <label
    class="vsc-label"
    :for="id"
  >
    {{ labelText }}
    <span
      class="vsc-label__mark"
      v-if="required"
      v-html="requiredMark"
      aria-hidden="true"
    />
  </label>
</template>

<script setup lang="ts">
  import type { VscLabelProps } from './types';

  withDefaults(defineProps<VscLabelProps>(), {
    requiredMark: '*',
  });
</script>

<style lang="scss">
  .vsc-label {
    --vsc-label-width: auto;
    --vsc-label-mark-color: var(--vsc-error);
    --vsc-label-mark-offset: var(--vsc-indent-quarter);

    display: flex;
    align-items: center;
    width: var(--vsc-label-width);

    &__mark {
      color: var(--vsc-label-mark-color);
      margin-left: var(--vsc-label-mark-offset);
    }
  }
</style>
