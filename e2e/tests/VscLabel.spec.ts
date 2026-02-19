import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

test.describe('VscLabel Component', () => {
  const MARK_CLASS = '.vsc-label__mark';
  /** Хелпер для открытия чистого компонента VscLabel. */
  const openLabelStory = async (page: Page, storyName: string, args: string = '') => {
    await page.goto(`/iframe.html?id=vsclabel--${storyName}&viewMode=story&args=${args}`);

    const label = page.locator('.vsc-label');

    await label.waitFor();

    return label;
  };

  test('Отображает текст label.', async ({ page }) => {
    const LABEL_TEXT = 'Имя пользователя';
    const INPUT_ID = 'my-input-id';
    const label = await openLabelStory(page, 'default', `labelText:${LABEL_TEXT};id:${INPUT_ID}`);

    await expect(label).toBeVisible();
    await expect(label).toHaveText(LABEL_TEXT);
    await expect(label).toHaveAttribute('for', INPUT_ID);

    const requiredMark = label.locator(MARK_CLASS);

    await expect(requiredMark).not.toBeVisible();
    await expect(requiredMark).not.toHaveCount(1);
  });

  test('Отображает маркер при required.', async ({ page }) => {
    const label = await openLabelStory(page, 'required');
    const requiredMark = label.locator(MARK_CLASS);

    await expect(requiredMark).toBeVisible();
    await expect(requiredMark).toHaveText('*');
    await expect(requiredMark).toHaveAttribute('aria-hidden', 'true');
  });

  test('Использует кастомный маркер обязательности.', async ({ page }) => {
    const CUSTOM_MARK = ' (обязательно)';
    const label = await openLabelStory(page, 'custom-mark');
    const requiredMark = label.locator(MARK_CLASS);

    await expect(requiredMark).toBeVisible();
    await expect(requiredMark).toHaveText(CUSTOM_MARK);
  });
});
