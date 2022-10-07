import { FastifyInstance } from 'fastify'
import { generateRankings } from '../engine/rankings'

export default (fastify: FastifyInstance) => {
  fastify.route({
    method: 'GET',
    url: '/rankings',
    handler: async () => {
      const result = generateRankings()
      return result
    },
  })
}
