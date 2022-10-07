import { FastifyInstance } from 'fastify'
import { getHeadToHeadMatchupsByWeek } from '@jathanasiou/sleeper-api'

type ParamsType = {
  week: number
}

export default (fastify: FastifyInstance) => {
  fastify.route<{ Params: ParamsType }>({
    method: 'GET',
    url: '/matchups/:week',
    schema: { params: { type: 'object', properties: { week: { type: 'number' } } } },
    handler: async (request) => {
      const { week } = request.params
      const result = await getHeadToHeadMatchupsByWeek('862095493507989504', week)
      return result
    },
  })
}
