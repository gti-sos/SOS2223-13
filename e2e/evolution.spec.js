// @ts-check
import { test, expect } from '@playwright/test';

test('Home tiene el título correcto', async ({ page }) => {
  await page.goto('localhost:8080');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("SOS2223-13");
});

test('Navegar a la página de Evolución', async ({ page }) => {
    await page.goto('localhost:8080');
    // Click the get started link.
    await page.getByRole('link', { name: 'Datos-Evolución' }).click();

    // Expects the URL to contain intro.
    await expect(page).toHaveTitle("SOS2223-13-Datos-Evolución");

    // Comprobación de que hay datos
    await expect((await page.locator(".datosEvol").all()).length).toBeGreaterThan(0);
});

test('Navegar a la página de grafo Evolution', async ({ page }) => {
    await page.goto('localhost:8080');

    // Click the get started link.
    await page.getByRole('link', { name: 'GrafoLMMG' }).click();

    // Expects the URL to contain intro.
    await expect(page).toHaveTitle("SOS2223-13-Gráfica Evolución");
});

test('Navegar a la página de integraciones', async ({ page }) => {
    await page.goto('localhost:8080');

    // Click the get started link.
    await page.getByRole('link', { name: 'Integraciones' }).click();

    // Expects the URL to contain intro.
    await expect(page).toHaveTitle("SOS2223-13-Integraciones");
});