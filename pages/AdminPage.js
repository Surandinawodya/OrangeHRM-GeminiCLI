class AdminPage {
    constructor(page) {
        this.page = page;
        this.addUserBtn = page.getByRole('button', { name: 'Add' });
        this.userRoleDropdown = page.locator('.oxd-select-text').first();
        this.statusDropdown = page.locator('.oxd-select-text').last();
        this.employeeNameInput = page.getByPlaceholder('Type for hints...');
        this.usernameInput = page.locator('div.oxd-input-group:has-text("Username") input');
        this.passwordInput = page.locator('input[type="password"]').first();
        this.confirmPasswordInput = page.locator('input[type="password"]').last();
        this.saveBtn = page.getByRole('button', { name: 'Save' });
        
        this.searchUsernameInput = page.locator('div.oxd-input-group:has-text("Username") input').first();
        this.searchBtn = page.getByRole('button', { name: 'Search' });
        this.deleteBtn = page.locator('.bi-trash');
        this.confirmDeleteBtn = page.getByRole('button', { name: 'Yes, Delete' });
        this.successToast = page.locator('.oxd-toast--success');
    }

    async addUser(role, employeeName, status, username, password) {
        await this.addUserBtn.click();
        await this.userRoleDropdown.click();
        await this.page.getByRole('option', { name: role }).click();
        await this.statusDropdown.click();
        await this.page.getByRole('option', { name: status }).click();
        
        await this.employeeNameInput.fill(employeeName);
        await this.page.waitForResponse(res => res.url().includes('/pim/employees') && res.status() === 200);
        await this.page.locator('.oxd-autocomplete-option').first().click();
        
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(password);
        
        await this.page.waitForTimeout(1000);
        await this.saveBtn.click();
        // Wait for either success toast OR check if we are redirected (meaning success)
        await this.page.waitForURL(/.*viewSystemUsers/, { timeout: 30000 }).catch(() => {});
    }

    async deleteUser(username) {
        await this.searchUsernameInput.fill('');
        await this.searchUsernameInput.fill(username);
        await this.searchBtn.click();
        
        const row = this.page.locator('.oxd-table-card').filter({ hasText: username });
        await row.waitFor({ state: 'visible', timeout: 15000 });
        
        await row.locator('.bi-trash').click();
        await this.confirmDeleteBtn.click();
        await this.successToast.waitFor({ state: 'visible', timeout: 30000 });
    }
}
module.exports = { AdminPage };
