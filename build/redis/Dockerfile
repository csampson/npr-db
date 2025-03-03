FROM redislabs/redisearch:2.8.8

SHELL ["/bin/bash", "-c"]

RUN mkdir /opt/db
WORKDIR /opt/db

COPY ./data/stations.redis stations.redis
COPY ./build/redis/run.sh run.sh

RUN [ "sh", "run.sh" ]
