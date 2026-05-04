const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { AdminPage } = require('../pages/AdminPage');

test.describe('Admin Module', () => {
    let adminPage;

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        adminPage = new AdminPage(page);
        await loginPage.navigate();
        await loginPage.login('Admin', 'admin123');
        await dashboardPage.waitForStability();
        await dashboardPage.clickAdmin();
    });

    test('Positive: User lifecycle', async ({ page }) => {
        const uniqueId = Date.now() + Math.floor(Math.random() * 1000);
        const user = 'User' + uniqueId;
        await adminPage.addUser('Admin', 'a', 'Enabled', user, 'Password@123');
        await adminPage.deleteUser(user);
        await expect(adminPage.successToast).toBeVisible();
    });

    test('Negative: Invalid employee name', async ({ page }) => {
        await adminPage.addUserBtn.click();
        await adminPage.employeeNameInput.pressSequentially('InvalidName', { delay: 100 });
        const dropdown = page.locator('.oxd-autocomplete-dropdown');
        await expect(dropdown).toHaveText(/No (Results|Records) Found/, { timeout: 15000 });
    });
});
