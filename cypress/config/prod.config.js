const { defineConfig } = require('cypress');

module.exports = defineConfig({
    env: {
        env: 'prod',

        user: {
            firstName: 'First Name',
            lastName: 'Last Name',
            email: 'test.account12@dispotable.com',
            password: '123890qwerty!'
        }
    },
    e2e: {
        baseUrl: 'https://magento.softwaretestingboard.com',
        chromeWebSecurity: false,
        viewportWidth: 1920,
        viewportHeight: 1080,
        retries: {
            runMode: 1,
            openMode: 0
        },
        reporter: 'cypress-mochawesome-reporter',
        watchForFileChanges: false,

        // We've imported your old cypress plugins here.
        // You may want to clean this up later by importing these.
        setupNodeEvents(on, config) {
            return require('../plugins/index.js')(on, config);
        }
    }
});
