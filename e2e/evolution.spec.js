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

    await page.waitForTimeout(1000);
    
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

test('Navegar a la página de integraciones y usos', async ({ page }) => {
    await page.goto('localhost:8080');

    // Click the get started link.
    await page.getByRole('link', { name: 'Integraciones/Usos' }).click();

    // Expects the URL to contain intro.
    await expect(page).toHaveTitle("SOS2223-13-Integraciones-Usos");
});

test('Navegar a la página de gráfica común', async ({ page }) => {
    await page.goto('localhost:8080');

    // Click the get started link.
    await page.getByRole('link', { name: 'Analíticas' }).click();

    // Expects the URL to contain intro.
    await expect(page).toHaveTitle("SOS2223-13-Análisis");
});

test('Navegar a la página de vídeos', async ({ page }) => {
    await page.goto('localhost:8080');

    // Click the get started link.
    await page.getByRole('link', { name: 'Sobre' }).click();

    // Expects the URL to contain intro.
    await expect(page).toHaveTitle("SOS2223-13-Videos");
});

test('Navegar a la página de gráfico de Jose', async ({ page }) => {
    await page.goto('localhost:8080');

    // Click the get started link.
    await page.getByRole('link', { name: 'GraficoJLB' }).click();

    // Expects the URL to contain intro.
    await expect(page).toHaveTitle("SOS2223-13-Gráfica Personas Empleadas");
});

test('Navegar a la página de gráfico de Irene', async ({ page }) => {
    await page.goto('localhost:8080');

    // Click the get started link.
    await page.getByRole('link', { name: 'GraficoIFR' }).click();

    // Expects the URL to contain intro.
    await expect(page).toHaveTitle("SOS2223-13-Gráfica Localidades");
});

test('Navegar a la página de Extras', async ({ page }) => {
    await page.goto('localhost:8080');

    // Click the get started link.
    await page.getByRole('link', { name: 'Extras' }).click();

    // Expects the URL to contain intro.
    await expect(page).toHaveTitle("SOS2223-13-Extras");
});
