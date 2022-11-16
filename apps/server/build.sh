# !/bin/bash

echo "Building backend"

OUTPUT_DIR=dist

# Transpile TS to JS
echo "Transpiling Typescript"

npm run ts:transpile

# Add the relevant dependecies to the dist
echo "Adding dependencies to output"

cp package.json $OUTPUT_DIR

(cd $OUTPUT_DIR && npm install --production)

# Generate the relevant Prisma code
echo "Initialising Prisma client"
npm run prisma:generate

# Due to TurboRepo complicaitons this actually happens in the root node_modules.
# So copy the updated .primsa file from there...

cp -R ../../node_modules/.prisma $OUTPUT_DIR/node_modules

