# Cypress Page Object Circle Ci Example
Example of project with UI tests created using Cypress with Page Object model and integration with Circle Ci using the orb https://circleci.com/developer/orbs/orb/cypress-io/cypress with ability to run tests using multiple parallel jobs

## :gear: Setup

1. `git clone https://github.com/maksr13/cypress-page-object-circleci.git`
2. cd to `cypress-page-object-circleci` folder and run `npm install`


## :heavy_check_mark: Run tests

- cypress test runner (cypress __open__):
    - **`./node_modules/.bin/cypress open --config-file cypress/config/prod.config.js`**
- cypress __headless mode__ (cypress run):
    - `./node_modules/.bin/cypress run --spec cypress/e2e/createAnAccount.cy.js --config-file cypress/config/prod.config.js` (change createAnAccount.cy.js  to needed spec or some required glob)
- **running tests on CircleCi**:
    - Running certain spec file:
        - Click 'Trigger Pipeline' button
        - Add following parameters and submit a form:
            - ENV = prod (type - String)
            - SPEC = cypress/e2e/createAnAccount.cy.js (type - String) (change createAnAccount.cy.js  to needed spec or some required glob)
    - Running regression (it will run all describes with tag `regression` and exluding tag `flaky`)
        - Click 'Trigger Pipeline' button
        - Add following parameters and submit a form
            - ENV = prod (type - String)
            - SPEC = regression (type - String)
     - Running regression with ability to automatically rerun only failed jobs
        - Click 'Trigger Pipeline' button
        - Add following parameters and submit a form
            - ENV = prod (type - String)
            - SPEC = regression (type - String)
            - RERUN = true (type - String)

## :bulb: Information
:file_folder: Tests are located in `cypress/e2e` folder.
It has a structure like this - each folder corresponds to the menu item of the Web Site, and each subfolder corresponds to each sub-menu item.

![image](https://github.com/maksr13/cypress-page-object-circleci/assets/22858879/ef417a58-d549-4ad6-86d3-56e7eeee6cea)
![image](https://github.com/maksr13/cypress-page-object-circleci/assets/22858879/9d1b66ca-cd2e-4e16-acd7-e21437544684)

:file_folder: Selectors (CSS selectors) are located in `cypress/pages` folder.
Page Object Pattern is used here in meaning that we have separete class for each page in the Web Site and store selectors of elements from these pages in these classes.

:file_folder: `.circleci` folder contains config file that allows us the ability to run tests on CricleCi

📝 Reporter
    - We use `cypress-mochawesome-reporter`. [Read more](https://www.npmjs.com/package/cypress-mochawesome-reporter). Example of report:
![image](https://github.com/maksr13/cypress-page-object-circleci/assets/22858879/5b881025-097e-4d81-be6e-3d8a4b6c681e)

✅ Circle Ci integration is implemented with following abilities:
- running certain spec / specs on CircleCI
- running all available specs with tag `regression` on CircleCI using multiple parallel jobs
- running all available specs with tag `regression` on CircleCI with ability automatically rerun only failed jobs

#### :hammer_and_wrench: Configuration
Config files:
1. `configs/prod.config.js` - Main config file where default behavior of Cypress can be modified. [More info](https://docs.cypress.io/guides/references/configuration). Also here we have default user that we can use for creating our tests. Alternatively and that would be more preferable we can create new user via Api for each spec file.
2. `plugins/index.js` - Plugins file is where we can programmatically alter the resolved configuration [More info](https://docs.cypress.io/guides/tooling/plugins-guide#Use-Cases)

## ⛏️ Rerun you workflow from failed automatically

