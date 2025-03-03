#!/bin/bash

# Start Redis server (daemon)
redis-server --daemonize yes \
  --loadmodule /usr/lib/redis/modules/redisearch.so \
  --loadmodule /usr/lib/redis/modules/rejson.so

# Wait for Redis server to be ready
until redis-cli ping > /dev/null 2>&1; do
  echo "Waiting for Redis to start..."
  sleep 1
done

# Load data
redis-cli < stations.redis
redis-cli save
redis-cli shutdown
