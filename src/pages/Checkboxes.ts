import { expect, Page, Locator } from '@playwright/test';
import PlaywrightWrapper from '../helper/wrapper/playwrightWrapper.js';

export class Checkboxes {

    private readonly page: Page;
    private readonly checkbox1: Locator;
    private readonly checkbox2: Locator;
    private readonly wrapper: PlaywrightWrapper;

    constructor(page: Page) {
        this.page = page;
        this.checkbox1 = page.getByRole('checkbox').first();
        this.checkbox2 = page.getByRole('checkbox').nth(1);
        this.wrapper = new PlaywrightWrapper(page);
    }

    async gotoCheckboxesPage() {
        await this.wrapper.goto('checkboxes');
    }

    // ── Acciones ──────────────────────────────────────────
    async selectFirstCheckbox() {
        if (!await this.checkbox1.isChecked()) {
            await this.checkbox1.click();
        }
    }

    async deselectFirstCheckbox() {
        if (await this.checkbox1.isChecked()) {
            await this.checkbox1.click();
        }
    }

    async selectSecondCheckbox() {
        if (!await this.checkbox2.isChecked()) {
            await this.checkbox2.click();
        }
    }

    async deselectSecondCheckbox() {
        if (await this.checkbox2.isChecked()) {
            await this.checkbox2.click();
        }
    }

    // ── Validaciones ──────────────────────────────────────
    async firstCheckboxSelected() {
        await expect(this.checkbox1).toBeChecked();
    }

    async firstCheckboxDeselected() {
        await expect(this.checkbox1).not.toBeChecked();
    }

    async secondCheckboxSelected() {
        await expect(this.checkbox2).toBeChecked();
    }

    async secondCheckboxDeselected() {
        await expect(this.checkbox2).not.toBeChecked();
    }

    async validateCheckboxes() {
        await expect(this.checkbox1).not.toBeChecked();
        await expect(this.checkbox2).toBeChecked();
    }

    // mantener compatibilidad con steps existentes
    async selectSeconfCheckbox() {
        await this.selectSecondCheckbox();
    }
}
