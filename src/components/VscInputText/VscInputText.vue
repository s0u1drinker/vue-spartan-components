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
        :type
        :placeholder
        :disabled
        :readonly
        :required
      />
      <div
        class="vsc-input-text__error"
        v-if="isError && errorText"
      >
        {{ errorText }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useId, computed } from 'vue';
  import { VscInput } from '@components';
  import { LABEL_STYLE } from './constants';
  import { INPUT_TYPES } from '../VscInput/constants';
  import type { VscInputTextProps, VscInputTextTypes } from './types';

  const props = withDefaults(defineProps<VscInputTextProps>(), {
    labelStyle: LABEL_STYLE.default,
  });
  const generatedId = useId();
  const inputId = computed<string>(() => props.id || generatedId);
  const type = computed<VscInputTextTypes>(() =>
    props.password ? INPUT_TYPES.password : INPUT_TYPES.text,
  );
</script>

<style scoped lang="scss">
  .vsc-input-text {
    --vsc-input-text-gap: var(--vsc-indent);
    --vsc-input-text-label-width: auto;

    display: flex;
    gap: var(--vsc-input-text-gap);
    align-items: center;

    &__label {
      width: var(--vsc-input-text-label-width);
    }

    &__mark {
      color: var(--vsc-error);
      margin-left: var(--indent-half);
    }

    &__input-wrapper {
      display: grid;
      gap: var(--vsc-indent-half);
    }

    &__error {
      color: var(--vsc-error);
    }
  }
</style>
