import { FastifyInstance } from 'fastify'
import { getHeadToHeadMatchupsByWeek } from '@jathanasiou/sleeper-api'

export default (fastify: FastifyInstance) => {
  fastify.route({
    method: 'GET',
    url: '/matchups',
    schema: { params: { type: 'object', properties: { userId: { type: 'string' } } } },
    handler: async () => {
      const result = await getHeadToHeadMatchupsByWeek('862095493507989504', 1)
      return result
    },
  })
}
