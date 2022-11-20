#!/bin/bash

echo "Building backend"

OUTPUT_DIR=dist

# Transpile TS to JS
echo "Transpiling Typescript"

npm run ts:transpile

# Add the relevant dependecies to the dist
echo "Adding dependencies to output"

mkdir -p $OUTPUT_DIR/node_modules/database

# Azure functions don't play nice with turbo repo, we need to manually copy any generated dependencies ourselves...
cp -R ../../packages/database/dist/. $OUTPUT_DIR/node_modules/database

cp package.json $OUTPUT_DIR

(cd $OUTPUT_DIR && npm install --production)
