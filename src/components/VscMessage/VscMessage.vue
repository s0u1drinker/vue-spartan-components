<template>
  <div :class="componentClass">
    <VscIcon
      v-if="icon"
      class="vsc-message__icon"
      :icon-name="icon"
      size="1.25rem"
      :aria-hidden="true"
    />
    <span>{{ message }}</span>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { VscIcon } from '@components';
  import type { VscMessage } from './types';

  const props = defineProps<VscMessage>();
  const componentClass = computed(() => [
    'vsc-message',
    {
      'vsc-message_background': props.showBackground,
    },
  ]);
</script>

<style scoped lang="scss">
  .vsc-message {
    --vsc-message-icon-color: inherit;
    --vsc-message-text-color: inherit;
    --vsc-message-background-color: var(--vsc-gray-300);

    color: var(--vsc-message-text-color);
    width: fit-content;

    &_background {
      background-color: var(--vsc-message-background-color);
      padding: var(--vsc-indent-quarter) var(--vsc-indent-half);
      border-radius: var(--vsc-border-radius);
    }

    &__icon {
      color: var(--vsc-message-icon-color);
      margin-right: var(--vsc-indent-quarter);
      vertical-align: bottom;
    }
  }
</style>
