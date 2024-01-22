import { createSchema, createYoga } from 'graphql-yoga'
import { serve } from 'https://deno.land/std@0.157.0/http/server.ts'

const typeDefs = `
  scalar JSON

  type Query {
    hello(name: String): String!
  }
  type Mutation {
    savePolicyToGithub(policy: JSON): Boolean!
  }
`

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
  },
  Mutation: {
    savePolicyToGithub: (_, { policy }) => {
        console.log(policy)
        return true
    }
  }
}

const yoga = createYoga({
    context: {},
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