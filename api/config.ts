import { load } from "https://deno.land/std@0.210.0/dotenv/mod.ts";

const env = await load();

const config = {
  ghToken: env.GH_TOKEN,// env.GIT_TOKEN,
  ghRepoOwner: env.REPO_OWNER,
  ghRepoName: env.REPO_NAME,
  ghRepoFile: env.REPO_FILE,
  ghRepoBranch: env.REPO_BRANCH,
  ghRepoPlanBranch: env.REPO_PLAN_BRANCH,
//   ciLogfile: env.CI_LOGFILE,
//   ciLogfilePostfix: env.CI_LOGFILE_POSTFIX,
//   ciWorkflowName: env.CI_WORKFLOW_NAME,

};

export default config;