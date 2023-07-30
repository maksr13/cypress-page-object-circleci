export class ApiCircleCiData {
    getPostPipelinesData({ branch, parameters }) {
        return {
            branch: branch,
            parameters: parameters
        };
    }

    getPostRerunWorkflowData({} = {}) {
        return {
            enable_ssh: false,
            from_failed: true
        };
    }
}
