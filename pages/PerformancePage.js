class PerformancePage {
    constructor(page) {
        this.page = page;
        this.employeeNameInput = page.getByPlaceholder('Type for hints...');
        this.searchBtn = page.getByRole('button', { name: 'Search' });
    }

    async searchKpis(employeeName) {
        await this.employeeNameInput.fill(employeeName);
        await this.page.locator('.oxd-autocomplete-option').first().waitFor();
        await this.page.locator('.oxd-autocomplete-option').first().click();
        await this.searchBtn.click();
    }
}
module.exports = { PerformancePage };
