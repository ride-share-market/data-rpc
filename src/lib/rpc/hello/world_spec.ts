'use strict';

import * as chai from 'chai';
let should: any = chai.should();
import * as uuid from 'uuid';

import {greeting} from './world';

describe('lib', () => {

	describe('rpc', () => {

		describe('hello', () => {

			describe('world', () => {

				it('should return text', (done: any) => {
					should.exist(greeting);

					let rpcMessage: any = {
						content: JSON.stringify({
							jsonrpc: '2.0',
							method: 'hello.world',
							params: {
								name: 'Alice'
							},
							id: uuid.v4()
						})
					};

					greeting(rpcMessage).then((res: any) => {
						res.should.equal('Hello Alice');
					})
						.then(done, done);

				});

			});

		});

	});

});
