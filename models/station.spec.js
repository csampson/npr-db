/* eslint-env jest */

'use strict'

const Station = require('./station')

const mockDocument = {
  '$.id': 'WWNO-FM',
  '$.band': 'FM',
  '$.callsign': 'WWNO',
  '$.geolocation': '180,-180',
  '$.market_city': 'New Orleans',
  '$.market_state': 'LA'
}

const mockStation = {
  id: 'WWNO-FM',
  band: 'FM',
  callsign: 'WWNO',
  geolocation: '180,-180',
  market_city: 'New Orleans',
  market_state: 'LA'
}

describe('Station', () => {
  let database
  let station

  beforeEach(() => {
    database = {
      client: {
        ft: { search: jest.fn() },
        json: { get: jest.fn() }
      }
    }

    station = new Station(database)
  })

  describe('#all', () => {
    beforeEach(() => {
      database.client.ft.search.mockResolvedValue({
        documents: [{
          value: mockDocument
        }]
      })
    })

    it('should resolve to a set of stations', () => {
      return expect(station.all()).resolves.toEqual([
        mockStation
      ])
    })
  })

  describe('#fetch', () => {
    beforeEach(() => {
      database.client.json.get.mockResolvedValue(mockStation)
    })

    it('should resolve to a single station', () => {
      return expect(station.fetch('WWNO-FM')).resolves.toEqual(mockStation)
    })
  })
})
