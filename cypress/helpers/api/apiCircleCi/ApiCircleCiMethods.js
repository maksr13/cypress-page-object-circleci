import { ApiCircleCi } from '../../../helpers/api/apiCircleCi/ApiCircleCi';

export class ApiCircleCiMethods {
    rerunIteration = 0;

    /*
    pipelineId - pipeline id that you want to automatically rerun from failed
    timeout - time that function will wait before the next checking of status of workflow
    rerunLimit - maximum number of times that workflow will be rerun from failed
    */
    rerunWorkflowFromFailedAutoByPipelineId({ pipelineId, timeout, rerunLimit }) {
        cy.wait(timeout);

        ApiCircleCi.getPipelinesWorkflow({ pipelineId: pipelineId }).then(response => {
            const workflowId = JSON.parse(response).items[0].id;

            ApiCircleCi.getWorkflow({ workflowId: workflowId }).then(response => {
                if (JSON.parse(response).status === 'failed' && this.rerunIteration < rerunLimit) {
                    ApiCircleCi.postRerunWorkflow({ workflowId: workflowId, body: ApiCircleCi.data.getPostRerunWorkflowData() });
                    this.rerunIteration++;
                    console.log(`Few jobs in workflow are Failed, lets rerun these failed jobs and see..`);
                    console.log(`Workflow ${workflowId} has been rerun from failed..`);

                    this.rerunWorkflowFromFailedAutoByPipelineId({ pipelineId: pipelineId, timeout: timeout, rerunLimit: rerunLimit });
                } else if (JSON.parse(response).status === 'success' || JSON.parse(response).status === 'canceled') {
                    console.log(`Workflow is passed! (or canceled)`);
                } else if (this.rerunIteration < rerunLimit) {
                    console.log(`Workflow is still running..`);
                    this.rerunWorkflowFromFailedAutoByPipelineId({ pipelineId: pipelineId, timeout: timeout, rerunLimit: rerunLimit });
                }
            });
        });
    }

    /*
    workflowId - workflowId id that you want to automatically rerun from failed (it will get pipeline id by workflow id and will always rerun the latest workflow)
    timeout - time that function will wait before the next checking of status of workflow
    rerunLimit - maximum number of times that workflow will be rerun from failed
    */
    rerunWorkflowFromFailedAutoByWorkflowId({ workflowId, timeout, rerunLimit }) {
        cy.wait(timeout);

        ApiCircleCi.getWorkflow({ workflowId: workflowId }).then(response => {
            const pipelineId = JSON.parse(response).pipeline_id;

            ApiCircleCi.getPipelinesWorkflow({ pipelineId: pipelineId }).then(response => {
                const workflowId = JSON.parse(response).items[0].id;

                ApiCircleCi.getWorkflow({ workflowId: workflowId }).then(response => {
                    if (JSON.parse(response).status === 'failed' && this.rerunIteration < rerunLimit) {
                        ApiCircleCi.postRerunWorkflow({ workflowId: workflowId, body: ApiCircleCi.data.getPostRerunWorkflowData() });
                        this.rerunIteration++;
                        console.log(`Few jobs in workflow are Failed, lets rerun these failed jobs and see..`);
                        console.log(`Workflow ${workflowId} has been rerun from failed..`);

                        this.rerunWorkflowFromFailedAutoByWorkflowId({ workflowId: workflowId, timeout: timeout, rerunLimit: rerunLimit });
                    } else if (JSON.parse(response).status === 'success' || JSON.parse(response).status === 'canceled') {
                        console.log(`Workflow is passed! (or canceled)`);
                    } else if (this.rerunIteration < rerunLimit) {
                        console.log(`Workflow is still running..`);
                        this.rerunWorkflowFromFailedAutoByWorkflowId({ workflowId: workflowId, timeout: timeout, rerunLimit: rerunLimit });
                    }
                });
            });
        });
    }
}
