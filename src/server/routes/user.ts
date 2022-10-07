import { FastifyInstance } from 'fastify'
import { getUserById } from '@jathanasiou/sleeper-api'

type ParamsType = {
  userId: string
}

export default (fastify: FastifyInstance) => {
  fastify.route<{ Params: ParamsType }>({
    method: 'GET',
    url: '/user/id/:userId',
    schema: { params: { type: 'object', properties: { userId: { type: 'string' } } } },
    handler: async (request) => {
      const { userId } = request.params
      const result = await getUserById(userId)

      return result
    },
  })
}
