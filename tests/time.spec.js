const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { TimePage } = require('../pages/TimePage');

test.describe('Time Module', () => {
    let timePage;

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        timePage = new TimePage(page);

        await loginPage.navigate();
        await loginPage.login('Admin', 'admin123');

        await dashboardPage.waitForStability();
        await dashboardPage.clickTime();
    });

    test('Positive: View Employee Timesheet', async ({ page }) => {
        await timePage.viewTimesheet('a'); 
        await expect(timePage.timesheetHeader.first()).toBeVisible({
            timeout: 20000
        });
    });

    test('Negative: View without selecting employee', async ({ page }) => {
        await timePage.viewBtn.click();

        await expect(timePage.fieldValidationError).toHaveText('Required');
    });
});