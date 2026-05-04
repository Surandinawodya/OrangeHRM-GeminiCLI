const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { RecruitmentPage } = require('../pages/RecruitmentPage');
const path = require('path');

test.describe('Recruitment Module', () => {
    let recruitPage;
    const resumePath = path.join('C:', 'Users', 'Anne Fernando', 'Downloads', 'Gemini CLI Cheat Sheet 1.pdf');

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        recruitPage = new RecruitmentPage(page);
        await loginPage.navigate();
        await loginPage.login('Admin', 'admin123');
        await dashboardPage.waitForStability();
        await dashboardPage.clickRecruitment();
    });

    test('Positive: Add Candidate with Resume', async ({ page }) => {
        const uniqueEmail = `test_${Date.now()}@example.com`;
        await recruitPage.addCandidate('John', 'Doe', uniqueEmail, resumePath);
        await expect(recruitPage.successToast).toBeVisible({ timeout: 20000 });
    });

    test('Negative: Add candidate with invalid email', async ({ page }) => {
        await recruitPage.addBtn.click();
        await recruitPage.email.fill('invalid-email');
        await recruitPage.saveBtn.click();
        await expect(page.locator('text=Expected format: admin@example.com')).toBeVisible();
    });
});
