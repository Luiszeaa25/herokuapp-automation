import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './src/test/playground',
    fullyParallel: false,
    retries: 0,
    workers: 1,
    use: {
        baseURL: 'https://the-internet.herokuapp.com/',
        headless: true,
        trace: 'on-first-retry',
    },
});
