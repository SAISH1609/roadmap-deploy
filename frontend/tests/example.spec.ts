import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Vite \+ React \+ TS/);
});

test('welcome message', async ({ page }) => {
  await page.goto('/');

  // Expect the welcome message to be visible.
  await expect(page.getByText('Welcome to the future of team-based learning')).toBeVisible();
});
