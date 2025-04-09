import { test, expect } from '@playwright/test'
 
test('Home Page', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('http://localhost:3000/')
  await expect(page.locator('body')).toBeDefined()
})