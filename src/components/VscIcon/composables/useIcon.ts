import { ref, watch } from 'vue';
import { useIconLoader } from './useIconLoader';
import type { Ref } from 'vue';
import type { IconName, UseIcon } from '../types';
/**
 * Composable для работы с SVG-иконкой.
 * @param iconName Наименование иконки.
 * @returns Параметр viewBox и содержимое иконки (path...).
 */
export function useIcon(iconName: Ref<IconName>): UseIcon {
  const { getIcon, loadError } = useIconLoader(iconName);
  /** Размеры области просмотра SVG-иконки. */
  const viewBox = ref<string>('0 0 24 24');
  /** Содержимое SVG-иконки. */
  const iconContent = ref<string>('');

  watch(
    iconName,
    async () => {
      const iconElement = await getIconContent();

      if (iconElement) {
        // Получаем значение атрибута viewBox.
        const iconElementViewBox = iconElement.getAttribute('viewBox');
        // Если есть - обновляем у корневого SVG-элемента.
        iconElementViewBox && (viewBox.value = iconElementViewBox);
        // И копируем содержимое (иконку).
        iconContent.value = iconElement.innerHTML;
      } else {
        console.error('Не удалось получить SVG-контент.');
      }
    },
    { immediate: true }
  );
  /**
   * Получает SVG-иконку из кэша.
   * @returns SVG-элемент или null.
   */
  async function getIconContent(): Promise<SVGElement | null> {
    try {
      if (loadError.value) {
        throw new Error(loadError.value);
      }

      const response = await getIcon();
      // Вставляем ответ от сервера во временный div.
      const div = document.createElement('div');
      div.insertAdjacentHTML('beforeend', response);
      // Забираем SVG-элемент.
      const svgElement = div.querySelector('svg');

      if (!svgElement) {
        throw new Error('Не смог найти тег <svg>.');
      }

      return svgElement;
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : e;

      console.error('Ошибка при загрузке иконки:', errorMessage);

      return null;
    }
  }

  return {
    viewBox,
    iconContent,
  };
}
