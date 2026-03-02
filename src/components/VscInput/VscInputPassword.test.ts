import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

test.describe('VscInputPassword', () => {
  const BASE_SELECTOR = '.vsc-input-base';
  const INPUT_SELECTOR = 'input.vsc-input-password__input';
  const BUTTON_SELECTOR = '.vsc-input-password__button';
  const LABEL_SELECTOR = '.vsc-label';

  /** Хелпер для открытия истории компонента. */
  const openStory = async (page: Page, storyName: string, args: string = '') => {
    await page.goto(`/iframe.html?id=vscinputpassword--${storyName}&viewMode=story&args=${args}`);

    const component = page.locator(BASE_SELECTOR);
    await component.waitFor();
    return component;
  };

  test('Отображает поле ввода и лейбл.', async ({ page }) => {
    const component = await openStory(page, 'default');
    const input = component.locator(INPUT_SELECTOR);
    const label = component.locator(LABEL_SELECTOR);

    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('type', 'password');
    await expect(label).toHaveText('Пароль');
  });

  test('Клик по лейблу фокусирует input.', async ({ page }) => {
    const component = await openStory(page, 'default');
    const label = component.locator(LABEL_SELECTOR);
    const input = component.locator(INPUT_SELECTOR);

    await label.click();
    await expect(input).toBeFocused();
  });

  test('Переключение видимости пароля (атрибуты и accessibility).', async ({ page }) => {
    const component = await openStory(page, 'default');
    const input = component.locator(INPUT_SELECTOR);
    const button = component.locator(BUTTON_SELECTOR);

    // 1. Состояние по умолчанию: Пароль скрыт
    await expect(input).toHaveAttribute('type', 'password');
    await expect(button).toHaveAttribute('aria-pressed', 'false');
    // Проверяем полный текст лейбла (важно для скринридеров)
    await expect(button).toHaveAttribute('aria-label', 'Показать пароль');

    // 2. Клик: Пароль показан
    await button.click();
    await expect(input).toHaveAttribute('type', 'text');
    await expect(button).toHaveAttribute('aria-pressed', 'true');
    await expect(button).toHaveAttribute('aria-label', 'Скрыть пароль');

    // 3. Повторный клик: снова скрыт
    await button.click();
    await expect(input).toHaveAttribute('type', 'password');
    await expect(button).toHaveAttribute('aria-pressed', 'false');
    await expect(button).toHaveAttribute('aria-label', 'Показать пароль');
  });

  test('Disabled состояние.', async ({ page }) => {
    const component = await openStory(page, 'disabled');
    const input = component.locator(INPUT_SELECTOR);
    const button = component.locator(BUTTON_SELECTOR);
    const wrapper = component.locator('.vsc-input-password');

    await expect(input).toBeDisabled();
    await expect(button).toBeDisabled();

    // Лучший способ проверки disabled состояния для a11y
    await expect(wrapper).toHaveAttribute('aria-disabled', 'true');
  });

  test('Состояние ошибки.', async ({ page }) => {
    const component = await openStory(page, 'with-error');
    const input = component.locator(INPUT_SELECTOR);

    // Используем поиск по роли (Best Practice for A11y)
    // VscMessage с isError=true имеет role="alert"
    const message = page.getByRole('alert');

    await expect(message).toBeVisible();
    await expect(message).toHaveText('Пароль должен содержать минимум 8 символов');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  test('Раскладка Column.', async ({ page }) => {
    const component = await openStory(page, 'column-layout');

    await expect(component).toHaveCSS('flex-direction', 'column');
  });

  test('Интерактивная валидация.', async ({ page }) => {
    const component = await openStory(page, 'interactive-validation');
    const input = component.locator(INPUT_SELECTOR);
    const message = page.getByRole('alert');

    // 1. Вводим короткий пароль -> ошибка появляется
    await input.fill('1234567');
    await expect(message).toBeVisible();
    await expect(message).toHaveText('Минимум 8 символов');

    // 2. Дописываем символы -> ошибка исчезает
    await input.fill('12345678');
    await expect(message).not.toBeVisible();
  });
});
