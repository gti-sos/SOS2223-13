// @ts-check
import { test, expect } from '@playwright/test';


test('Navegar a la página de Local Entities', async ({ page }) => {
    await page.goto('localhost:8080');
    // Click the get started link.
    await page.getByRole('link', { name: 'Datos-Localentities' }).click();

    // Expects the URL to contain intro.
    await expect(page).toHaveTitle("SOS2223-13-Datos-LocalEntities");

    await page.waitForTimeout(1000);
    
    // Comprobación de que hay datos
    await expect((await page.locator(".datosLocal").all()).length).toBeGreaterThan(0);
});

test('Navegar a la página de gráfica Local Entities', async ({ page }) => {
    await page.goto('localhost:8080');

    // Click the get started link.
    await page.getByRole('link', { name: 'GraficaIFR' }).click();

    // Expects the URL to contain intro.
    await expect(page).toHaveTitle("SOS2223-13-Gráfica Local Entities");
});
