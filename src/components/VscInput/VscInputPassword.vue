<template>
  <VscInputBase
    :id="inputId"
    :label
    :required
    :show-error
    :error
    :required-mark
  >
    <div class="vsc-input-password">
      <VscInput
        :id="inputId"
        class="vsc-input-password__input"
        :type="INPUT_TYPES.password"
        :placeholder
        :disabled
        :readonly
        :required
      />
      <VscIcon :icon-name="" />
    </div>
  </VscInputBase>
</template>

<script setup lang="ts">
  import { useId, computed } from 'vue';
  import VscInputBase from './VscInputBase.vue';
  import { VscInput, VscIcon } from '@components';
  import { INPUT_TYPES, LABEL_STYLE } from './constants';
  import type { VscInputTextProps } from './types';

  const props = withDefaults(defineProps<VscInputTextProps>(), {
    labelStyle: LABEL_STYLE.default,
  });

  const generatedId = useId();
  /** Идентификатор. */
  const inputId = computed<string>(() => props.id || generatedId);
</script>

<style scoped lang="scss">
  .vsc-input-text {
    --padding-fallback: var(--vsc-indent-quarter) var(--vsc-indent-half);

    padding: var(--vsc-input-text-padding, var(--padding-fallback));
  }
</style>
