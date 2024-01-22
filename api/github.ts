import { createPullRequest } from "https://cdn.pika.dev/octokit-plugin-create-pull-request";
const { Octokit } = await import("https://esm.sh/@octokit/core");


export class GithubClient {

    #octokit: any;

    constructor(
        private readonly ghToken: string,

    ) {
        const MyOctokit = Octokit.plugin(createPullRequest);
        // console.log({ auth: ghToken })
        this.#octokit = new MyOctokit({ auth: ghToken });
    }

    async createPullRequest(owner: string, repo: string, title: string, body: string, head: string, base: string, changes: any) {

        const user = await this.#octokit.request('GET /user');
        console.dir(user?.data?.login);

        console.log("createPullRequest", { owner, repo, title, body, head, base, changes });

        const response = await this.#octokit.createPullRequest({
            owner,
            repo,
            title,
            body,
            head,
            base,
            changes
        });
        return response;
    }
}