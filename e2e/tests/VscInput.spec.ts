import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

test.describe('VscInput', () => {
  /** Хелпер для открытия компонента. */
  const openComponent = async (
    page: Page,
    args: string = '',
    inputType: string = 'default-text',
  ) => {
    await page.goto(`/iframe.html?id=vscinput--${inputType}&viewMode=story&args=${args}`);

    const input = page.locator('.vsc-input');

    await input.waitFor();

    return input;
  };

  test('Отображает input с правильным placeholder.', async ({ page }) => {
    const PROP = 'placeholder';
    const PROP_VALUE = 'Введите текст...';
    const input = await openComponent(page, `${PROP}:${PROP_VALUE}`);

    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute(PROP, PROP_VALUE);
  });

  test('Ввод текста изменяет значение input.', async ({ page }) => {
    const input = await openComponent(page, 'modelValue:');
    const TEST_TEXT = 'Test texT';

    await input.fill(TEST_TEXT);

    await expect(input).toHaveValue(TEST_TEXT);
  });

  test('Disabled input неактивен.', async ({ page }) => {
    const input = await openComponent(page, 'modelValue:Отключен', 'disabled-input');

    await expect(input).toBeDisabled();
    await expect(input).toHaveCSS('cursor', 'not-allowed');
  });

  test('Readonly input нельзя изменить.', async ({ page }) => {
    const input = await openComponent(page, `modelValue:Только для чтения`, 'readonly-input');

    await expect(input).toHaveAttribute('readonly', '');
    await expect(input).toHaveCSS('opacity', '0.6');
    await expect(input).toHaveCSS('cursor', 'not-allowed');
  });
});
