import { Given, When, Then } from '@cucumber/cucumber';
import { fixture } from "../../hooks/pageFixture.js";

Given('The user is on the Herokuapp Drag and Drop page', async function () {
    fixture.logger.info('Navegando a la página de Drag and Drop');
    await fixture.dragDrop.gotoDragAndDropPage();
});

When('The user drags element A and drops it on element B', async function () {
    fixture.logger.info('Arrastrando elemento A hacia elemento B');
    await fixture.dragDrop.dragAtoB();
});

Then('The element A should be located at the position of element B and Element B should be located at the position of element A', async function () {
    fixture.logger.info('Verificando posiciones después de A→B');
    await fixture.dragDrop.verifyAtoBSwap();
});

When('The user drags element B and drops it on element A', async function () {
    fixture.logger.info('Arrastrando elemento B hacia elemento A');
    await fixture.dragDrop.dragBtoA();
});

Then('The Element B should be located at the position of element A and Element A should be located at the position of element B', async function () {
    fixture.logger.info('Verificando posiciones después de B→A');
    await fixture.dragDrop.verifyBtoASwap();
});

When('The user drags element B and drops it back to its original position', async function () {
    fixture.logger.info('Arrastrando elementos de vuelta a posición original');
    await fixture.dragDrop.dragAndReturnToOriginalPosition();
});

Then('Element B should be located at its original position', async function () {
    fixture.logger.info('Verificando posición original de B');
    await fixture.dragDrop.verifyOriginalPosition();
});

Then('Element A should be located at its original position', async function () {
    fixture.logger.info('Verificando posición original de A');
    // ya validado en verifyOriginalPosition, paso informativo
});
