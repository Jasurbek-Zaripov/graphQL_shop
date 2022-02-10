import { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import http from 'http'
import schema from './src/index.js'
import dbconnect from './src/database/database-config/db-config.js'
import { graphqlUploadExpress } from 'graphql-upload'

//start server
import { join } from 'path'
;(async function startApolloServer() {
  try {
    const app = express()
    app.use(
      graphqlUploadExpress({
        maxFileSize: 10 * 1024 * 1024,
      })
    )
    app.use(express.static(join(process.cwd(), 'src', 'files')))

    const httpServer = http.createServer(app)

    let db = await dbconnect()
    console['log']('db success connected!')

    const server = new ApolloServer({
      introspection: true,
      schema,
      context: ({ req, res }) => {
        return { db, token: req.headers?.token }
      },
      plugins: [ApolloServerPluginLandingPageGraphQLPlayground(), ApolloServerPluginDrainHttpServer({ httpServer })],
    })

    await server.start()
    server.applyMiddleware({ app })
    await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve))

    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  } catch (error) {
    console['log'](error)
  }
})()
