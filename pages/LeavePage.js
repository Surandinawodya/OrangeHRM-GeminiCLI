class LeavePage {
    constructor(page) {
        this.page = page;
        this.applyLink = page.getByRole('link', { name: 'Apply' });
        this.leaveTypeDropdown = page.locator('.oxd-select-text');
        this.attachmentInput = page.locator('input[type="file"]');
        this.applyBtn = page.getByRole('button', { name: 'Apply' });
        this.successToast = page.locator('.oxd-toast--success');
    }

    async applyLeave(leaveType, filePath = null) {
        await this.applyLink.click();
        await this.leaveTypeDropdown.click();
        await this.page.getByRole('option', { name: leaveType }).click();
        if (filePath) await this.attachmentInput.setInputFiles(filePath);
        await this.applyBtn.click();
    }
}
module.exports = { LeavePage };
