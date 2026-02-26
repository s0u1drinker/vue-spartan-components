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
    await expect(input).toHaveAttribute('type', 'search');
    await expect(input).toHaveCSS('cursor', 'not-allowed');
  });

  test('Readonly input нельзя изменить.', async ({ page }) => {
    const input = await openComponent(page, `modelValue:Только для чтения`, 'readonly-input');

    await expect(input).toHaveAttribute('readonly', '');
    await expect(input).toHaveAttribute('type', 'email');
    await expect(input).toHaveCSS('opacity', '0.6');
    await expect(input).toHaveCSS('cursor', 'not-allowed');
  });

  test('Invalid input имеет корректные aria-атрибуты и стиль.', async ({ page }) => {
    const input = await openComponent(page, '', 'invalid-input');

    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await expect(input).toHaveAttribute('aria-describedby', 'error-message-id');
    await expect(input).toHaveCSS('border-color', 'rgb(255, 0, 0)');
  });

  test('Кастомные стили через CSS-переменные применяются корректно.', async ({ page }) => {
    const input = await openComponent(page, '', 'custom-styles');

    await expect(input).toHaveCSS('border-radius', '20px');
    await expect(input).toHaveCSS('border-width', '2px');
    await expect(input).toHaveCSS('border-color', 'rgb(128, 0, 128)');
    await expect(input).toHaveCSS('padding', '12px');
    await expect(input).toHaveCSS('background-color', 'rgb(240, 240, 240)');

    await input.focus();

    await expect(input).toHaveCSS('border-color', 'rgb(255, 165, 0)');
  });
});
