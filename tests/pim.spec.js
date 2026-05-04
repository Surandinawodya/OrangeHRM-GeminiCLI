const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { PIMPage } = require('../pages/PIMPage');
const path = require('path');

test.describe('PIM Module', () => {
    let pimPage;
    const attachmentPath = path.join('C:', 'Users', 'Surandi Nawodya', 'Downloads', '1000354593.jpg');

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        pimPage = new PIMPage(page);
        await loginPage.navigate();
        await loginPage.login('Admin', 'admin123');
        await dashboardPage.waitForStability();
        await dashboardPage.clickPIM();
    });

    test('Positive: Add and Delete Employee with Attachment', async ({ page }) => {
        const uniqueId = Date.now();
        const fName = 'Auto' + uniqueId;
        await pimPage.addEmployee(fName, 'Test', attachmentPath);
        await pimPage.searchAndDelete(fName);
        await expect(pimPage.successToast).toBeVisible();
    });

    test('Negative: Required fields', async ({ page }) => {
        await pimPage.addEmployeeBtn.click();
        await pimPage.saveBtn.click();
        await expect(page.locator('.oxd-input-field-error-message').first()).toBeVisible();
    });
});
