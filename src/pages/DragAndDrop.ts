import { expect, Page, Locator } from '@playwright/test';
import PlaywrightWrapper from '../helper/wrapper/playwrightWrapper.js';

export class DragDrop {

    private readonly page: Page;
    private readonly columnA: Locator;
    private readonly columnB: Locator;
    private readonly wrapper: PlaywrightWrapper;

    constructor(page: Page) {
        this.page = page;
        this.columnA = page.locator('#column-a');
        this.columnB = page.locator('#column-b');
        this.wrapper = new PlaywrightWrapper(page);
    }

    async gotoDragAndDropPage() {
        await this.wrapper.goto('drag_and_drop');
    }

    async dragAtoB() {
        await this.wrapper.dragTo(this.columnA, this.columnB);
    }

    async verifyAtoBSwap() {
        await expect(this.columnA).toContainText('B');
        await expect(this.columnB).toContainText('A');
    }

    async dragBtoA() {
        await this.wrapper.dragTo(this.columnB, this.columnA);
    }

    async verifyBtoASwap() {
        await expect(this.columnB).toContainText('A');
        await expect(this.columnA).toContainText('B');
    }

    async dragAndReturnToOriginalPosition() {
        await this.wrapper.dragTo(this.columnA, this.columnB);
        await this.wrapper.dragTo(this.columnB, this.columnA);
    }

    async verifyOriginalPosition() {
        await expect(this.columnA).toContainText('A');
        await expect(this.columnB).toContainText('B');
    }
}
