'use strict';

import * as chai from 'chai';
let should: any = chai.should();

import {validateJsonRpc} from './validate';

describe('lib', () => {

	describe('zschema', () => {

		describe('validate', () => {

			it('should reject non JSON test', (done: any) => {

				should.exist(validateJsonRpc);

				validateJsonRpc('Alice').catch(
					(err: any) => {
						err.message.should.match(/unable to json\.parse/i);
					})
					.then(done, done);

			});

			it('should reject non-valid JSON', (done: any) => {

				should.exist(validateJsonRpc);

				validateJsonRpc('{"id": 101}').catch(
					(err: any) => {
						err.name.should.match(/zschema validation error/i);
					})
					.then(done, done);

			});

			it('should accept valid a JSON RPC string', (done: any) => {

				let jsonRpcMessage: string = JSON.stringify({
					jsonrpc: '2.0',
					method: 'hello.world',
					params: {
						name: 'Alice'
					},
					id: 'babbe77c-29ed-4534-9a2a-67d1c39c17a0'
				});

				validateJsonRpc(jsonRpcMessage).then((res: any) => {
					res.should.match(/{"jsonrpc":"2.0".*/);
				})
					.then(done, done);

			});

		});

	});

});
