class TimePage {
    constructor(page) {
        this.page = page;

        this.employeeNameInput = page.getByPlaceholder('Type for hints...');
        this.viewBtn = page.getByRole('button', { name: 'View' });

        this.fieldValidationError = page.locator(
            '.oxd-input-group span.oxd-input-field-error-message'
        );

        this.timesheetHeader = page.getByRole('heading', { level: 6 });
    }

    async viewTimesheet(employeeName) {
        await this.employeeNameInput.fill(employeeName);
        const option = this.page.locator('.oxd-autocomplete-option').first();
        await option.waitFor({ state: 'visible', timeout: 10000 });
        await option.click();
        await this.viewBtn.click();
        await this.page.waitForLoadState('networkidle');
        await this.timesheetHeader.first().waitFor({ state: 'visible', timeout: 15000 });
    }
}

module.exports = { TimePage };