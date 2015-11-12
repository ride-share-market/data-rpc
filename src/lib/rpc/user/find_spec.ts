'use strict';

import * as sinon from 'sinon';
import * as Q from 'q';

import * as coMocha from 'co-mocha';
coMocha();

import {bucket} from './../../../conf/couchbase';

import {findUser} from './find';

describe('lib', () => {

  describe('rpc', () => {

    describe('user', () => {

			describe('find', () => {

				afterEach(() => {
          // the typescipt definition for Q has no sinon restore method
          // set a variable pointer to Q.ninvoke to work around compiler warnings
          const ninvoke: any = Q.ninvoke;
          if (ninvoke.restore) {
            ninvoke.restore();
          }
        });

				it('should find a user', function* (): any {

					// stub out ninvoke completely as the provided couchbase test mock does not support NICKEL queries.
					if (Number(process.env.COUCHBASE_MOCK)) {

						const n1qlRes: any = [{
							cas: 1446888623049867300,
							doc_id: '15437566-6c1c-4ee9-a64b-4e62bf6b87d5',
							email: 'net@citizen.com',
							id: 1002
						}];

						sinon.stub(Q, 'ninvoke', () => {
							return Q.resolve(n1qlRes);
						});

					}

					let res: any = yield findUser(bucket);

					console.log('findUser:', res);

					// findUser(bucket)
					// 	.then((res: any) => {
					// 		console.log(201, res);
					// 	})
					// 	.catch((err: any) => {
					// 		console.log(301, err);
					// 	})
					// 	.then(done, done);

				});

			});

		});

	});

});
