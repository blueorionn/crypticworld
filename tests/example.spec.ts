import { test, expect } from '@playwright/test'

test('Home Page', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('body')).toBeDefined()
})
