import { Utils } from '../../Utils';
import { ApiCircleCiData } from './ApiCircleCiData';
import { ApiCircleCiMethods } from './ApiCircleCiMethods';

export class ApiCircleCiRequests {
    apiCircleUrl = '';
    circleOrgSlug = '';
    repo = '';
    circleToken = '';

    data = new ApiCircleCiData();
    methods = new ApiCircleCiMethods();
    pipeline_ids = new Map();

    postPipelines({ body }) {
        return cy
            .request({
                method: 'POST',
                url: `${this.apiCircleUrl}/project/${this.circleOrgSlug}/${this.repo}/pipeline`,
                headers: {
                    accept: 'application/json',
                    'Circle-Token': this.circleToken
                },
                body: body
            })
            .then(response => {
                return Utils.parseResponse(response);
            });
    }

    getPipelines() {
        return cy
            .request({
                method: 'GET',
                url: `${this.apiCircleUrl}/pipeline?org-slug=${this.circleOrgSlug}`,
                headers: {
                    accept: 'application/json',
                    'Circle-Token': this.circleToken
                }
            })
            .then(response => {
                return Utils.parseResponse(response);
            });
    }

    getPipelinesWorkflow({ pipelineId }) {
        return cy
            .request({
                method: 'GET',
                url: `${this.apiCircleUrl}/pipeline/${pipelineId}/workflow`,
                headers: {
                    accept: 'application/json',
                    'Circle-Token': this.circleToken
                }
            })
            .then(response => {
                return Utils.parseResponse(response);
            });
    }

    postRerunWorkflow({ workflowId, body }) {
        return cy
            .request({
                method: 'POST',
                url: `${this.apiCircleUrl}/workflow/${workflowId}/rerun`,
                headers: {
                    accept: 'application/json',
                    'Circle-Token': this.circleToken
                },
                body: body
            })
            .then(response => {
                return Utils.parseResponse(response);
            });
    }

    getWorkflow({ workflowId }) {
        return cy
            .request({
                method: 'GET',
                url: `${this.apiCircleUrl}/workflow/${workflowId}`,
                headers: {
                    accept: 'application/json',
                    'Circle-Token': this.circleToken
                }
            })
            .then(response => {
                return Utils.parseResponse(response);
            });
    }
}

export const ApiCircleCi = new ApiCircleCiRequests();
