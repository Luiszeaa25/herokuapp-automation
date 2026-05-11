import { BeforeAll, AfterAll, Before, After, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { Browser } from "@playwright/test";
import { fixture } from "./pageFixture.js";
import { invokeBrowser } from "../helper/browsers/browserManager.js";
import { getEnv } from "../helper/env/env.js";
import { createLogger } from "winston";
import { options } from "../helper/util/logger.js";
import { LoginPageHerokuapp } from "../pages/LoginPageHerokuapp.js";
import { DragDrop } from "../pages/DragAndDrop.js";
import { Checkboxes } from "../pages/Checkboxes.js";
import fs from "fs";

setDefaultTimeout(60 * 1000);

let browser: Browser;

BeforeAll(async function () {
    getEnv();
    browser = await invokeBrowser();
});

Before(async function ({ pickle }) {
    const scenarioName = pickle.name + pickle.id;
    this.context = await browser.newContext({
        recordVideo: { dir: "test-results/videos" }
    });
    await this.context.tracing.start({
        name: scenarioName,
        title: pickle.name,
        sources: true,
        screenshots: true,
        snapshots: true
    });
    fixture.page = await this.context.newPage();
    fixture.logger = createLogger(options(scenarioName));
    fixture.loginPage = new LoginPageHerokuapp(fixture.page);
    fixture.dragDrop = new DragDrop(fixture.page);
    fixture.checkboxes = new Checkboxes(fixture.page);
});

After(async function ({ pickle, result }) {
    const tracePath = `./test-results/trace/${pickle.id}.zip`;
    const status = result?.status;

    const img = await fixture.page.screenshot({
        path: `./test-results/screenshots/${pickle.name}.png`,
        type: "png"
    });

    await this.context.tracing.stop({
        path: status === Status.FAILED ? tracePath : undefined
    });

    await fixture.page.close();
    await this.context.close();

    await this.attach(img, "image/png");

    if (status === Status.FAILED) {
        await this.attach(
            `<a href="https://trace.playwright.dev/">Open ${tracePath}</a>`,
            "text/html"
        );
    }

    const logPath = `logs/${pickle.name + pickle.id}.log`;
    if (fs.existsSync(logPath)) {
        const logContent = fs.readFileSync(logPath, "utf-8");
        await this.attach(logContent, "text/plain");
    }
});

AfterAll(async function () {
    await browser.close();
});
