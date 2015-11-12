## Node JSON-RPC Server

A node application that consumes JSON-RPC from a RabbitMQ queue and returns JSON-RPC.

## Dependencies

- RabbitMQ
- Couchbase

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

Watch *.ts files, lint them and compile to the dist/ folder then test using the Node.js Couchbase SDK provided Mock.

	gulp watch-compile

Run all unit tests (the compiled *_spec.js files in the dist/ folder) using the Node.js Couchbase SDK provided Mock.

	gulp test

Run all unit tests with a live instance of Couchbase Server v4

	gulp test --no-couchbase-mock

Watch for compiled *.js file changes and run tests

	gulp watch-test

Test

## Run application with RabbitMQ

**Manually**

	node dist/app.js

**With PM2 Process Manager**

	npm run start
	npm run stop
	npm run list

## Test application

Start the RPC app manually or with PM2 then issue the command:

	node dist/util/publisher.js

## Couchbase Docker Setup

	sudo docker run -d --name couchbase -p 8091:8091 -p 8093:8093 -p 11210:11210 -p 11212:11212 couchbase:community-4.0.0

## Typescript Definitions

**Search examples**

	./node_modules/.bin/tsd query nconf

**Install examples**

	./node_modules/tsd/build/cli.js query node --save --action install
