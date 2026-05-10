import { test } from '@playwright/test';
import { DragDrop } from '../../pages/DragAndDrop.js'

test('A to B', async ({ page }) => {
    const dragDrop = new DragDrop(page);
    await dragDrop.gotoDragAndDropPage();
    await dragDrop.dragAtoB();
});

test('B to A', async ({ page }) => {
    const dragDrop = new DragDrop(page);
    await dragDrop.gotoDragAndDropPage();
    await dragDrop.dragBtoA();
});

test('A to B original position', async ({ page }) => {
    const dragDrop = new DragDrop(page);
    await dragDrop.gotoDragAndDropPage();
    await dragDrop.dragAndReturnToOriginalPosition();
});
