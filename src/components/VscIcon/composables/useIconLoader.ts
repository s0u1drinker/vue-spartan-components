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
  let wrongData = ref<string[]>([]);
  /** Сообщение об ошибке. */
  const loadError = computed((): string => {
    return !iconName.value
      ? 'Не передано значение переменной.'
      : typeof iconName.value !== 'string'
        ? `Неверный тип переменной (${iconName.value}): ${typeof iconName.value}.`
        : wrongData.value.length || !prefix.value || !name.value
          ? `Некорректное название иконки: ${iconName.value}`
          : '';
  });
  /** Разбиваем имя иконки при изменении. */
  watchEffect(() => {
    const parts = iconName.value.split(':');

    prefix.value = parts[0] || '';
    name.value = parts[1] || '';
    wrongData.value = parts.slice(2);
  });

  /** Путь для загрузки иконки. */
  const pathToLoadIcon = computed<IconPath | ''>(() => {
    if (loadError.value) return '';

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
