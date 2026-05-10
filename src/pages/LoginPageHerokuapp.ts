import { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class LoginPageHerokuapp {

    private readonly page: Page;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly flashMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login button[type="submit"]');
        this.flashMessage = page.locator('#flash');
    }

    async gotoLoginPage() {
        await this.page.goto(`${process.env.BASEURL}login`);
    }

    async login(user: string, pass: string) {
        await this.usernameInput.fill(user);
        await this.passwordInput.fill(pass);
        await this.loginButton.click();
    }

    async verifyLoginSuccessMessage() {
        await expect(this.flashMessage).toContainText('You logged into a secure area!');
    }

    async verifySuccessRedirect() {
        await this.page.waitForURL(`${process.env.BASEURL}secure`);
    }

    async verifyLoginErrorMessage(errorType: string) {
        const errorMessages: Record<string, string> = {
            invalidCredentials: 'Your username is invalid!',
            invalidPassword: 'Your password is invalid!',
            invalidUsername: 'Your username is invalid!',
            emptyUsernameAndPass: 'Your username is invalid!',
            emptyUsername: 'Your username is invalid!',
            emptyPassword: 'Your password is invalid!',
            emptyPasswordInvalidUser: 'Your username is invalid!'
        };

        const expectedMessage = errorMessages[errorType];
        if (!expectedMessage) throw new Error(`Unknown errorType: ${errorType}`);
        await expect(this.flashMessage).toContainText(expectedMessage);
    }
}
