'use strict'

const Fastify = require('fastify')({ logger: true, ignoreTrailingSlash: true })
const createError = require('http-errors')

const Database = require('./lib/database')
const Station = require('./models/station')

const database = new Database()
const station = new Station(database)

Fastify.get('/stations', (request, reply) => {
  return station.all()
})

Fastify.get('/stations/:id', async (request, reply) => {
  const result = await station.fetch(request.params.id)

  if (!result) {
    return createError(404, 'Station not found')
  }

  return result
})

const start = async () => {
  try {
    await Fastify.listen({
      host: '0.0.0.0',
      port: 3000
    })
  } catch (err) {
    Fastify.log.error(err)
    process.exit(1)
  }
}

start()
