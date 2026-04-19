import { Page, Locator, chromium, Browser  } from '@playwright/test';
import { expect } from '@playwright/test';



export class LoginPageHerokuapp {

    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly flashMessage : Locator;

    //Locators for the login page

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login button[type="submit"]');
        this.flashMessage = page.locator('#flash');
        
    }

    //Actions to perform login action
    async gotoLoginPage() {
        
        await this.page.goto('https://the-internet.herokuapp.com/login')
        
        }
        
    async login(user: string, pass:string){
        await this.usernameInput.fill(user);
        await this.passwordInput.fill(pass);
        await this.loginButton.click();
        }

    async verifyLoginSuccessMessage() {

        await expect(this.flashMessage).toContainText('You logged into a secure area!')
    }

    async verifySuccessRedirect (){
        await this.page.waitForURL('https://the-internet.herokuapp.com/secure');
        
        }

    async verifyLoginErrorMessage(errorType: string){


        const errorMesages: Record < string, string> = {
            
            invalidCredentials: 'Your username is invalid!',
            invalidPassword: 'Your password is invalid!',
            invalidUsername: 'Your username is invalid!',
            emptyUsernameAndPass: 'Your username is invalid!',
            emptyUsername: 'Your username is invalid!',
            emptyPassword: 'Your password is invalid!',
            emptyPasswordInvalidUser: 'Your username is invalid!'
        };
        
        const expectedMessage = errorMesages[errorType];
        if (!expectedMessage) throw new Error('Unknown errorType: ${errorType}');
        await expect (this.flashMessage).toContainText(expectedMessage);
        

        }
    

}

