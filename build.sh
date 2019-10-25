#!/bin/bash

(rm -R dist || true)
mkdir dist
cp src/* ./dist
cp ./package*.json ./dist
cp README.md ./dist
cd dist
npm link