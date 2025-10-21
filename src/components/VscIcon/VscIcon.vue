<template>
  <i ref="icon" style="display: none;"></i>
</template>

<script setup lang="ts">
import { onMounted, useTemplateRef, useAttrs } from 'vue'
import { useIconLoader } from '@/composables/useIconLoader'
import type { IconProps } from './types'

defineOptions({
  inheritAttrs: false
})

const { iconName, size = '1rem' } = defineProps<IconProps>()
const { getIcon } = useIconLoader()
const attrs = useAttrs()
const iconRef = useTemplateRef<HTMLElement>('icon')

onMounted(async () => {
  if (!iconRef.value) {
    console.error('Не найден элемент с ref="icon".')

    return
  }

  const parent = iconRef.value.parentElement

  if (!parent) {
    console.error('Не найден родитель для элемента.')

    return
  }

  const svgContent = await getIcon(iconName)

  if (svgContent) {
    // Парсим ответ от сервера. Забираем тег <svg>.
    const parser = new DOMParser()
    const doc = parser.parseFromString(svgContent, 'image/svg+xml')
    const svgIcon = doc.querySelector('svg')

    if (!svgIcon) {
      console.error('Не смог найти тег <svg>.')

      return
    }
    // Выставляем размеры.
    svgIcon.setAttribute('width', size)
    svgIcon.setAttribute('height', size)
    // Перекидываем атрибуты.
    Object.entries(attrs).forEach(([key, value]) => {
      svgIcon.setAttribute(key, String(value))
    })
    // Заменяем элемент.
    parent.replaceChild(svgIcon, iconRef.value)
  } else {
    // Если иконка не  загрузилась - удаляем обёртку.
    parent.removeChild(iconRef.value)
  }
})
</script>

<style lang="scss"></style>