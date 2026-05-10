import { Given, When, Then } from '@cucumber/cucumber';
import { fixture } from "../../hooks/pageFixture.js";

Given('The user is on the Herokuapp LoginPage', async function () {
    fixture.logger.info('Navegación a la página de login de Herokuapp');
    await fixture.loginPage.gotoLoginPage();
});

When('The user enters {string} and {string} and clicks on the login button', async function (
    user: string, pass: string) {
    fixture.logger.info(`Autentificación con el usuario: ${user}`);
    await fixture.loginPage.login(user, pass);
});

Then('The user should see a success message', async function () {
    fixture.logger.info('Verificando mensaje de éxito en pantalla');
    await fixture.loginPage.verifyLoginSuccessMessage();
});

Then('The user should be redirected to the home page', async function () {
    fixture.logger.info('Validando redirección exitosa a la Home Page');
    await fixture.loginPage.verifySuccessRedirect();
});

Then('The user should see {string} error message', async function (errorType: string) {
    fixture.logger.info(`Validando mensaje de error esperado: ${errorType}`);
    await fixture.loginPage.verifyLoginErrorMessage(errorType);
});
