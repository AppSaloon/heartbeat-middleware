#!/bin/bash

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)" &&
  echo "Preparing to run heartbeat-middleware demo..." &&
  echo "Creating a heartbeat-middleware build" &&
  npm run build &&
  echo "Installing client-service dependencies..." &&
  cd "${DIR}/client-service/" &&
  npm ci &&
  echo "Installing proxy-service dependencies..." &&
  cd "${DIR}/proxy-service/" &&
  npm ci &&
  cd "${DIR}" &&
  echo "Running docker-compose..." &&
  docker-compose down &&
  docker-compose up -d &&
  echo "Demo is running. visit http://localhost:3000/status to view the heartbeat-middleware output."
