import { test, expect } from '@playwright/test';

test('VscIcon > Проверка размера.', async ({ page }) => {
  await page.goto('/?path=/story/vscicon--sizes');

  const size = '4rem';
  const frame = page.frameLocator('#storybook-preview-iframe');
  const svg = frame.locator('svg').first();

  await expect(svg).toBeVisible();
  expect(svg).toHaveAttribute('width', size);
  expect(svg).toHaveAttribute('height', size);
});
