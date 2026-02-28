import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

test.describe('VscInputText', () => {
  const BASE_SELECTOR = '.vsc-input-base';
  const INPUT_SELECTOR = '.vsc-input-text';
  const LABEL_SELECTOR = '.vsc-label';
  const MESSAGE_SELECTOR = '.vsc-message';
  const MARK_SELECTOR = '.vsc-label__mark';

  /** Хелпер для открытия истории компонента. */
  const openStory = async (page: Page, inputType: string = 'default', args: string = '') => {
    await page.goto(`/iframe.html?id=vscinputtext--${inputType}&viewMode=story&args=${args}`);

    const component = page.locator(BASE_SELECTOR);

    await component.waitFor();

    return component;
  };

  test('Правильная структура.', async ({ page }) => {
    const component = await openStory(page, 'default');
    const input = component.locator(INPUT_SELECTOR);
    const label = component.locator(LABEL_SELECTOR);

    await expect(component).toBeVisible();
    await expect(label).toHaveText('Имя пользователя');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('placeholder', 'Введите текст...');
  });

  test('Связь label и input через id.', async ({ page }) => {
    const component = await openStory(page, 'default');
    const label = component.locator(LABEL_SELECTOR);
    const input = component.locator(INPUT_SELECTOR);
    const inputId = await input.getAttribute('id');

    await expect(label).toHaveAttribute('for', inputId);

    await label.click();

    await expect(input).toBeFocused();
  });

  test('Отображает маркер для обязательного поля.', async ({ page }) => {
    const component = await openStory(page, 'required');
    const mark = component.locator(MARK_SELECTOR);

    await expect(mark).toBeVisible();
    await expect(mark).toHaveText('*');
  });

  test('Состояние "disabled".', async ({ page }) => {
    const component = await openStory(page, 'disabled');
    const input = component.locator(INPUT_SELECTOR);

    await expect(input).toBeDisabled();
    await expect(input).toHaveValue('Нельзя редактировать');
  });

  test('Состояние "readonly".', async ({ page }) => {
    const component = await openStory(page, 'readonly');
    const input = component.locator(INPUT_SELECTOR);

    await expect(input).toHaveAttribute('readonly', '');
    await expect(input).toHaveValue('Только для просмотра');
  });

  test('Состояние ошибки.', async ({ page }) => {
    const component = await openStory(page, 'with-error');
    const input = component.locator(INPUT_SELECTOR);
    const message = component.locator(MESSAGE_SELECTOR);

    await expect(message).toBeVisible();
    await expect(message).toHaveText('Возраст должен быть больше 18 лет');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await expect(message).toHaveAttribute('role', 'alert');
  });

  test('Раскладка "column".', async ({ page }) => {
    const component = await openStory(page, 'column-label-style');

    await expect(component).toHaveClass(/vsc-input-base_column/);
    await expect(component).toHaveCSS('flex-direction', 'column');
  });

  test('Интерактивная валидация.', async ({ page }) => {
    const component = await openStory(page, 'interactive-validation');
    const input = component.locator(INPUT_SELECTOR);
    const message = component.locator(MESSAGE_SELECTOR);

    await expect(message).not.toBeVisible();

    await input.fill('ab');
    await expect(message).toBeVisible();
    await expect(message).toHaveText('Минимум 3 символа');
    await expect(input).toHaveAttribute('aria-invalid', 'true');

    await input.fill('abc');
    await expect(message).not.toBeVisible();
  });
});
