import { test, expect } from '@playwright/test';

test('Color Primary', async ({ page }) => {
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

// const consoleLogPromise = page.waitForEvent(
//   'console',
//   (msg) => msg.text() === 'click'
// );
// await button.click();
// await consoleLogPromise;
