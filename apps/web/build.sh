#!/bin/bash

echo "Building frontend"

OUTPUT_DIR=dist

# Transpile TS to JS
echo "Running Next Build"

npm run next:build

cp .next $OUTPUT_DIR

# Add the relevant dependecies to the dist
echo "Adding dependencies to output"

mkdir -p $OUTPUT_DIR/node_modules/schema
mkdir -p $OUTPUT_DIR/node_modules/ui

# Azure functions don't play nice with turbo repo, we need to manually copy any generated dependencies ourselves...
cp -R ../../packages/database/dist/. $OUTPUT_DIR/node_modules/database

cp package.json $OUTPUT_DIR

(cd $OUTPUT_DIR && npm install --production)

mv $OUTPUT_DIR/node_modules/database/node_modules/*/ $OUTPUT_DIR/node_modules

mv $OUTPUT_DIR/node_modules/database/node_modules/.prisma $OUTPUT_DIR/node_modules/.prisma

npm run ts:resolve-alias