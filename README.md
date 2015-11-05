## Node JSON-RPC Server

A node application that consumes JSON-RPC from a RabbitMQ queue and returns JSON-RPC.

## Development Dependencies

- Gulp
- npm install -g gulp

## Install

1. `git clone https://github.com/rudijs/node-jsonrpc-server.git`
2. `cd data-rpc`
3. `npm install`
4. `gulp compile && mkdir -vp dist/log dist/pids`
5. `npm run start`
6. `node ./dist/util/publisher.js`

## Development Tasks

Issue the `gulp` command to list all available tasks.

Clean and compile:

	gulp compile && mkdir -vp dist/log dist/pids

Watch *.ts files, lint them and compile to the dist/ folder

	gulp watch-compile

Run all unit tests (the compiled *_spec.js files in the dist/ folder)

	gulp test

Watch for compiled *.js file changes and run tests

	gulp watch-test

## Run application

**Manually**

	node dist/app.js

**With PM2 Process Manager**

	npm run start
	npm run stop
	npm run list

## Test application

Start the RPC app manually or with PM2 then issue the command:

	node dist/util/publisher.js

## Typescript Definitions

**Search examples**

	./node_modules/.bin/tsd query nconf

**Install examples**

	./node_modules/tsd/build/cli.js query node --save --action install
