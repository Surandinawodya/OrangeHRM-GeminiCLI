class PIMPage {
    constructor(page) {
        this.page = page;
        this.addEmployeeBtn = page.getByRole('link', { name: 'Add Employee' });
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.photoInput = page.locator('input[type="file"]');
        this.saveBtn = page.getByRole('button', { name: 'Save' });
        this.successToast = page.locator('.oxd-toast--success');
        
        this.employeeListTab = page.getByRole('link', { name: 'Employee List' });
        this.searchEmployeeNameInput = page.locator('input[placeholder="Type for hints..."]').first();
        this.searchBtn = page.getByRole('button', { name: 'Search' });
        this.deleteBtn = page.locator('.bi-trash');
        this.confirmDeleteBtn = page.getByRole('button', { name: 'Yes, Delete' });
    }

    async addEmployee(firstName, lastName, filePath = null) {
        await this.addEmployeeBtn.click();
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        if (filePath) await this.photoInput.setInputFiles(filePath);
        await this.saveBtn.click();
        await this.successToast.waitFor({ state: 'visible', timeout: 30000 });
    }

    async searchAndDelete(employeeName) {
        await this.employeeListTab.click();
        await this.searchEmployeeNameInput.fill(employeeName);
        await this.searchBtn.click();
        const row = this.page.locator('.oxd-table-card').filter({ hasText: employeeName });
        await row.waitFor({ state: 'visible' });
        await row.locator('.bi-trash').click();
        await this.confirmDeleteBtn.click();
        await this.successToast.waitFor({ state: 'visible' });
    }
}
module.exports = { PIMPage };
