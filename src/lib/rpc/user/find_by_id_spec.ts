'use strict';

import * as chai from 'chai';
let should: any = chai.should();

import * as sinon from 'sinon';
import * as Q from 'q';

import * as fs from 'fs';
import * as path from 'path';

import * as coMocha from 'co-mocha';
coMocha();

import {config} from './../../../conf/config';
import {bucket} from './../../../conf/couchbase';

import {findById} from './find_by_id';

describe('lib', () => {

  describe('rpc', () => {

    describe('user', () => {

			describe('find_by_id', () => {

				afterEach(() => {
          // the typescipt definition for Q has no sinon restore method
          // set a variable pointer to Q.ninvoke to work around compiler warnings
          const ninvoke: any = Q.ninvoke;
          if (ninvoke.restore) {
            ninvoke.restore();
          }
        });

				it('should find a user by ID', function* (): any {

					should.exist(findById);

					// stub out ninvoke completely as the provided couchbase test mock does not support NICKEL queries.
					if (Number(process.env.COUCHBASE_MOCK)) {

						const n1qlRes: any = JSON.parse(fs.readFileSync(path.join(
							config.get('root'),
							'./../test/fixtures/couchbase/query_user_find_by_id.json'
						)).toString());

						sinon.stub(Q, 'ninvoke', () => {
							return Q.resolve(n1qlRes);
						});

					}

					let res: any = yield findById(bucket, 1002);

					res[0][0].id.should.equal(1002);
					res[0][0].email.should.equal('net@citizen.com');

				});

				it('should handle couchbase query errors', function* (): any {

					sinon.stub(Q, 'ninvoke', () => {
						return Q.resolve('Not a valid couchbase query response object');
					});

					try {
						yield findById(bucket, 1002);
					} catch (e) {
						e.message.should.match(/failed/i);
					}

				});

			});

		});

	});

});
