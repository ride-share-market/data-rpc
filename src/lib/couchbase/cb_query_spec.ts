'use strict';

import * as chai from 'chai';
let should: any = chai.should();

import * as fs from 'fs';
import * as path from 'path';

import * as sinon from 'sinon';
import * as Q from 'q';

import * as coMocha from 'co-mocha';
coMocha();

import {N1qlQuery} from 'couchbase';
import {config} from './../../conf/config';
import {bucket} from './../../conf/couchbase';
import {cbQuery} from './cb_query';

const bucketName: string = config.get('database').couchbase.bucket;

const query: any = N1qlQuery.fromString(`
select meta(${bucketName}).id as doc_id, meta(${bucketName}).cas, email, id from ${bucketName} WHERE type = "user"
`).consistency(N1qlQuery.Consistency.REQUEST_PLUS);

describe('lib', () => {

  describe('rpc', () => {

    describe('user', () => {

			describe('query', () => {

				afterEach(() => {
          // the typescipt definition for Q has no sinon restore method
          // set a variable pointer to Q.ninvoke to work around compiler warnings
          const ninvoke: any = Q.ninvoke;
          if (ninvoke.restore) {
            ninvoke.restore();
          }
        });

				it('should return a couchbase query', function* (): any {

					should.exist(cbQuery);

					// stub out ninvoke completely as the provided couchbase test mock does not support NICKEL queries.
					if (Number(process.env.COUCHBASE_MOCK)) {

						const n1qlRes: any = JSON.parse(fs.readFileSync(path.join(
							config.get('root'),
							'./../test/fixtures/couchbase/query_user_find_all.json'
						)).toString());

						sinon.stub(Q, 'ninvoke', () => {
							return Q.resolve(n1qlRes);
						});

					}

					const res: any = yield cbQuery(bucket, query);

					Array.isArray(res).should.be.true;
					Array.isArray(res[0]).should.be.true;

				});

				it('should handle couchbase query errors', function* (): any {

					sinon.stub(Q, 'ninvoke', () => {
						return Q.resolve('Not a valid couchbase query response object');
					});

					try {
						yield cbQuery(bucket, query);
					} catch (e) {
						e.message.should.match(/failed/i);
					}

				});

			});

		});

	});

});
