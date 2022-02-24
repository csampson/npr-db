/**
 * @overview Stations interface
 */

'use strict'

const memoize = require('lodash/memoize')

class Station {
  /**
   * @param {Database} database - Database client instance
   */
  constructor (database) {
    this.database = database

    this.all = memoize(this.all)
    this.fetch = memoize(this.fetch)
  }

  async all () {
    // TODO: Find a more graceful way to specify "get all results" rather than `LIMIT=n`
    const result = await this.database.client.ft.search(
      'stations',
      '*',
      { LIMIT: { from: 0, size: 1000 }, RETURN: ['$.id', '$.band', '$.callsign', '$.frequency', '$.geolocation', '$.market_city', '$.market_state'] }
    )

    return result.documents.map(({ value }) => ({
      id: value['$.id'],
      band: value['$.band'],
      callsign: value['$.callsign'],
      frequency: value['$.frequency'],
      geolocation: value['$.geolocation'],
      market_city: value['$.market_city'],
      market_state: value['$.market_state']
    }))
  }

  async fetch (id) {
    return this.database.client.json.get(id)
  }
}

module.exports = Station
