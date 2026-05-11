import { Given, When, Then } from '@cucumber/cucumber';
import { fixture } from "../../hooks/pageFixture.js";

Given('The user is on the Herokuapp Drag and Drop page', async function () {
    fixture.logger.info('Navegando a la pagina de checkboxes');
    await fixture.checkboxes.gotoCheckboxesPage();
});

When('The user select the checkbox1', async function () {
    fixture.logger.info('Seleccion del checkbox1');
    await fixture.checkboxes.selectFirstCheckbox();
});

Then('The checkbox1 should be selected', async function () {
    fixture.logger.info('Validación seleccion del checkbox1');
    await fixture.checkboxes.firstCheckboxSelected();
});

When('The user deselect the checkbox1', async function () {
    fixture.logger.info('Deseleccion del checkbox1');
    await fixture.checkboxes.deselectFirstCheckbox();
});

Then('The checkbox1 should be deselected', async function () {
    fixture.logger.info('Validación deseleccion del checkout1');
    await fixture.checkboxes.firstCheckboxDeselected();
});

When('The user deselect the checkbox2', async function () {
    fixture.logger.info('Deseleccion de checkbox2');
    await fixture.checkboxes.deselectSecondCheckbox();
});

Then('The checkbox2 should be deselected', async function () {
    fixture.logger.info('Validación deseleccion checkbox2');
    await fixture.checkboxes.secondCheckboxDeselected();
});

When('The user select the checkbox2', async function () {
    fixture.logger.info('Selección del checkbox2');
    await fixture.checkboxes.selectSeconfCheckbox();
});

Then('The checkbox2 should be selected', async function () {
    fixture.logger.info('Validación selección checkbox2');
    await fixture.checkboxes.secondCheckboxSelected();
});

When('The user verified that  when entering in the page checkbox1 is unchecked and checkbox2 is checked', async function () {
    fixture.logger.info('Checkboxes se despliegan al iniciar la pagina');
    await fixture.checkboxes.validateCheckboxes();
});
