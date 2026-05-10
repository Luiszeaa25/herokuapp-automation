import { Page, Locator } from "@playwright/test";

export default class PlaywrightWrapper {

    constructor(private page: Page) { }

    async goto(path: string) {
        const baseUrl = process.env.BASEURL || "https://the-internet.herokuapp.com/";
        await this.page.goto(`${baseUrl}${path}`, {
            waitUntil: "domcontentloaded"
        });
    }

    async waitAndClick(locator: string) {
        const element = this.page.locator(locator);
        await element.waitFor({ state: "visible" });
        await element.click();
    }

    async navigateTo(link: string) {
        await Promise.all([
            this.page.waitForNavigation(),
            this.page.click(link)
        ]);
    }

    async dragTo(source: Locator, target: Locator) {
        await source.waitFor({ state: "visible" });
        await target.waitFor({ state: "visible" });

        const srcSelector = await source.evaluate(el => '#' + el.id);
        const tgtSelector = await target.evaluate(el => '#' + el.id);

        await this.page.evaluate(({ src, tgt }) => {
            const srcEl = document.querySelector(src);
            const tgtEl = document.querySelector(tgt);
            if (!srcEl || !tgtEl) throw new Error(`Element not found: ${src} or ${tgt}`);
            const dataTransfer = new DataTransfer();
            srcEl.dispatchEvent(new DragEvent('dragstart', { bubbles: true, dataTransfer }));
            tgtEl.dispatchEvent(new DragEvent('dragenter', { bubbles: true, dataTransfer }));
            tgtEl.dispatchEvent(new DragEvent('dragover',  { bubbles: true, dataTransfer }));
            tgtEl.dispatchEvent(new DragEvent('drop',      { bubbles: true, dataTransfer }));
            srcEl.dispatchEvent(new DragEvent('dragend',   { bubbles: true, dataTransfer }));
        }, { src: srcSelector, tgt: tgtSelector });
    }
}
