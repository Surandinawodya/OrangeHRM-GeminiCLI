class RecruitmentPage {
    constructor(page) {
        this.page = page;
        this.addBtn = page.getByRole('button', { name: 'Add' });
        this.firstName = page.getByPlaceholder('First Name');
        this.lastName = page.getByPlaceholder('Last Name');
        this.email = page.getByPlaceholder('Type here').first();
        this.resumeInput = page.locator('input[type="file"]');
        this.saveBtn = page.getByRole('button', { name: 'Save' });
        this.successToast = page.locator('.oxd-toast--success');
    }

    async addCandidate(fName, lName, emailAddr, resumePath = null) {
        await this.addBtn.click();
        await this.firstName.fill(fName);
        await this.lastName.fill(lName);
        await this.email.fill(emailAddr);
        if (resumePath) await this.resumeInput.setInputFiles(resumePath);
        await this.saveBtn.click();
    }
}
module.exports = { RecruitmentPage };
