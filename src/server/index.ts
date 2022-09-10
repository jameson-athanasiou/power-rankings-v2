import Fastify from 'fastify'
import userRoutes from './routes/user'
import matchupRoutes from './routes/matchup'

const fastify = Fastify({ logger: true })

fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

userRoutes(fastify)
matchupRoutes(fastify)

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
