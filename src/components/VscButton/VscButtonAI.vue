<template>
  <button
    class="vsc-button"
    :class="[
      `vsc-button--${variant}`,
      `vsc-button--${size}`,
      { 'vsc-button--disabled': disabled }
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot>{{ text }}</slot>
  </button>
</template>

<script setup lang="ts">
// Типы
type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost'
type ButtonSize = 'small' | 'medium' | 'large'

// Props
interface Props {
  text?: string
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
  variant: 'primary',
  size: 'medium',
  disabled: false,
  color: 'white',
})

// Emits
const emit = defineEmits<{
  click: []
}>()

const handleClick = () => {
  if (!props.disabled) {
    emit('click')
  }
}
</script>

<style scoped lang="scss">
.vsc-button {
  padding: 8px 16px;
  border: none;
  border-radius: var(--vsc-border-radius);
  cursor: pointer;
  font-size: var(--vsc-font-size-medium);
  transition: all 0.2s ease;
  box-shadow: var(--vsc-box-shadow);

  // Пример использования миксина
  &--primary {
    background-color: var(--vsc-primary-color);
    color: v-bind(color);

    &:hover {
      background-color: var(--vsc-primary-color-dark);
    }
  }

  &--secondary {
    background-color: var(--vsc-secondary-color);
    color: v-bind(color);

    &:hover {
      background-color: var(--vsc-secondary-color-dark);
    }
  }

  &--danger {
    background-color: var(--vsc-danger-color);
    color: v-bind(color);

    &:hover {
      background-color: var(--vsc-danger-color-dark);
    }
  }

  &--ghost {
    background-color: transparent;
    color: var(--vsc-primary-color);
    border: 1px solid var(--vsc-primary-color);
  }

  &--small {
    padding: 4px 8px;
    font-size: var(--vsc-font-size-small);
  }

  &--large {
    padding: 12px 24px;
    font-size: var(--vsc-font-size-large);
  }

  &--disabled,
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
</style>