import { createSchema, createYoga } from 'graphql-yoga'
import { serve } from 'https://deno.land/std@0.157.0/http/server.ts'

import  config  from './config'
import { GithubClient } from './github'

const githubClient = new GithubClient(config.ghToken)

const typeDefs = `
  scalar JSON

  type Query {
    hello(name: String): String!
  }
  type Mutation {
    savePolicyToGithub(policy: JSON): String
  }
`

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
  },
  Mutation: {
    savePolicyToGithub: async (_, { policy }, { config, githubClient }) => {
        console.log(policy)

        console.log("savePolicyToGithub", { config, githubClient });

        const owner = config.ghRepoOwener;
        const repo = config.ghRepoName;
        const branch = config.ghRepoBranch; // base
        const planBranch = config.ghRepoPlanBranch; // head
        const path = config.ghRepoFile;
        const changes = [
          {
          files: {
            [path]: policy
          },
          commit: "new policy",
        }
        ]
      
        
        const message = "CP policy";

        try {
          const res = await githubClient.createPullRequest(owner, repo, "cp policy", message, planBranch, branch, changes);
          console.log(res);
          return res?.data?.number
        } catch (e) {
          console.log(e);
          return null;
        }

        return null
    }
  }
}

const yoga = createYoga({
    context: { config, githubClient},
    schema: createSchema({
      typeDefs,
      resolvers
    })
  })
   
  serve(yoga, {
    port: 3003,
    onListen({ hostname, port }) {
      console.log(`Listening on http://${hostname}:${port}${yoga.graphqlEndpoint}`)
    }
  })