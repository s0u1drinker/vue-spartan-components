<template>
  <button
    class="vsc-button"
    :class="classes"
    :type="buttonType"
    :aria-label="ariaLabelText"
    :aria-disabled="disabled"
    v-bind="restAttrs"
    @click="handleClick"
    ref="button"
  >
    <slot>
      <span v-if="text">{{ text }}</span>
    </slot>
  </button>
</template>

<script setup lang="ts">
import { computed, useAttrs, useTemplateRef } from 'vue'
import { setVarsForCustomColorTheme } from '@utils'
import type { VscButtonProps, VscButtonClasses } from './types'

// Отключаем наследование атрибутов.
defineOptions({
  inheritAttrs: false
})
// Убираем style из атрибутов.
const restAttrs = useAttrs()
restAttrs.style = {}

const props: VscButtonProps = withDefaults(defineProps<VscButtonProps>(), {
  buttonType: 'button',
  buttonStyle: 'default',
  disabled: false,
})
const buttonRef = useTemplateRef<HTMLElement>('button')
/**
 * Цветовая тема кнопки.
 */
const buttonColor = computed<string>(() => {
  if (props.customColorTheme) {
    setVarsForCustomColorTheme(props.customColorTheme, buttonRef.value)
    return 'custom'
  }

  return props.colorTheme ?? 'primary'
})
/**
 * Список классов кнопки.
 */
const classes = computed<VscButtonClasses>(() => (
  {
    'vsc-button_disabled': props.disabled ?? false,
    'vsc-button_eleveated': props.elevated ?? false,
    'vsc-button_rounded': props.rounded ?? false,
    [`vsc-button_${props.buttonStyle}`]: props.buttonStyle !== 'default',
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
  click: []
}>()

const handleClick = () => {
  if (!props.disabled) {
    emit('click')
  }
}

if (!props.text && !props.iconLeft && !props.iconRight) {
  console.error('Необходимо указать иконку или текст для кнопки.')
}
</script>

<style scoped lang="scss">
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
    @include buttonStylesForColor('custom-bg', var(--vsc-custom-txt));
  }
}
</style>