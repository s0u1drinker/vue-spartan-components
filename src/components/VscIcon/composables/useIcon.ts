import { ref, watchEffect } from 'vue';
import { useIconLoader } from './useIconLoader';
import type { Ref } from 'vue';
import type { IconName, UseIcon } from '../types';
/**
 * Composable для работы с SVG-иконкой.
 * @param iconName Наименование иконки.
 * @returns Параметр viewBox и содержимое иконки (path...).
 */
export function useIcon(iconName: Ref<IconName>): UseIcon {
  const { getIcon } = useIconLoader();
  /** Размеры области просмотра SVG-иконки. */
  const viewBox = ref<string>('0 0 24 24');
  /** Содержимое SVG-иконки. */
  const iconContent = ref<string>('');

  watchEffect(async () => {
    try {
      const iconElement = await getIconContent();

      if (iconElement) {
        // Получаем значение атрибута viewBox.
        const iconElementViewBox = iconElement.getAttribute('viewBox');
        // Если есть - обновляем у корневого SVG-элемента.
        iconElementViewBox && (viewBox.value = iconElementViewBox);
        // И копируем содержимое (иконку).
        iconContent.value = iconElement.innerHTML;
      }
    } catch (e) {
      console.error('Не удалось получить SVG-контент:', e);
    }
  });
  /**
   * Получает SVG-иконку из кэша.
   * @returns SVG-элемент или null.
   */
  async function getIconContent(): Promise<SVGElement | null> {
    try {
      const response = await getIcon(iconName.value);
      // Парсим ответ от сервера. Забираем SVG-элемент.
      const parser = new DOMParser();
      const doc = parser.parseFromString(response, 'image/svg+xml');
      const svgElement = doc.querySelector('svg');

      if (!svgElement) {
        throw new Error('Не смог найти тег <svg>.');
      }

      return svgElement;
    } catch (e) {
      console.error('Не удалось получить иконку:', e);

      return null;
    }
  }

  return {
    viewBox,
    iconContent,
  };
}
