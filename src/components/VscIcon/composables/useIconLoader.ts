import { computed, watchEffect, ref } from 'vue';
import type { Ref } from 'vue';
import type {
  IconName,
  UseIconLoader,
  CacheIcon,
  CachePromise,
  IconPath,
} from '../types';

/**
 * Кэш для иконок.
 */
const cacheIcon: CacheIcon = new Map();
/**
 * Кэш промисов.
 */
const cachePromise: CachePromise = new Map();

export function useIconLoader(iconName: Ref<IconName>): UseIconLoader {
  const prefix = ref<string>('');
  const name = ref<string>('');
  let loadError = ref<string>('');

  watchEffect(() => {
    loadError.value =
      !iconName || !iconName.value
        ? 'Не передано значение переменной.'
        : typeof iconName.value !== 'string'
          ? `Неверный тип переменной (${iconName.value}): ${typeof iconName.value}.`
          : '';

    if (!loadError.value) {
      const parts = iconName.value.split(':');

      if (parts.length !== 2 || !parts[1] || !parts[0]) {
        loadError.value = `Некорректное название иконки: ${iconName.value}`;
      } else {
        prefix.value = parts[0] || '';
        name.value = parts[1] || '';
      }
    }
  });

  /** Путь для загрузки иконки. */
  const pathToLoadIcon = computed<IconPath | ''>(() => {
    if (loadError.value) {
      return '';
    }

    return prefix.value === 'public'
      ? `/icons/${name.value}.svg`
      : `https://api.iconify.design/${prefix.value}/${name.value}.svg`;
  });

  /** Возвращает значение из кэша по имени иконки. */
  const getIconFromCache = (): string => {
    return cacheIcon.get(iconName.value) || '';
  };
  /** Возвращает SVG-иконку по имени: "prefix:name" - для загрузки из Iconify, "public:name" - из папки. */
  const getIcon = async (): Promise<string> => {
    if (loadError.value) {
      return '';
    }

    if (cachePromise.has(iconName.value)) {
      await cachePromise.get(iconName.value);
    } else {
      if (!cacheIcon.has(iconName.value)) {
        await loadIconToCache();
      }
    }

    return getIconFromCache();
  };
  /** Загружает SVG-иконку и добавляет в кэш. */
  const loadIconToCache = async (): Promise<boolean> => {
    const promise = fetch(pathToLoadIcon.value)
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error(
            `Не получилось загрузить иконку с именем "${iconName.value}". Статус: ${response.status}`
          );
        }

        return response.text();
      })
      .then((svgContent: string) => {
        cacheIcon.set(iconName.value, svgContent);

        return true;
      })
      .catch((error: string) => {
        console.error(error);

        return false;
      })
      .finally(() => {
        cachePromise.delete(iconName.value);
      });

    cachePromise.set(iconName.value, promise);

    return await promise;
  };

  return {
    getIcon,
    loadError,
  };
}
