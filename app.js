'use strict'

const fastify = require('fastify')({ logger: 'info', ignoreTrailingSlash: true })
const createError = require('http-errors')

const Database = require('./lib/database')
const Station = require('./models/station')

const database = new Database()
const station = new Station(database)

fastify.get('/stations', (request, reply) => {
  return station.all()
})

fastify.get('/stations/:id', async (request, reply) => {
  const result = await station.fetch(request.params.id)

  if (!result) {
    return createError(404, 'Station not found')
  }

  return result
})

const start = async () => {
  try {
    await fastify.listen(3000, '0.0.0.0')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
