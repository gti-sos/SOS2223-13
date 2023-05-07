// @ts-check
import { test, expect } from '@playwright/test';

test('home has title correct', async ({ page }) => {
  await page.goto('localhost:8080');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("SOS2223-13");
});

/*test('navigate to evolution page', async ({ page }) => {
    await page.goto('localhost:8080');
    // Click the get started link.
    await page.getByRole('link', { name: 'Evolucion' }).click();
    // Expects the URL to contain intro.
    await expect(page).toHaveTitle("SOS2223-13-Evolucion");
});*/

test('navigate to graph-evolution page', async ({ page }) => {
    await page.goto('localhost:8080');

    // Click the get started link.
    await page.getByRole('link', { name: 'Gráficas-Evolution' }).click();

    // Expects the URL to contain intro.
    await expect(page).toHaveTitle("SOS2223-13-Gráficas Evoluciones");
});

test('navigate to integrations/uses evolution page', async ({ page }) => {
    await page.goto('localhost:8080');

    // Click the get started link.
    await page.getByRole('link', { name: 'Usos/Integraciones-Evoluciones' }).click();

    // Expects the URL to contain intro.
    await expect(page).toHaveTitle("SOS2223-13-Integraciones/Usos Evoluciones");
});