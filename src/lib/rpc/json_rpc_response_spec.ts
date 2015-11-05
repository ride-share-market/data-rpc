'use strict';

import * as chai from 'chai';
let should: any = chai.should();

import {jsonRpcResponse} from './json_rpc_response';

describe('lib', () => {

	describe('rpc', () => {

		describe('json_rpc_response', () => {

			let uniqueID: string = '2ad89637-0b0b-4ca0-bb8c-e8b71ad04227';

			let jsonRpcResponseId: any = jsonRpcResponse(uniqueID);

			it('should return json rpc result', () => {
				should.exist(jsonRpcResponse);

				let result: any = { result: 101 };

				jsonRpcResponseId(result)
					.should
					.equal('{"jsonrpc":"2.0","id":"2ad89637-0b0b-4ca0-bb8c-e8b71ad04227","result":101}');

			});

			it('should return a json-rpc error', () => {

				let err: any = { error: { code: -32601, message: 'Method not found' } };

				jsonRpcResponseId(err)
					.should
					.equal('{"jsonrpc":"2.0","id":"2ad89637-0b0b-4ca0-bb8c-e8b71ad04227","result":101,"error":' +
					'{"code":-32601,"message":"Method not found"}}');

			});

			it('should handle an invalid result object', () => {

				let fn: any = () => {
					jsonRpcResponseId({ key: 'value' });
				};

				fn.should.throw('Missing required result property: \'result\' or \'error\'');

			});

		});

	});

});
