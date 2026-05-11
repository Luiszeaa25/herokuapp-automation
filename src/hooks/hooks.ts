import { BeforeAll, AfterAll, Before, After, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { Browser, BrowserContext } from "@playwright/test";
import { fixture } from "./pageFixture.js";
import { invokeBrowser } from "../helper/browsers/browserManager.js";
import { getEnv } from "../helper/env/env.js";
import { createLogger } from "winston";
import { options } from "../helper/util/logger.js";
import { LoginPageHerokuapp } from "../pages/LoginPageHerokuapp.js";
import { DragDrop } from "../pages/DragAndDrop.js";
import fs from "fs";

setDefaultTimeout(60 * 1000);

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
    getEnv();
    browser = await invokeBrowser();
});

Before(async function ({ pickle }) {
    const scenarioName = pickle.name + pickle.id;
    context = await browser.newContext({
        recordVideo: { dir: "test-results/videos" }
    });
    await context.tracing.start({
        name: scenarioName,
        title: pickle.name,
        sources: true,
        screenshots: true,
        snapshots: true
    });
    fixture.page = await context.newPage();
    fixture.logger = createLogger(options(scenarioName));
    fixture.loginPage = new LoginPageHerokuapp(fixture.page);
    fixture.dragDrop = new DragDrop(fixture.page);
});

After(async function ({ pickle, result }) {
    const tracePath = `./test-results/trace/${pickle.id}.zip`;
    const status = result?.status;

    // Screenshot siempre — útil en PASSED y FAILED
    const img = await fixture.page.screenshot({
        path: `./test-results/screenshots/${pickle.name}.png`,
        type: "png"
    });

    // Trace solo en FAILED
    await context.tracing.stop({
        path: status === Status.FAILED ? tracePath : undefined
    });

    // Video: cerrar contexto para que el archivo se guarde
    await fixture.page.close();
    await context.close();

    // Adjuntar screenshot siempre
    await this.attach(img, "image/png");

    // En FAILED: adjuntar trace link y video
    if (status === Status.FAILED) {
        await this.attach(
            `<a href="https://trace.playwright.dev/">Open ${tracePath}</a>`,
            "text/html"
        );
    }

    // Adjuntar log del escenario
    const logPath = `logs/${pickle.name + pickle.id}.log`;
    if (fs.existsSync(logPath)) {
        const logContent = fs.readFileSync(logPath, "utf-8");
        await this.attach(logContent, "text/plain");
    }
});

AfterAll(async function () {
    await browser.close();
});
