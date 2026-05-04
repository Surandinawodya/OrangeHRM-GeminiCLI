const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { DirectoryPage } = require('../pages/DirectoryPage');

test.describe('Directory Module', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        await loginPage.navigate();
        await loginPage.login('Admin', 'admin123');
        await dashboardPage.waitForStability();
        await dashboardPage.clickDirectory();
    });

    test('Positive: Search Employee in Directory', async ({ page }) => {
        const dirPage = new DirectoryPage(page);
        await dirPage.searchDirectory('a');
        await expect(page.locator('.orangehrm-directory-card').first()).toBeVisible({ timeout: 15000 });
    });
});
