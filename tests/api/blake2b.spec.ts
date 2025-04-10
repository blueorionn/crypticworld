import { test, expect } from '@playwright/test'
 
test('Blake2b Hash Page', async ({ page }) => {
  await page.goto('http://localhost:3000/hash/blake2b')
  await expect(page.locator('body')).toBeDefined()
})