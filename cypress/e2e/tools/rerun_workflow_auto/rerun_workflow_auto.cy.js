import { ApiCircleCi } from '../../../helpers/api/apiCircleCi/ApiCircleCi';

describe('Rerun Workflow Auto', () => {
    /*
     README
     This script will help as with getting more successful builds while running regression by automatically rerun only failed jobs.

     Auto-rerun is limitted to 3 times by default.


     For using this just add parameter RERUN with value 'true' (or any other value except 'not'), for example:

        1. Go to project on CircleCI
        2. Select your branch via filter drop-down
        3. Click 'Trigger Pipeline' button
        4. Add parameter:
           Parameter type - string
           Name           - ENV
           Value          - prod
        5. Add parameter:
           Parameter type - string
           Name           - SPEC
           Value          - regression
        6. Add parameter:
           Parameter type - string
           Name           - RERUN
           Value          - true (or any other value except 'not')
        7. Click 'Trigger Pipeline' button and refresh the page (new pipeline will be displayed) and if few jobs will be failed, then they will be rerun automatically


     Also you can run script for some exact Workflow, for example:   

        1. Go to project on CircleCI
        2. Select your branch via filter drop-down
        3. Click 'Trigger Pipeline' button
        4. Add parameter:
           Parameter type - string
           Name           - ENV
           Value          - prod
        5. Add parameter:
           Parameter type - string
           Name           - RERUN
           Value          - true (or any other value except 'not')
        6. Add parameter:
           Parameter type - string
           Name           - CIRCLE_WORKFLOW_ID
           Value          - workflow id 
                            (you can get this from workflow url)
        7. Click 'Trigger Pipeline' button and refresh the page (new pipeline will be displayed) and if few jobs will be failed, then they will be rerun automatically


     You can also run this script locally. There are 2 options:

     1) Automatically rerun failed jobs for the latest pipeline in project (please change config file staging.config.js to another env if it's needed)
        from command line, run this command
     
        ./node_modules/.bin/cypress run --spec cypress/e2e/rerun_workflow_auto/rerun_workflow_auto.cy.js --config-file cypress/config/staging.config.js

     2) Automatically rerun failed jobs for the passed Workflow Id
        from command line, run this command (change WORKFLOW_ID  to Workflow Id of pipeline that you want to automatically Rerun From Failed  +  change config file staging.config.js to another env if it's needed)

        ./node_modules/.bin/cypress run --spec cypress/e2e/rerun_workflow_auto/rerun_workflow_auto.cy.js --env circle-workflow-id=WORKFLOW_ID --config-file cypress/config/staging.config.js
     */

    let timeout = 45000; // time that function will wait before the next checking of status of workflow
    let rerunLimit = 3; // maximum number of times that workflow will be rerun from failed

    before(() => {
        // getting value for 'circleToken' from CircleCi parameters if it's passed while triggering pipeline
        if (Cypress.env('circle-token-from-parameters') !== 'default' && typeof Cypress.env('circle-token-from-parameters') !== 'undefined') {
            ApiCircleCi.circleToken = Cypress.env('circle-token-from-parameters');
        }
        // getting value for 'timeout' from CircleCi parameters if it's passed while triggering pipeline
        if (Cypress.env('rerun_timeout') !== 'default' && typeof Cypress.env('rerun_timeout') !== 'undefined') {
            timeout = Cypress.env('rerun_timeout');
        }
        // getting value for 'rerunLimit' from CircleCi parameters if it's passed while triggering pipeline
        if (Cypress.env('rerun_limit') !== 'default' && typeof Cypress.env('rerun_limit') !== 'undefined') {
            rerunLimit = Cypress.env('rerun_limit');
        }
    });

    it(`Rerun Workflow Auto`, () => {
        if (Cypress.env('circle-workflow-id') !== 'latest' && typeof Cypress.env('circle-workflow-id') !== 'undefined') {
            console.log(`Running Rerun Workflow Auto script using workflow id that is passed in CircleCi parameters`);
            ApiCircleCi.methods.rerunWorkflowFromFailedAutoByWorkflowId({
                workflowId: Cypress.env('circle-workflow-id'),
                timeout: timeout,
                rerunLimit: rerunLimit
            });
        } else {
            console.log(`Running Rerun Workflow Auto script using latest pipeline`);
            ApiCircleCi.getPipelines().then(response => {
                const pipelineId = JSON.parse(response).items[0].id;
                ApiCircleCi.methods.rerunWorkflowFromFailedAutoByPipelineId({ pipelineId: pipelineId, timeout: timeout, rerunLimit: rerunLimit });
            });
        }
    });
});
