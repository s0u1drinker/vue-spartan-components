import { test, expect } from '@playwright/test';
import { ICON_MAIN_CLASS, ICON_SELECTED_CLASS } from '../../src/components/VscRating/constants';
import { KEY_ARROWS } from '../../src/constants';
import type { Page } from '@playwright/test';

test.describe('VscRating', () => {
  /** Хелпер для открытия компонента. */
  const openComponent = async (page: Page, args: string) => {
    await page.goto(`/iframe.html?id=vscrating--default&viewMode=story&args=${args}`);

    const component = page.locator('.vsc-rating');

    await component.waitFor();

    return component;
  };

  /** Конвертирует объект с аргументами в строку. */
  const convertArgsToString = (args: Record<string, number | boolean>) => {
    return Object.entries(args)
      .map(([key, value]) => `${key}:${value}`)
      .join(';');
  };

  test('Отображается 3.5 звезды.', async ({ page }) => {
    const args = {
      modelValue: 3.5,
      maxValue: 5,
      setRating: false,
    };
    const rating = await openComponent(page, convertArgsToString(args));
    const partialWrapper = rating.locator('.vsc-rating__partial-icon');

    await expect(partialWrapper).toBeVisible();

    const clippedIcon = partialWrapper.locator('[style*="clip-path"]');

    await expect(clippedIcon).toBeVisible();

    const style = await clippedIcon.getAttribute('style');

    expect(style).toMatch(/50(\.0+)?%/);
  });

  test('Отображается текст значения максимального значения.', async ({ page }) => {
    const args = {
      modelValue: 4,
      maxValue: 10,
      showMaxValue: true,
    };
    const rating = await openComponent(page, convertArgsToString(args));
    const valueText = rating.locator('.vsc-rating__value');

    await expect(valueText).toHaveText('4 / 10');
  });

  test('При клике устанавливается новый рейтинг.', async ({ page }) => {
    const args = {
      modelValue: 0,
      maxValue: 5,
      setRating: true,
    };
    const rating = await openComponent(page, convertArgsToString(args));
    const icons = rating.locator(ICON_MAIN_CLASS.selector);

    await icons.nth(3).click();

    await expect(icons.nth(3)).toContainClass(ICON_SELECTED_CLASS.name);

    await expect(icons.nth(4)).not.toContainClass(ICON_SELECTED_CLASS.name);
  });

  test('Навигация с клавиатуры.', async ({ page }) => {
    const args = {
      modelValue: 0,
      setRating: true,
    };
    const rating = await openComponent(page, convertArgsToString(args));
    const setter = rating.locator('[role="radiogroup"]');

    await setter.focus();
    await expect(setter).toBeFocused();
    await page.keyboard.press(KEY_ARROWS.right);

    const star1 = rating.locator(ICON_MAIN_CLASS.selector).nth(0);

    await expect(star1).toContainClass(ICON_SELECTED_CLASS.name);
    await page.keyboard.press(KEY_ARROWS.right);

    const star2 = rating.locator(ICON_MAIN_CLASS.selector).nth(1);

    await expect(star2).toContainClass(ICON_SELECTED_CLASS.name);
  });

  test('Не выходит за границы значений при вводе с клавиатуры.', async ({ page }) => {
    const args = {
      modelValue: 0,
      maxValue: 2,
      setRating: true,
    };
    const rating = await openComponent(page, convertArgsToString(args));
    const setter = rating.locator('[role="radiogroup"]');

    await setter.focus();
    await page.keyboard.press(KEY_ARROWS.left);

    const selected = rating.locator(ICON_SELECTED_CLASS.selector);

    await expect(selected).toHaveCount(0);
    await page.keyboard.press(KEY_ARROWS.right);
    await page.keyboard.press(KEY_ARROWS.right);
    await page.keyboard.press(KEY_ARROWS.right);
    await expect(selected).toHaveCount(2);
  });
});
