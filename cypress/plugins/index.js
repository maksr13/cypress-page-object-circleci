/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// For allowing different config files
const fs = require('fs-extra');
const path = require('path');

module.exports = (on, config) => {
    function getConfigurationByFile(file) {
        const pathToConfigFile = path.resolve('cypress/config', `${file}.json`);

        return fs.readJson(pathToConfigFile);
    }
    const file = config.env.configFile || 'dev';

    return getConfigurationByFile(file);
};

// For mochawesome reporter
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');

module.exports = on => {
    on('before:run', async details => {
        console.log('override before:run');
        await beforeRunHook(details);
    });

    on('after:run', async () => {
        console.log('override after:run');
        await afterRunHook();
    });
};

module.exports = (on, config) => {
    require('cypress-mochawesome-reporter/plugin')(on);
    on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome' && browser.isHeadless) {
            launchOptions.args = require('cypress-log-to-output').browserLaunchHandler(browser, launchOptions.args);
            launchOptions.args.push('--disabled-gpu', '--disable-dev-shm-usage', '--no-sandbox');
            const version = parseInt(browser.majorVersion);
            if (version >= 109) {
                launchOptions.args.push('--headless=new');
            } else if (version >= 96 && version < 109) {
                launchOptions.args.push('--headless=chrome');
            } else {
                launchOptions.args.push('--headless');
            }
        }
        return launchOptions;
    });
};

