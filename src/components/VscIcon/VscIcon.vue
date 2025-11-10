<template>
  <i ref="icon"></i>
</template>

<script setup lang="ts">
import { useTemplateRef, useAttrs, ref, watchEffect } from 'vue';
import { useIconLoader } from './composables/useIconLoader';
import type { IconProps } from './types';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<IconProps>(), {
  size: '1rem',
  ariaHidden: true,
});
const { getIcon } = useIconLoader();
const attrs = useAttrs();
const iconRef = useTemplateRef<HTMLElement>('icon');
const svgContent = ref<string>('');

watchEffect(async () => {
  svgContent.value = await getIcon(props.iconName);
  // Парсим ответ от сервера. Забираем тег <svg>.
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgContent.value, 'image/svg+xml');
  const svgIcon = doc.querySelector('svg');

  if (!svgIcon) {
    console.error('Не смог найти тег <svg>.');

    return;
  }
  // Выставляем размеры.
  svgIcon.setAttribute('width', props.size);
  svgIcon.setAttribute('height', props.size);
  // Перекидываем атрибуты.
  Object.entries(attrs).forEach(([key, value]) => {
    svgIcon.setAttribute(key, String(value));
  });
  // Применяем пропсы.
  svgIcon.setAttribute('aria-hidden', String(props.ariaHidden));
  props.iconColor && (svgIcon.style.color = props.iconColor);
  // Заменяем элемент.
  iconRef.value?.replaceChildren(svgIcon);
});
</script>

<style lang="scss"></style>
