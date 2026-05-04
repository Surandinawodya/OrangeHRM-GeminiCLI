const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Login Module', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    test('Positive: Valid login', async ({ page }) => {
        await loginPage.login('Admin', 'admin123');
        await expect(page).toHaveURL(/.*dashboard/);
    });

    test('Negative: Invalid credentials', async ({ page }) => {
        await loginPage.login('WrongUser', 'WrongPass');
        await expect(loginPage.errorMessage).toHaveText('Invalid credentials');
    });

    test('Negative: Empty fields', async ({ page }) => {
        await loginPage.login('', '');
        await expect(loginPage.fieldValidationError.first()).toHaveText('Required');
    });
});
