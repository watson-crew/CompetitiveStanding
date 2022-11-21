#!/bin/bash

OUTPUT_DIR=dist

npm run ts:transpile

cp package.json $OUTPUT_DIR

(cd $OUTPUT_DIR && npm install --production)

# # Due to TurboRepo complicaitons this actually happens in the root node_modules.
# # So copy the updated .primsa file from there...

mkdir -p $OUTPUT_DIR/node_modules

cp -R ../../node_modules/.prisma $OUTPUT_DIR/node_modules/
