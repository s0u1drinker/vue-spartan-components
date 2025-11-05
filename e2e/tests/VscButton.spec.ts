import { test, expect } from '@playwright/test';

test('VscButton > Color Primary.', async ({ page }) => {
  await page.goto('/?path=/story/vscbutton--primary');

  const buttonText = 'Primary';
  const frame = page.frameLocator('#storybook-preview-iframe');

  const buttoDefault = frame.getByRole('button', { name: buttonText }).first();
  const buttonOutline = frame.locator('.vsc-button_outline');
  const buttonPlain = frame.locator('.vsc-button_plain');
  const buttons = [buttoDefault, buttonOutline, buttonPlain];

  for (const button of buttons) {
    await expect(button).toBeVisible();

    let bgColor = '';
    let color = '';
    let borderColor = '';

    bgColor = await button.evaluate(
      (el) => getComputedStyle(el).backgroundColor
    );
    color = await button.evaluate((el) => getComputedStyle(el).color);
    borderColor = await button.evaluate(
      (el) => getComputedStyle(el).borderColor
    );

    if (button === buttonOutline) {
      expect(bgColor).toBe('rgba(0, 0, 0, 0)');
      expect(color).toBe('rgb(0, 123, 255)');
      expect(borderColor).toBe('rgb(0, 123, 255)');
    } else if (button === buttonPlain) {
      expect(bgColor).toBe('rgba(0, 0, 0, 0)');
      expect(color).toBe('rgb(0, 123, 255)');
      expect(borderColor).toBe('rgba(0, 0, 0, 0)');
    } else {
      expect(bgColor).toBe('rgb(0, 123, 255)');
      expect(color).toBe('rgb(255, 255, 255)');
      expect(borderColor).toBe('rgba(0, 0, 0, 0)');
    }
  }
});

test('VscButton > Проверка цвета иконки.', async ({ page }) => {
  await page.goto('/?path=/story/vscbutton--button-with-icon');

  const frame = page.frameLocator('#storybook-preview-iframe');
  const buttonOutline = frame.locator('.vsc-button_outline');
  const svg = buttonOutline.locator('svg').first();

  await expect(svg).toBeVisible();

  const inlineStyle = await svg.getAttribute('style');

  expect(inlineStyle).toContain('color: red');
});

test('VscButton > Проверка click.', async ({ page }) => {
  await page.goto('/?path=/story/vscbutton--button-with-options');

  const frame = page.frameLocator('#storybook-preview-iframe');
  const button = frame.locator('.vsc-button_color_primary').last();

  const consoleMsgPromise = page.waitForEvent('console', {
    predicate: (msg) => msg.text() === 'click',
  });

  await button.click();

  const consoleMsg = await consoleMsgPromise;

  expect(consoleMsg.text()).toBe('click');
});

test('VscButton > Проверка disabled.', async ({ page }) => {
  await page.goto(
    '/?path=/story/vscbutton--button-with-options&args=disabled:!true'
  );

  const frame = page.frameLocator('#storybook-preview-iframe');
  const button = frame.locator('.vsc-button_color_primary').first();

  await button.hover();

  expect(button).toHaveCSS('cursor', 'not-allowed');
  expect(button).toHaveCSS('opacity', '0.35');
});
