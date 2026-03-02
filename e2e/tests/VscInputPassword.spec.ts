import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

test.describe('VscInputPassword', () => {
  const BASE_SELECTOR = '.vsc-input-base';
  const INPUT_SELECTOR = '.vsc-input-password__input';
  const BUTTON_SELECTOR = '.vsc-input-password__button';

  /** Хелпер для открытия истории компонента. */
  const openStory = async (page: Page, inputType: string = 'default', args: string = '') => {
    await page.goto(`/iframe.html?id=vscinputpassword--${inputType}&viewMode=story&args=${args}`);

    const component = page.locator(BASE_SELECTOR);

    await component.waitFor();

    return component;
  };

  test('Отображает поле ввода и кнопку.', async ({ page }) => {
    const component = await openStory(page, 'default');
    const input = component.locator(INPUT_SELECTOR);
    const button = component.locator(BUTTON_SELECTOR);

    await expect(input).toBeVisible();
    await expect(button).toBeVisible();
  });

  test('Переключение видимости пароля.', async ({ page }) => {
    const component = await openStory(page, 'default');
    const input = component.locator(INPUT_SELECTOR);
    const button = component.locator(BUTTON_SELECTOR);

    await expect(input).toHaveAttribute('type', 'password');
    await expect(button).toHaveAttribute('aria-pressed', 'false');
    await expect(button).toHaveAttribute('aria-label', 'Показать пароль');

    await button.click();

    await expect(input).toHaveAttribute('type', 'text');
    await expect(button).toHaveAttribute('aria-pressed', 'true');
    await expect(button).toHaveAttribute('aria-label', 'Скрыть пароль');

    await button.click();

    await expect(input).toHaveAttribute('type', 'password');
    await expect(button).toHaveAttribute('aria-pressed', 'false');
    await expect(button).toHaveAttribute('aria-label', 'Показать пароль');
  });

  test('Состояние "disabled".', async ({ page }) => {
    const component = await openStory(page, 'disabled');
    const input = component.locator(INPUT_SELECTOR);
    const button = component.locator(BUTTON_SELECTOR);
    const wrapper = component.locator('.vsc-input-password');

    await expect(wrapper).toHaveAttribute('aria-disabled', 'true');
    await expect(wrapper).toHaveClass(/vsc-input-password_disabled/);
    await expect(input).toBeDisabled();
    await expect(button).toBeDisabled();
  });
});
