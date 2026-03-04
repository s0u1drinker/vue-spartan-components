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
    <VscInput
      :id="inputId"
      class="vsc-input-text"
      :type="INPUT_TYPES.text"
      :placeholder
      :disabled
      :readonly
      :required
      :aria-invalid="isInvalidValue"
      v-model="model"
    />
  </VscInputBase>
</template>

<script setup lang="ts">
  import { useId, computed } from 'vue';
  import VscInputBase from './VscInputBase.vue';
  import { VscInput } from '@components';
  import { INPUT_TYPES, LABEL_STYLE } from './constants';
  import type { VscInputTextProps } from './types';

  const props = withDefaults(defineProps<VscInputTextProps>(), {
    labelStyle: LABEL_STYLE.default,
  });

  const model = defineModel<string>();

  const generatedId = useId();
  /** Идентификатор. */
  const inputId = computed<string>(() => props.id || generatedId);
  /** Флаг ошибки. */
  const isInvalidValue = computed<boolean>(() => !!props?.error?.isError);
</script>

<style lang="scss">
  .vsc-input-text {
    --padding-fallback: var(--vsc-indent-half);

    padding: var(--vsc-input-text-padding, var(--padding-fallback));
    width: 100%;
  }
</style>
