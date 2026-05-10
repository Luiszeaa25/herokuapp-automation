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
        await source.hover();
        await this.page.mouse.down();
        const box = await target.boundingBox();
        await this.page.mouse.move(
            box.x + box.width / 2,
            box.y + box.height / 2,
            { steps: 10 }
        );
        await this.page.mouse.up();
    }
}
