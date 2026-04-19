import { LoginPageHerokuapp } from "../pages/LoginPageHerokuapp.js";
import { Given, When, Then } from '@cucumber/cucumber';
import {  CustomWorld } from "../support/world.js";


Given('The user is on the Herokuapp LoginPage', async function () {

    await this.loginpage.gotoLoginPage();
    
});

When('The user enters {string} and {string} and clicks on the login button', async function (
    this: CustomWorld, user: string, pass: string) {
    
    await this.loginpage.login(user,pass);
});

Then('The user should see a success message', async function () {
    await this.loginpage.verifyLoginSuccessMessage();

});

Then('The user should be redirected to the home page', async function () {
    await this.loginpage.verifySuccessRedirect();
});

Then('The user should see {string} error message', async function (this:
    CustomWorld, errorType: string) {

        await this.loginpage.verifyLoginErrorMessage(errorType);

});
