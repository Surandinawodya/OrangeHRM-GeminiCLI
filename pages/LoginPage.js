class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.locator('.oxd-alert-content-text');
        this.fieldValidationError = page.locator('.oxd-input-group span.oxd-input-field-error-message');
    }

    async navigate() {
        await this.page.goto('/', { waitUntil: 'networkidle' });
    }

    async login(username, password) {
        await this.usernameInput.fill(username || '');
        await this.passwordInput.fill(password || '');
        await this.loginButton.click();
    }
}
module.exports = { LoginPage };
