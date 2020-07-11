#!/bin/bash

mkdir -p dist &&
rm -Rf dist/* &&
npx babel src -d dist &&
cp package*.json dist &&
cd dist &&
npm link