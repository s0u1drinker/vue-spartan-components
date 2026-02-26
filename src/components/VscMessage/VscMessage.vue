<template>
  <div
    :class="componentClass"
    :role="messageRole"
    :aria-atomic
  >
    <VscIcon
      v-if="icon"
      class="vsc-message__icon"
      :icon-name="icon"
      size="1.25rem"
      :aria-hidden="true"
    />
    <span>{{ messageValue }}</span>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { VscIcon } from '@components';
  import type { VscMessageProps } from './types';
  import type { TRoleMessage } from '@types';

  const props = withDefaults(defineProps<VscMessageProps>(), {
    ariaAtomic: 'true',
  });

  const componentClass = computed(() => [
    'vsc-message',
    {
      'vsc-message_background': props.showBackground,
    },
  ]);

  const messageValue = computed<string>(() => props.message || '');
  /** Значение атрибута "role". */
  const messageRole = computed<TRoleMessage>(() => {
    if (props?.role) return props.role;

    return props?.isError ? 'alert' : 'status';
  });
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
