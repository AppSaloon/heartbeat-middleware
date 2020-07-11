#!/bin/bash

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)" &&
  mkdir -p "${DIR}/../dist" &&
  rm -Rf "${DIR}/../dist/*" &&
  npx babel src -d "${DIR}/../dist" --config-file "${DIR}/.babelrc" &&
  cp package.json "${DIR}/../dist" &&
  cp README.md "${DIR}/../dist" &&
  cd "${DIR}/../dist" &&
  npm link
