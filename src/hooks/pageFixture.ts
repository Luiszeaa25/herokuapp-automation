import { Page } from "@playwright/test";
import { Logger } from "winston";
import { LoginPageHerokuapp } from "../pages/LoginPageHerokuapp.js";
import { DragDrop } from "../pages/DragAndDrop.js";

class Fixture {
    private _page!: Page;
    private _logger!: Logger;
    private _loginPage!: LoginPageHerokuapp;
    private _dragDrop!: DragDrop;

    get page(): Page {
        if (!this._page) throw new Error("Page not initialized. Is the Before hook running?");
        return this._page;
    }
    set page(p: Page) { this._page = p; }

    get logger(): Logger {
        if (!this._logger) throw new Error("Logger not initialized. Is the Before hook running?");
        return this._logger;
    }
    set logger(l: Logger) { this._logger = l; }

    get loginPage(): LoginPageHerokuapp {
        if (!this._loginPage) throw new Error("LoginPage not initialized. Is the Before hook running?");
        return this._loginPage;
    }
    set loginPage(lp: LoginPageHerokuapp) { this._loginPage = lp; }

    get dragDrop(): DragDrop{
        if (!this._dragDrop) throw new Error("DragDrop not initialized. Is the Before hook running?");
        return this._dragDrop;
    }
    set dragDrop(dd: DragDrop) { this._dragDrop = dd; }
}

export const fixture = new Fixture();
