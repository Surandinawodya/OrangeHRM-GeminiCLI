class DashboardPage {
    constructor(page) {
        this.page = page;
        this.dashboardHeader = page.locator('.oxd-topbar-header-breadcrumb-module');
        this.userDropdown = page.locator('.oxd-userdropdown-name');
        this.logoutLink = page.getByRole('menuitem', { name: 'Logout' });
        
        this.adminMenuItem = page.getByRole('link', { name: 'Admin' });
        this.pimMenuItem = page.getByRole('link', { name: 'PIM' });
        this.leaveMenuItem = page.getByRole('link', { name: 'Leave' });
        this.timeMenuItem = page.getByRole('link', { name: 'Time' });
        this.recruitmentMenuItem = page.getByRole('link', { name: 'Recruitment' });
        this.performanceMenuItem = page.getByRole('link', { name: 'Performance' });
        this.directoryMenuItem = page.getByRole('link', { name: 'Directory' });
    }

    async waitForStability() {
        await this.dashboardHeader.waitFor({ state: 'visible' });
        await this.page.waitForLoadState('networkidle');
    }

    async clickAdmin() { await this.adminMenuItem.click(); }
    async clickPIM() { await this.pimMenuItem.click(); }
    async clickLeave() { await this.leaveMenuItem.click(); }
    async clickTime() { await this.timeMenuItem.click(); }
    async clickRecruitment() { await this.recruitmentMenuItem.click(); }
    async clickPerformance() { await this.performanceMenuItem.click(); }
    async clickDirectory() { await this.directoryMenuItem.click(); }

    async logout() {
        await this.userDropdown.click();
        await this.logoutLink.click();
    }
}
module.exports = { DashboardPage };
