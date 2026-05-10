import {Given, When, Then } from '@cucumber/cucumber';
import { fixture } from "../../hooks/pageFixture.js";
import { DragDrop } from "../../pages/DragAndDrop.js"


Given('The user is on the Herokuapp Drag and Drop page', async function ({page}) {
    await fixture.dragDrop.gotoDragAndDropPage();

});

When('The user drags element A and drops it on element B', async function ({page}){
   await fixture.dragDrop.dragAtoB();
});

Then('The element A should be located at the position of element B and Element B should be located at the position of element A', async function ({page}) {
   await fixture.dragDrop.dragAtoBValidation();
});

When('The user drags element B and drops it on element A', async function ({page}){
    await fixture.dragDrop.dragBtoA();
});

Then('The Element B should be located at the position of element A and Element A should be located at the position of element B', async function ({page}){
    await fixture.dragDrop.dragBtoAValidation();
});

