'use strict';

import * as chai from 'chai';
let should: any = chai.should();

import {processMessage} from './process_message';

describe('lib', () => {

	describe('rpc', () => {

		describe.only('process_message', () => {

			let amqpMessageContent: any = {
				jsonrpc: '2.0',
				method: 'hello.world',
				params: {
					name: 'Alice'
				},
				id: '2ad89637-0b0b-4ca0-bb8c-e8b71ad04227'
			};

			it('should return jsonrpc', (done: any) => {

				should.exist(processMessage);

				let amqpMessage: any = {
					content: JSON.stringify(amqpMessageContent)
				};

				processMessage(amqpMessage).then((res: string) => {
					res.should.equal('{"jsonrpc":"2.0","id":"2ad89637-0b0b-4ca0-bb8c-e8b71ad04227","result":"Hello Alice"}');
				})
					.then(done, done);

			});

			it('should handle errors', (done: any) => {

				let amqpMessage: any = { content: 'Bad Text' };

				processMessage(amqpMessage).catch((err: any) => {
					err.should.match(/unable\ to\ json\.parse/i);
				})
					.then(done, done);

			});

			it('should handle rpc method missing', (done: any) => {

				amqpMessageContent.method = 'method.missing';

				let amqpMessage: any = {
					content: JSON.stringify(amqpMessageContent)
				};

				processMessage(amqpMessage).then((res: string) => {
					res.should.equal('{"jsonrpc":"2.0","id":"2ad89637-0b0b-4ca0-bb8c-e8b71ad04227","error":' +
					'{"error":{"code":-32601,"message":"Method not found"}}}');
				})
					.then(done, done);

			});

		});

	});

});
