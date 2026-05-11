import { Given, When, Then } from '@cucumber/cucumber';
import { fixture } from "../../hooks/pageFixture.js";

Given('The user is on the Herokuapp Checkboxes page', async function () {
    fixture.logger.info('Navegando a la página de checkboxes');
    await fixture.checkboxes.gotoCheckboxesPage();
});

When('The user selects checkbox1', async function () {
    fixture.logger.info('Selección del checkbox1');
    await fixture.checkboxes.selectFirstCheckbox();
});

Then('The checkbox1 should be selected', async function () {
    fixture.logger.info('Validando selección del checkbox1');
    await fixture.checkboxes.firstCheckboxSelected();
});

When('The user deselects checkbox1', async function () {
    fixture.logger.info('Deselección del checkbox1');
    await fixture.checkboxes.deselectFirstCheckbox();
});

Then('The checkbox1 should be deselected', async function () {
    fixture.logger.info('Validando deselección del checkbox1');
    await fixture.checkboxes.firstCheckboxDeselected();
});

When('The user deselects checkbox2', async function () {
    fixture.logger.info('Deselección del checkbox2');
    await fixture.checkboxes.deselectSecondCheckbox();
});

Then('The checkbox2 should be deselected', async function () {
    fixture.logger.info('Validando deselección del checkbox2');
    await fixture.checkboxes.secondCheckboxDeselected();
});

When('The user selects checkbox2', async function () {
    fixture.logger.info('Selección del checkbox2');
    await fixture.checkboxes.selectSeconfCheckbox();
});

Then('The checkbox2 should be selected', async function () {
    fixture.logger.info('Validando selección del checkbox2');
    await fixture.checkboxes.secondCheckboxSelected();
});

Then('The checkbox1 should be unchecked and checkbox2 should be checked', async function () {
    fixture.logger.info('Validando estado inicial de los checkboxes');
    await fixture.checkboxes.validateCheckboxes();
});
