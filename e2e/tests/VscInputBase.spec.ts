import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

test.describe('VscInputBase', () => {
  const BASE_SELECTOR = '.vsc-input-base';
  const LABEL_SELECTOR = '.vsc-label';
  const MESSAGE_SELECTOR = '.vsc-message';
  const INPUT_SELECTOR = '.vsc-input';
  const MARK_SELECTOR = '.vsc-label__mark';

  /** Хелпер для открытия истории компонента. */
  const openStory = async (page: Page, inputType: string = 'default', args: string = '') => {
    await page.goto(`/iframe.html?id=vscinputbase--${inputType}&viewMode=story&args=${args}`);

    const component = page.locator(BASE_SELECTOR);

    await component.waitFor();

    return component;
  };

  test('Правильная структура.', async ({ page }) => {
    const component = await openStory(page, 'default');
    const label = component.locator(LABEL_SELECTOR);
    const input = component.locator(INPUT_SELECTOR);

    await expect(component).toBeVisible();
    await expect(label).toBeVisible();
    await expect(input).toBeVisible();
  });

  test('Label имеет атрибут for, соответствующий prop id.', async ({ page }) => {
    const component = await openStory(page, 'default');
    const label = component.locator(LABEL_SELECTOR);

    await expect(label).toHaveAttribute('for', 'input-id');
  });

  test('Клик по label ставит фокус на input.', async ({ page }) => {
    const component = await openStory(page, 'default');
    const label = component.locator(LABEL_SELECTOR);
    const input = component.locator(INPUT_SELECTOR);

    await label.click();

    await expect(input).toBeFocused();
  });

  test('Отображает маркер обязательного поля (required).', async ({ page }) => {
    const component = await openStory(page, 'required');
    const mark = component.locator(MARK_SELECTOR);

    await expect(mark).toBeVisible();
    await expect(mark).toHaveText('*');
  });

  test('Применяет класс _column при labelStyle = "column".', async ({ page }) => {
    const component = await openStory(page, 'column-layout');

    await expect(component).toHaveClass(/vsc-input-base_column/);
    await expect(component).toHaveCSS('flex-direction', 'column');
  });

  test('Не отображает ошибку, если showError = false.', async ({ page }) => {
    const component = await openStory(page, 'with-error', 'showError:false');
    const message = component.locator(MESSAGE_SELECTOR);

    await expect(message).not.toBeVisible();
  });

  test('Отображает сообщение об ошибке при showError = true.', async ({ page }) => {
    const component = await openStory(page, 'with-error');
    const message = component.locator(MESSAGE_SELECTOR);

    await expect(message).toBeVisible();
    await expect(message).toHaveText('Возраст должен быть больше 18 лет');
    await expect(message).toHaveAttribute('role', 'alert');
  });

  test('Интерактивная валидация: появляется ошибка при вводе < 3 символов.', async ({ page }) => {
    const component = await openStory(page, 'interactive-error');
    const input = component.locator(INPUT_SELECTOR);
    const message = component.locator(MESSAGE_SELECTOR);

    await expect(message).not.toBeVisible();

    await input.fill('ab');

    await expect(message).toBeVisible();
    await expect(message).toHaveText('Минимум 3 символа!');

    await input.fill('abc');

    await expect(message).not.toBeVisible();
  });
});
