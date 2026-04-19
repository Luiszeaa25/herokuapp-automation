import { Before, After, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { CustomWorld } from './world.js';
import { LoginPageHerokuapp } from '../pages/LoginPageHerokuapp.js';


setDefaultTimeout(30000);

Before (async function (this:CustomWorld){

    await this.init();
    this.loginpage = new LoginPageHerokuapp(this.page);
});

After(async function(this:CustomWorld, scenario){

    if (scenario.result?.status === Status.FAILED){

        const screenshot = await this.page.screenshot({ fullPage: true});
        if (screenshot){
            this.attach(screenshot, 'image/png');
        }
    }
    await this.destroy();
});