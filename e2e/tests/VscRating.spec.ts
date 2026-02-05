import { test, expect } from '@playwright/test';

test.describe('VscRating Component', () => {
  // ⚠️ ВАЖНО: Проверь этот ID в URL своего Storybook!
  // Если файл называется VscRating.stories.ts, ID может быть 'components-vscrating--default'
  const STORY_ID = 'vscrating--default';

  // Хелпер для открытия чистого компонента (без UI сторибука)
  const openComponent = async (page: any, args: string) => {
    // viewMode=story + iframe.html убирает лишние панели
    await page.goto(`/iframe.html?id=${STORY_ID}&viewMode=story&args=${args}`);
    // Ждем, пока компонент смонтируется
    const component = page.locator('.vsc-rating');
    await component.waitFor();
    return component;
  };

  test('Indicator: Отображает 3.5 звезды (с частичной заливкой).', async ({ page }) => {
    // setRating:false -> режим отображения
    const rating = await openComponent(page, 'modelValue:3.5;maxValue:5;setRating:false');

    // 1. Проверяем наличие обертки частичной иконки
    const partialWrapper = rating.locator('.vsc-rating__partial-icon');
    await expect(partialWrapper).toBeVisible();

    // 2. Ищем именно верхний слой (у которого есть стиль обрезки)
    // Используем селектор по частичному совпадению стиля, это надежно
    const clippedIcon = partialWrapper.locator('[style*="clip-path"]');
    await expect(clippedIcon).toBeVisible();

    // 3. Проверяем значение (50%)
    const style = await clippedIcon.getAttribute('style');
    // Используем регулярку, чтобы игнорировать пробелы: 50% или 50.0%
    expect(style).toMatch(/50(\.0+)?%/);
  });

  test('Indicator: Отображает текст значения (4 / 10).', async ({ page }) => {
    const rating = await openComponent(page, 'modelValue:4;maxValue:10;showMaxValue:true');

    const valueText = rating.locator('.vsc-rating__value');
    await expect(valueText).toHaveText('4 / 10');
  });

  test('Setter: Клик устанавливает рейтинг.', async ({ page }) => {
    // Включаем интерактивность
    const rating = await openComponent(page, 'setRating:true;modelValue:0;maxValue:5');

    // В Setter режиме иконок ровно столько, сколько maxValue, так как PartialIcon не используется
    const icons = rating.locator('.vsc-rating__icon');

    // Кликаем по 4-й звезде (индекс 3)
    await icons.nth(3).click();

    // Проверяем классы
    // У 4-й должен появиться модификатор _selected
    await expect(icons.nth(3)).toHaveClass(/vsc-rating__icon_selected/);

    // А у 5-й (индекс 4) его быть не должно
    await expect(icons.nth(4)).not.toHaveClass(/vsc-rating__icon_selected/);
  });

  test('Setter: Навигация с клавиатуры (A11y).', async ({ page }) => {
    const rating = await openComponent(page, 'setRating:true;modelValue:0');

    // Находим интерактивный контейнер
    // Если тест падает тут — проверь, что VscRatingSetter имеет tabindex="0" и role="radiogroup"
    const setter = rating.locator('[role="radiogroup"]');

    // 1. Фокус
    await setter.focus();
    await expect(setter).toBeFocused();

    // 2. Стрелка вправо -> 1 звезда
    await page.keyboard.press('ArrowRight');
    const star1 = rating.locator('.vsc-rating__icon').nth(0);
    await expect(star1).toHaveClass(/vsc-rating__icon_selected/);

    // 3. Стрелка вправо -> 2 звезды
    await page.keyboard.press('ArrowRight');
    const star2 = rating.locator('.vsc-rating__icon').nth(1);
    await expect(star2).toHaveClass(/vsc-rating__icon_selected/);
  });

  test('Setter: Границы значений (Min/Max).', async ({ page }) => {
    // Максимум 2 звезды
    const rating = await openComponent(page, 'setRating:true;modelValue:0;maxValue:2');
    const setter = rating.locator('[role="radiogroup"]');
    await setter.focus();

    // Попытка уйти влево от 0 (ничего не должно произойти)
    await page.keyboard.press('ArrowLeft');
    const selected = rating.locator('.vsc-rating__icon_selected');
    await expect(selected).toHaveCount(0);

    // Идем вправо до упора (3 раза, хотя макс 2)
    await page.keyboard.press('ArrowRight'); // 1
    await page.keyboard.press('ArrowRight'); // 2
    await page.keyboard.press('ArrowRight'); // Блок

    // Должно быть выбрано только 2
    await expect(selected).toHaveCount(2);
  });
});
