# npr-db

An API for querying data [NPR](http://npr.org) member station data.

## Stack

- Node.js v22 (Fastify)
- Redis v6 (RediSearch, ReJSON)

## Endpoints

> `GET` /stations - List all stations
```json
[
  {
    "id": "KVNC-FM",
    "band": "FM",
    "callsign": "KVNC",
    "frequency": "90.9",
    "market_city": "Minturn",
    "market_state": "CO"
  },
  {
    "id": "WURI-FM",
    "band": "FM",
    "callsign": "WURI",
    "frequency": "90.9",
    "geolocation": "-79.01255379999999,35.8999488",
    "market_city": "Manteo",
    "market_state": "NC"
  }
]
```

> `GET` /stations/:id - Fetch details for a specific station by id (e.g. WWNO-FM)
```json
{
  "address": "University of New Orleans 2000 Lakeshore Drive New Orleans LA 70148",
  "band": "FM",
  "callsign": "WWNO",
  "fax": 5042806061,
  "frequency": 89.9,
  "geolocation": "-90.0660365,30.0285959",
  "id": "WWNO-FM",
  "logo": "https://media.npr.org/images/stations/logos/wwno_fm.gif",
  "market_city": "New Orleans",
  "market_state": "LA",
  "name": "WWNO - New Orleans Public Radio",
  "phone": 5042807000,
  "tagline": "NPR news, music and culture for New Orleans and Southeast Louisiana.",
  "links": {
    "brand": [
      {
        "rel": "homepage",
        "href": "http://wwno.org",
        "content_type": "text/html"
      },
      {
        "rel": "logo",
        "href": "https://media.npr.org/images/stations/nprone_logos/wwno_fm.png",
        "content_type": "image/png"
      },
      {
        "rel": "small-logo",
        "href": "https://media.npr.org/images/stations/logos/wwno_fm.gif",
        "content_type": "image/gif"
      },
      {
        "rel": "square-logo",
        "href": "https://media.npr.org/images/stations/nprone_logos/wwno_fm_sq.png",
        "content_type": "image/png"
      },
      {
        "rel": "hello-id-audio",
        "href": "https://ondemand.npr.org/npr-mp4/stationid/711.mp4",
        "content_type": "audio/aac"
      },
      {
        "rel": "facebook",
        "href": "https://www.facebook.com/899wwno",
        "content_type": "text/html"
      },
      {
        "rel": "twitter",
        "href": "http://twitter.com/wwno",
        "content_type": "text/html"
      }
    ],
    "donation": [
      {
        "href": "https://wwno.secureallegiance.com/wwno/WebModule/Donate.aspx?P=WEBNPR&PAGETYPE=PLG&CHECK=0XXz7vbVFVxEIkmdxt0MhRiCxtaFReuS",
        "title": "Support WWNO",
        "type_name": "pledge_page"
      },
      {
        "href": "https://ondemand.npr.org/npr-mp4/donation/711_f3b9ec7a316accedafb5982512d96a4b.mp4",
        "title": "MEMBERSHIP EG #54 899",
        "type_name": "station_pledge_audio"
      }
    ],
    "podcasts": [
      {
        "href": "https://wwno.drupal.publicbroadcasting.net/podcasts/88432/rss.xml",
        "title": "TriPod: New Orleans at 300",
        "type_name": "podcast"
      },
      {
        "href": "https://wwno.drupal.publicbroadcasting.net/podcasts/6095/rss.xml",
        "title": "Where Y'Eat",
        "type_name": "podcast"
      },
      {
        "href": "https://wwno.drupal.publicbroadcasting.net/podcasts/14246/rss.xml",
        "title": "Out to Lunch",
        "type_name": "podcast"
      },
      {
        "href": "https://www.omnycontent.com/d/playlist/8647406c-3cbf-4408-b64a-ac7d010d8c59/c7308012-d787-4b38-b5ab-accd015dc938/f1cd8481-1a71-4a5d-9f38-accd015eb8c5/podcast.rss",
        "title": "Louisiana Considered",
        "type_name": "podcast"
      },
      {
        "href": "https://feeds.feedburner.com/wwnobanned",
        "title": "Banned",
        "type_name": "podcast"
      },
      {
        "href": "https://feeds.podtrac.com/4S-hYvoS7-rh",
        "title": "WWNO's Le Show",
        "type_name": "podcast"
      },
      {
        "href": "https://wwno.drupal.publicbroadcasting.net/podcasts/6099/rss.xml",
        "title": "Inside The Arts",
        "type_name": "podcast"
      },
      {
        "href": "https://wwno.drupal.publicbroadcasting.net/podcasts/6101/rss.xml",
        "title": "Community Impact",
        "type_name": "podcast"
      },
      {
        "href": "https://wwno.drupal.publicbroadcasting.net/podcasts/3524/rss.xml",
        "title": "Louisiana Eats!",
        "type_name": "podcast"
      },
      {
        "href": "https://wwno.drupal.publicbroadcasting.net/podcasts/3573/rss.xml",
        "title": "All  Things New Orleans",
        "type_name": "podcast"
      },
      {
        "href": "https://wwno.drupal.publicbroadcasting.net/podcasts/6094/rss.xml",
        "title": "WWNO: Latest News",
        "type_name": "podcast"
      },
      {
        "href": "https://wwno.drupal.publicbroadcasting.net/podcasts/3557/rss.xml",
        "title": "The Reading Life",
        "type_name": "podcast"
      },
      {
        "href": "https://feeds.feedburner.com/liferaftpod",
        "title": "Life Raft",
        "type_name": "podcast"
      },
      {
        "href": "https://wwno.drupal.publicbroadcasting.net/podcasts/7089/rss.xml",
        "title": "Notes From New Orleans",
        "type_name": "podcast"
      },
      {
        "href": "https://wwno.drupal.publicbroadcasting.net/podcasts/151142/rss.xml",
        "title": "Sticky Wicket",
        "type_name": "podcast"
      }
    ],
    "streams": [
      {
        "href": "https://tektite.streamguys1.com:5145/wwnojazz",
        "is_primary_stream": false,
        "title": "Jazz WWNO: Jazz Music From New Orleans",
        "type_name": "audio_mp_3_stream"
      },
      {
        "href": "https://tektite.streamguys1.com:5145/wwnolive",
        "is_primary_stream": true,
        "title": "WWNO 89.9 FM | News, Culture & Music",
        "type_name": "audio_mp_3_stream"
      },
      {
        "href": "https://tektite.streamguys1.com:5145/wwnoclassical",
        "is_primary_stream": false,
        "title": "Classical 104.9",
        "type_name": "audio_mp_3_stream"
      }
    ]
  }
}
```

## Development

- Build locally with `docker-compose build`
- Run locally with `docker-compose up`

This will build the images for the API and database and make the application available at http://localhost:3000

## Testing

Use `yarn test` to run unit tests.
