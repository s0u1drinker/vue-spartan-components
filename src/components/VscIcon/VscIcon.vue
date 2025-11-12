<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :style="svgInlineStyle"
    :width="props.size"
    :height="props.size"
    :viewBox
    :aria-hidden="props.ariaHidden"
    v-html="iconContent"
  ></svg>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue';
import { useIcon } from './composables/useIcon';
import type { StyleValue } from 'vue';
import type { IconProps } from './types';

const props = withDefaults(defineProps<IconProps>(), {
  size: '1rem',
  ariaHidden: true,
});
const { viewBox, iconContent } = useIcon(toRef(props, 'iconName'));
/** Inline-стили SVG-иконки: цвет и т.д. */
const svgInlineStyle = computed<StyleValue>(() => {
  if (!props.iconColor) return null;

  return {
    color: props.iconColor,
  };
});
</script>

<style lang="scss"></style>
