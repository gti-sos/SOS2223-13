// @ts-check
import { test, expect } from '@playwright/test';
  
  test('Navegar a la página de Empleo', async ({ page }) => {
      await page.goto('localhost:8080');
      // Click the get started link.
      await page.getByRole('link', { name: 'Empleos' }).click();
  
      // Expects the URL to contain intro.
      await expect(page).toHaveTitle("SOS2223-13-Empleos");
  
      await page.waitForTimeout(1000);
      // Comprobación de que hay datos
      await expect((await page.locator(".datosEmpleo").all()).length).toBeGreaterThan(0);
  });