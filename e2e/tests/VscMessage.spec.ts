import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

test.describe('VscMessage', () => {
  const CLASS = 'vsc-message';
  const CLASS_SELECTOR = `.${CLASS}`;
  const ICON_CLASS = `.${CLASS}__icon`;
  const BACKGROUND_CLASS = `${CLASS}_background`;
  /** Хелпер для открытия чистого компонента VscMessage. */
  const openMessageStory = async (page: Page, storyName: string, args: string = '') => {
    await page.goto(`/iframe.html?id=vscmessage--${storyName}&viewMode=story&args=${args}`);

    const message = page.locator(CLASS_SELECTOR);

    await message.waitFor();

    return message;
  };

  test('Отображает текст сообщения.', async ({ page }) => {
    const MESSAGE_TEXT = 'Просто текст.';
    const message = await openMessageStory(page, 'default', `message:${MESSAGE_TEXT}`);

    await expect(message).toBeVisible();
    await expect(message).toContainText(MESSAGE_TEXT);

    const icon = message.locator(ICON_CLASS);

    await expect(icon).not.toBeVisible();
  });

  test('Отображает иконку при передаче icon.', async ({ page }) => {
    const MESSAGE_TEXT = 'Сообщение с иконкой';
    const message = await openMessageStory(
      page,
      'with-icon',
      `message:${MESSAGE_TEXT};icon:mdi:information`,
    );
    const icon = message.locator(ICON_CLASS);

    await expect(message).toBeVisible();
    await expect(message).toContainText(MESSAGE_TEXT);
    await expect(icon).toBeVisible();
    await expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  test('Не отображает иконку без icon prop.', async ({ page }) => {
    const message = await openMessageStory(page, 'default');
    const icon = message.locator(ICON_CLASS);

    await expect(icon).not.toBeVisible();
  });

  test('Применяет класс фона при showBackground === true.', async ({ page }) => {
    const message = await openMessageStory(page, 'with-background');

    await expect(message).toBeVisible();
    await expect(message).toContainClass(BACKGROUND_CLASS);
  });

  test('Не применяет класс фона при showBackground === false.', async ({ page }) => {
    const message = await openMessageStory(page, 'default');

    await expect(message).toBeVisible();
    await expect(message).not.toContainClass(BACKGROUND_CLASS);
  });

  test('Компонент с иконкой и фоном.', async ({ page }) => {
    const MESSAGE_TEXT = 'Полное сообщение';
    const message = await openMessageStory(
      page,
      'with-icon-and-background',
      `message:${MESSAGE_TEXT}`,
    );
    const icon = message.locator(ICON_CLASS);

    await expect(message).toBeVisible();
    await expect(message).toContainText(MESSAGE_TEXT);
    await expect(icon).toBeVisible();
    await expect(message).toContainClass(BACKGROUND_CLASS);
  });

  test('Применяет CSS-переменные через style.', async ({ page }) => {
    await page.goto(`/iframe.html?id=vscmessage--multiple-messages&viewMode=story`);

    const messages = page.locator(CLASS_SELECTOR);

    await messages.first().waitFor();
    await expect(messages).toHaveCount(4);

    // 1. Красный текст на первом сообщении.
    const firstMessage = messages.nth(0);

    await expect(firstMessage).toContainText('Какая-то ошибка');
    await expect(firstMessage).toHaveCSS('color', 'rgb(255, 0, 0)');

    // 2. Зелёная иконка и светло-зелёный фон на втором сообщении.
    const secondMessage = messages.nth(1);

    await expect(secondMessage).toContainText('Успешная операция');
    await expect(secondMessage).toHaveCSS('background-color', 'rgb(144, 238, 144)');

    // Проверяем цвет иконки через CSS переменную.
    const iconColor = await secondMessage
      .locator('.vsc-message__icon')
      .evaluate((el) => getComputedStyle(el).color);

    expect(iconColor).toBe('rgb(0, 128, 0)');

    // 3. Фиолетовый фон на третьем сообщении.
    const thirdMessage = messages.nth(2);

    await expect(thirdMessage).toContainText('Просто акцентируем внимание');
    await expect(thirdMessage).toHaveCSS('background-color', 'rgb(238, 130, 238)');
  });
});
