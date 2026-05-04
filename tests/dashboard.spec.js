const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');

test.describe('Dashboard and Logout', () => {
    let dashboardPage;

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        await loginPage.navigate();
        await loginPage.login('Admin', 'admin123');
        await dashboardPage.waitForStability();
    });

    test('Positive: Validate dashboard and logout', async ({ page }) => {
        await expect(dashboardPage.dashboardHeader).toContainText('Dashboard');
        await dashboardPage.logout();
        await expect(page).toHaveURL(/.*login/);
    });
});
