/**
 * @overview Dump stations data from JSON -> Redis commands file
 */

'use strict';

const fs = require('fs');
const path = require('path');

const stationsFile = fs.readFileSync(path.join(__dirname, '../data/stations.json'));
const stations = JSON.parse(stationsFile.toString('utf8'));

const attrs = {
  band: '$.band AS band TEXT',
  callsign: '$.callsign AS callsign TEXT',
  frequency: '$.frequency AS frequency NUMERIC',
  geolocation: '$.geolocation AS geolocation GEO',
  id: '$.id AS id TEXT',
  market_city: '$.market_city AS market_city TEXT',
  market_state: '$.market_state AS market_state TEXT',
  name: '$.name AS name TEXT',
};

const schema = Object.values(attrs).join(' ');

function marshalSetCommand(station) {
  const transformed = Object.keys(attrs).reduce((prev, curr) => {
    let value = curr === 'geolocation'
      ? station[curr]?.join(',') || null
      : station[curr];

    return {
      ...prev,
      [curr]: value,
    }
  }, {});

  const stationJSON = JSON.stringify(transformed);

  return `
    JSON.SET ${station.id} $ '${stationJSON.replace("'", "\\'")}'
  `.trim();
}

function marshalCommands() {
  return [
    `FT.CREATE stations ON JSON SCHEMA ${schema}`
  ].concat(
    stations.map(marshalSetCommand)
  ).join('\n');
}

function writeCommands(commands) {
  fs.writeFileSync(path.join(__dirname, '../data/stations.redis'), commands);
}

function execute() {
  console.info(':: Marshaling Redis commands...');
  const commands = marshalCommands();

  console.info(':: Writing to `../data/stations.redis`...');
  writeCommands(commands);

  console.info(':: Done.');
}

try {
  execute();
} catch(error) {
  console.error('!! Failed to dump stations: ', error);
}
