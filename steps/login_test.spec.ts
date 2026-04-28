import { LoginPageHerokuapp } from "../pages/LoginPageHerokuapp.js";
import { Given, When, Then } from '@cucumber/cucumber';
import {  CustomWorld } from "../support/world.js";
import { logger } from "../utils/logger.js";


Given('The user is on the Herokuapp LoginPage', async function (this: CustomWorld) {
    logger.info('Navegación a la página de login de Herokuapp');
    await this.loginpage.gotoLoginPage();
    
});

When('The user enters {string} and {string} and clicks on the login button', async function (
    this: CustomWorld, user: string, pass: string) {
    
    logger.info(`Autentificación con el usuario: ${user}`);
    await this.loginpage.login(user,pass);
});

Then('The user should see a success message', async function () {
    logger.info('Verificando mensaje de éxito en pantalla');
    await this.loginpage.verifyLoginSuccessMessage();

});

Then('The user should be redirected to the home page', async function () {
    logger.info('Validando redirección exitosa a la Home Page');
    await this.loginpage.verifySuccessRedirect();
});

Then('The user should see {string} error message', async function (this:
    CustomWorld, errorType: string) {

    logger.info(`Validando mensaje de error esperado: ${errorType}`);
        await this.loginpage.verifyLoginErrorMessage(errorType);

});
