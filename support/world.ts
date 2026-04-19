import { chromium, Browser, Page } from '@playwright/test';
import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { LoginPageHerokuapp } from '../pages/LoginPageHerokuapp.js'; 

export class CustomWorld extends World {

    browser!: Browser;
    page!: Page;
    loginpage!: LoginPageHerokuapp;

    constructor (options: IWorldOptions){
        super(options);
    }
    
    async init (){

        this.browser = await chromium.launch({headless: true});
        this.page = await this.browser.newPage();
    }
    async destroy (){

        await this.browser.close();
    }
}

setWorldConstructor(CustomWorld);