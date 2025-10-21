<template>
  <button
    ref="button"
    class="vsc-button"
    :class="classes"
    :type="buttonType"
    :aria-label="ariaLabelText"
    :aria-disabled="disabled"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot>
      <VscIcon
        :icon-name="props.iconLeft"
        v-if="props.iconLeft"
      />
      <span v-if="text">{{ text }}</span>
      <VscIcon
        :icon-name="props.iconRight"
        v-if="props.iconRight"
      />
    </slot>
  </button>
</template>

<script setup lang="ts">
import { computed, onMounted, useTemplateRef } from 'vue'
import { VscIcon } from '@components';
import { setVarsForCustomColorTheme } from '@utils'
import type { VscButtonProps, VscButtonClasses } from './types'

const props: VscButtonProps = withDefaults(defineProps<VscButtonProps>(), {
  buttonType: 'button',
  disabled: false,
})
const buttonRef = useTemplateRef<HTMLElement>('button')
/**
 * Цветовая тема кнопки.
 */
const buttonColor = computed<string>(() => {
  if (props.customColorTheme) {
    return 'custom'
  }

  return props.colorTheme ?? 'primary'
})
/**
 * Флаг наличия только одной иконки (слева или справа).
 */
const isSetOnlyOneIcon = computed<boolean>(() => {
  const isSetLeftIcon = !!props.iconLeft
  const isSetRightIcon = !!props.iconRight

  return !!(Number(isSetLeftIcon) ^ Number(isSetRightIcon))
})
/**
 * Список классов кнопки.
 */
const classes = computed<VscButtonClasses>(() => (
  {
    'vsc-button_disabled': props.disabled ?? false,
    'vsc-button_elevated': props.elevated ?? false,
    'vsc-button_rounded': props.rounded ?? false,
    'vsc-button_only-icon': isSetOnlyOneIcon.value && !Boolean(props.text),
    [`vsc-button_${props.buttonStyle}`]: !!props.buttonStyle,
    [`vsc-button_color_${buttonColor.value}`]: true,
  }
))
/**
 * Значение атрибута aria-label.
 */
const ariaLabelText = computed<string>(() => {
  if (props.ariaLabel) return props.ariaLabel
  if (props.text) return props.text

  console.error('Необходимо указать значение <text> или <aria-label>.')
  return ''
})

const emit = defineEmits<{
  (e: 'click'): void
}>()

const handleClick = () => {
  if (!props.disabled) {
    emit('click')
  }
}

if (!props.text && !props.iconLeft && !props.iconRight) {
  console.error('Необходимо указать иконку или текст для кнопки.')
}

onMounted(() => {
  if (props.customColorTheme && buttonRef.value) {
    setVarsForCustomColorTheme(props.customColorTheme, buttonRef.value)
  }
})
</script>

<style lang="scss">
@use "sass:color";

.vsc-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--vsc-indent-quarter);
  padding: var(--vsc-indent-half) var(--vsc-indent);
  border: var(--vsc-border) transparent;
  border-radius: var(--vsc-border-radius);
  transition: 
    color var(--vsc-transition),
    background-color var(--vsc-transition),
    transform var(--vsc-transition);

  &:focus {
    outline: none;
  }

  &:active {
    transform: scale(0.9);
  }

  &_disabled {
    @include disabled;
  }

  &_elevated {
    box-shadow: var(--vsc-box-shadow);
  }

  &_rounded {
    border-radius: 50%;
  }

  &_only-icon {
    padding: var(--vsc-indent-half);
  }

  &_color_primary {
    @include buttonStylesForColor('primary', var(--vsc-white));
  }

  &_color_accent {
    @include buttonStylesForColor('accent', var(--vsc-white));
  }

  &_color_success {
    @include buttonStylesForColor('success', var(--vsc-white));
  }

  &_color_error {
    @include buttonStylesForColor('error', var(--vsc-white));
  }

  &_color_custom {
    @include buttonStylesForColor('custom', var(--vsc-custom-text));
  }
}
</style>