class DirectoryPage {
    constructor(page) {
        this.page = page;
        this.nameInput = page.getByPlaceholder('Type for hints...');
        this.searchBtn = page.getByRole('button', { name: 'Search' });
    }

    async searchDirectory(name) {
        await this.nameInput.fill(name);
        await this.page.locator('.oxd-autocomplete-option').first().waitFor();
        await this.page.locator('.oxd-autocomplete-option').first().click();
        await this.searchBtn.click();
    }
}
module.exports = { DirectoryPage };
