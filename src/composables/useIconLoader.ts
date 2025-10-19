/**
 * Кэш для иконок.
 */
const cacheIcon = new Map<string, string>()
/**
 * Кэш промисов.
 */
const cachePromise = new Map<string, Promise<boolean>>()

export function useIconLoader() {
  /**
   * Возвращает значение из кэша по имени иконки.
   * @param iconName Наименование иконки.
   * @returns Значение из кэша или пустая строка.
   */
  const getCachedIcon = (iconName: string): string => {
    return cacheIcon.get(iconName) || ''
  }
  /**
   * Возвращает SVG-иконку по имени.
   * @param iconName Имя иконки: "prefix:name" - для загрузки из Iconify, "public:name" - из папки.
   * @returns SVG-иконка.
   */
  const getIcon = async (iconName: string): Promise<string> => {
    if (!iconName) {
      console.error('Не передано значение переменной.')

      return ''
    }

    if (typeof iconName !== 'string') {
      console.error(`Неверный тип переменной: ${iconName} - ${typeof iconName}.`)

      return ''
    }

    if (cachePromise.has(iconName)) {
      await cachePromise.get(iconName)
    } else {
      if (!cacheIcon.has(iconName)) {
        const [ prefix, name, ...wrongData ] = iconName.split(':')

        if (wrongData.length || !prefix || !name) {
          console.error(`Некорректное название иконки: ${iconName}`)

          return ''
        }

        await loadIconToCache(prefix, name)
      }
    }

    return getCachedIcon(iconName)
  }
  /**
   * Загружает SVG-иконку и добавляет в кэш.
   * @param prefix Название библиотеки.
   * @param name Наименование SVG-иконки.
   * @returns Результат загрузки.
   */
  const loadIconToCache = async (prefix: string, name: string): Promise<boolean> => {
    if (!prefix || !name) {
      console.error(`Не переданы данные для загрузки иконки. Префикс: ${prefix}. Наименование: ${name}.`)

      return false
    }

    const fullIconName = `${prefix}:${name}`
    const path = (prefix === 'public') ? `/icons/${name}.svg` : `https://api.iconify.design/${prefix}/${name}.svg`

    const promise = fetch(path)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Не получилось загрузить иконку с именем "${fullIconName}". Статус: ${response.status}`)
        }

        return response.text()
      })
      .then((svgContent) => {
        cacheIcon.set(fullIconName, svgContent)

        return true
      })
      .catch(error => {
        console.error(error)

        return false
      })
      .finally(() => {
        cachePromise.delete(fullIconName)
      })

    cachePromise.set(fullIconName, promise)

    return await promise
  }

  return {
    getIcon
  }
}