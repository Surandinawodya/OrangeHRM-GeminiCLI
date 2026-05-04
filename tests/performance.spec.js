const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { PerformancePage } = require('../pages/PerformancePage');

test.describe('Performance Module', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        await loginPage.navigate();
        await loginPage.login('Admin', 'admin123');
        await dashboardPage.waitForStability();
        await dashboardPage.clickPerformance();
    });

    test('Positive: Search Employee KPIs', async ({ page }) => {
        const perfPage = new PerformancePage(page);
        await perfPage.searchKpis('a');
        await expect(page.locator('.oxd-table-card').first()).toBeVisible({ timeout: 15000 });
    });
});
