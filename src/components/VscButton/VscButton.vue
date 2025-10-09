<template>
  <button
    class="vsc-button"
    :class="[classes]"
    :type="buttonType"
    :aria-label="ariaLabelText"
    :aria-disabled="disabled"
    @click="handleClick"
    v-bind="restAttrs"
  >
    <slot>
      <span v-if="text">{{ text }}</span>
    </slot>
  </button>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { ButtonProps, ButtonClasses } from './types'

// Отключаем наследование атрибутов.
defineOptions({
  inheritAttrs: false
})
// Убираем style из атрибутов.
const { style, ...restAttrs } = useAttrs()

const props: ButtonProps = withDefaults(defineProps<ButtonProps>(), {
  buttonType: 'button',
  buttonStyle: 'default',
  disabled: false,
})
const buttonColor = computed<string>(() => {
  let returnClass = `vsc-button_color_`

  if (props.colorTheme) {
    returnClass += `${props.colorTheme}`
  } else if (props.customColorTheme) {
    document.documentElement.style.setProperty('--vsc-custom-bg', props.customColorTheme.background)
    document.documentElement.style.setProperty('--vsc-custom-txt', props.customColorTheme.text)
    document.documentElement.style.setProperty('--vsc-custom-bg-dark', props.customColorTheme.dark)
    document.documentElement.style.setProperty('--vsc-custom-bg-light', props.customColorTheme.light)
    returnClass += 'custom'
  } else {
    returnClass += 'primary'
  }

  return returnClass
})
/**
 * Список классов кнопки.
 */
const classes = computed<ButtonClasses[]>(() => ([
  {
    'vsc-button_disabled': props.disabled ?? false,
    'vsc-button_eleveated': props.elevated ?? false,
    'vsc-button_rounded': props.rounded ?? false,
    [`vsc-button_${props.buttonStyle}`]: props.buttonStyle !== 'default'
  },
  buttonColor.value
]))
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
    transform: scale(0.8);
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