import { FastifyInstance } from 'fastify'
import { getAvatar } from '@jathanasiou/sleeper-api'

type ParamsType = {
  id: string
}

export default (fastify: FastifyInstance) => {
  fastify.route<{ Params: ParamsType }>({
    method: 'GET',
    url: '/avatar/:id',
    schema: { params: { type: 'object', properties: { id: { type: 'string' } } } },
    handler: async (request) => {
      const { id } = request.params
      const result = await getAvatar(id)
      return result
    },
  })
}
