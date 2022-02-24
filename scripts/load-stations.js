/**
 * @overview Loads station data into RediSearch
 */

const fs = require('fs')
const path = require('path')

const Database = require('../lib/database')

const attrs = [
  'address',
  'band',
  'callsign',
  'fax',
  'frequency',
  'geolocation',
  'id',
  'logo',
  'market_city',
  'market_state',
  'name',
  'phone',
  'phone_extension',
  'tagline',
  'links'
]

function createIndex () {
  console.info('Creating stations index')

  return database.client.ft.create('stations', {
    '$.band': 'TEXT',
    '$.callsign': 'TEXT',
    '$.frequency': 'NUMERIC',
    '$.geolocation': 'GEO',
    '$.id': 'TEXT',
    '$.market_city': 'TEXT',
    '$.market_state': 'TEXT',
    '$.name': 'TEXT'
  }, { ON: 'JSON' })
}

function loadStation (station) {
  const args = {}

  console.info('Inserting:', station.id)

  attrs.forEach((attr) => {
    if (station[attr] !== null && station[attr] !== undefined) {
      let value

      if (attr === 'geolocation') {
        value = station[attr].join(',')
      } else {
        value = station[attr]
      }

      if (value) {
        args[attr] = value
      }
    }
  })

  return database.client.json.set(station.id, '.', args)
}

const database = new Database()
const stationsFile = fs.readFileSync(path.join(__dirname, '../data/stations.json'))
const stations = JSON.parse(stationsFile.toString('utf8'))

database.client.moduleLoad('/usr/lib/redis/modules/rejson.so').then(() => {
  createIndex().then(() => {
    const operations = stations.map(loadStation)

    Promise.all(operations)
      .then(() => {
        console.info('Executing SAVE...')
        return database.client.save()
      })
      .then(() => {
        console.info('Done.')
        return database.client.quit()
      })
  }).catch((error) => {
    console.error('Failed to import stations:', error)
  })
})
