import { createSchema, createYoga } from 'graphql-yoga'
import { serve } from 'https://deno.land/std@0.157.0/http/server.ts'

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
  },
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