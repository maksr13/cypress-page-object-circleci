# Cypress Page Object Circle Ci Example
Example of project with UI tests created using Cypress with Page Object model and integration with Circle Ci using the orb https://circleci.com/developer/orbs/orb/cypress-io/cypress with ability to run tests using multiple parallel jobs

## :gear: Prerequisites:

- [nodejs](https://nodejs.org/en/)
- [npm](https://docs.npmjs.com/about-npm)
- [Cypress](https://www.cypress.io/)

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
- Corresponding script is placed in `cypress/e2e/tools/rerun_workflow_auto/rerun_workflow_auto.cy.js`.

- Api requests that are used here are placed in `cypress/helpers/api/apiCircleCi/ApiCircleCi.js`.

- Api payloads that are used here are placed in `cypress/helpers/api/apiCircleCi/ApiCircleCiData.js`.

- This script will help with getting more successful builds while running regression by automatically rerun only failed jobs.

- Auto-rerun is limitted to 3 times by default.

#### :gear: Setup

- To start using this script, please go to ../../../helpers/api/apiCircleCi/ApiCircleCi file and update apiCircleUrl, circleOrgSlug, repo and circleToken to corresponding values

You can get these values like that:
1. Go to project on CircleCI.
2. Select your branch via filter drop-down.
3. Click 'Trigger Pipeline' button
4. Open dev tools in your browser and go to 'Network' tab (this step can be different depending on your browser, please google how to check requests in your browser)
5. Click 'Trigger Pipeline' button
6. In the list of requests find a request with endpoint "pipeline", you can simply search by this endpoint using search field
7. Check URL and get apiCircleUrl, circleOrgSlug and repo values from there
8. Update corresponding fields with values above in ../../../helpers/api/apiCircleCi/ApiCircleCi , make pull request and merge this

- Also it needs to create your personal CircleCi API token, please take a look at following information https://circleci.com/docs/managing-api-tokens
- After creation personal API token you can update circleToken field in the ../../../helpers/api/apiCircleCi/ApiCircleCi , and push you changes.
But for security it's better to CIRCLE_TOKEN parameter while triggering pipeline (please see 'Usage' part of the README)

#### :heavy_check_mark: Usage

- For using this just add parameter RERUN with value 'true' (or any other value except 'not'), for example:

1. Go to project on CircleCI
2. Select your branch via filter drop-down
3. Click 'Trigger Pipeline' button
4. Add parameter:
    - Parameter type - string
    - Name           - ENV
    - Value          - prod
5. Add parameter:
    - Parameter type - string
    - Name           - SPEC
    - Value          - regression
6. Add parameter:
    - Parameter type - string
    - Name           - RERUN
    - Value          - true (or any other value except 'not')
7. Add parameter: (it should be used only if you don't have the updated circleToken field in the ../../../helpers/api/apiCircleCi/ApiCircleCi)
    - Parameter type - string
    - Name           - CIRCLE_TOKEN
    - Value          - your personal CircleCi API token (please, see 'Setup' part)
8. Click 'Trigger Pipeline' button and refresh the page (new pipeline will be displayed) and if few jobs will be failed, then they will be rerun automatically


- Also you can run script for some exact Workflow, for example:   

1. Go to project on CircleCI
2. Select your branch via filter drop-down
3. Click 'Trigger Pipeline' button
4. Add parameter:
    - Parameter type - string
    - Name           - ENV
    - Value          - prod
5. Add parameter:
    - Parameter type - string
    - Name           - RERUN
    - Value          - true (or any other value except 'not')
6. Add parameter:
    - Parameter type - string
    - Name           - CIRCLE_WORKFLOW_ID
    - Value          - workflow id 
                            (you can get this from workflow url)
7. Add parameter: (it should be used only if you don't have the updated circleToken field in the ../../../helpers/api/apiCircleCi/ApiCircleCi)
    - Parameter type - string
    - Name           - CIRCLE_TOKEN
    - Value          - your personal CircleCi API token (Please, see 'Setup' part)
8. Click 'Trigger Pipeline' button and refresh the page (new pipeline will be displayed) and if few jobs will be failed, then they will be rerun automatically


- You can also run this script locally. There are 2 options:
1.  Automatically rerun failed jobs for the latest pipeline in project (please change config file staging.config.js to another env if it's needed)
from command line, run this command

./node_modules/.bin/cypress run --spec cypress/e2e/rerun_workflow_auto/rerun_workflow_auto.cy.js --config-file cypress/config/staging.config.js

2. Automatically rerun failed jobs for the passed Workflow Id. From command line, run following command (change WORKFLOW_ID  to Workflow Id of pipeline that you want to automatically Rerun From Failed  +  change config file staging.config.js to another env if it's needed)

./node_modules/.bin/cypress run --spec cypress/e2e/rerun_workflow_auto/rerun_workflow_auto.cy.js --env circle-workflow-id=WORKFLOW_ID --config-file cypress/config/staging.config.js
