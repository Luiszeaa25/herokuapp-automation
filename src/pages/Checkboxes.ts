import { expect, Page, Locator } from '@playwright/test';
import PlaywrightWrapper from '../helper/wrapper/playwrightWrapper.js';


export class Checkboxes {

    private readonly page: Page;
    private readonly checkbox1: Locator;
    private readonly checkbox2: Locator;
    private readonly wrapper: PlaywrightWrapper;

    constructor(page: Page){
        this.page = page;
        this.checkbox1 = page.getByRole('checkbox').first();
        this.checkbox2 = page.getByRole('checkbox').nth(1);
        this.wrapper = new PlaywrightWrapper(page);

    }

    async gotoCheckboxesPage() {
        await this.wrapper.goto('checkboxes');
    }

    async selectFirstCheckbox(){
        await this.checkbox1.click();
    }

    async firstCheckboxSelected(){
        await this.selectFirstCheckbox();
        await expect(this.checkbox1).toBeChecked();
    }

    async deselectFirstCheckbox(){
        await this.selectFirstCheckbox();
        await this.checkbox1.click();
    }

    async firstCheckboxDeselected(){
        await this.deselectFirstCheckbox();
        await expect(this.checkbox1).not.toBeChecked();
    }

    async deselectSecondCheckbox() {
        await this.selectSeconfCheckbox();
        await this.checkbox2.click();
    }

    async secondCheckboxDeselected(){
        await this.deselectFirstCheckbox();
        await expect(this.checkbox2).not.toBeChecked();
    }


    async selectSeconfCheckbox(){
        await this.checkbox2.click();
        await expect(this.checkbox2).toBeChecked();

    }

    async secondCheckboxSelected(){
        await this.selectSeconfCheckbox();
        await expect(this.checkbox2).toBeChecked();
    }

    async validateCheckboxes(){
        await expect(this.checkbox1).not.toBeChecked();
        await expect(this.checkbox2).toBeChecked();
    }
}