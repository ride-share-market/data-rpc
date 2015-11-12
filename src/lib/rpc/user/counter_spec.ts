'use strict';

import * as chai from 'chai';
let should: any = chai.should();

import * as coMocha from 'co-mocha';
coMocha();

import * as sinon from 'sinon';
import * as Q from 'q';

// import * as couchbase from 'couchbase';
// let cluster: any = new couchbase.Cluster('couchbase://localhost');
// let bucket: any = cluster.openBucket('rsm');
// import {flushBucket} from './flush';
import {bucket} from './../../../conf/couchbase';

import {getNewUserId} from './counter';

describe('lib', () => {

  describe('rpc', () => {

    describe('user', () => {

			afterEach(() => {
				// the typescipt definition for Q has no sinon restore method
				// set a variable pointer to Q.ninvoke to work around compiler warnings
				const ninvoke: any = Q.ninvoke;
				if (ninvoke.restore) {
					ninvoke.restore();
				}
			});

			describe('counter', () => {

				it('should create a sequential user id number', function* (): any {

					const userId1: any = yield getNewUserId(bucket);

					should.exist(userId1.cas);
					userId1.value.should.be.at.least(1000);

					const userId2: any = yield getNewUserId(bucket);

					const userIdDiff: number = userId2.value - userId1.value;

					should.exist(userId2.cas);
					userIdDiff.should.equal(1);

				});

				it('should handle database errors', function* (): any {

					sinon.stub(Q, 'ninvoke', () => {
						return Q.resolve({ missing: 'cas' });
					});

					try {
						yield getNewUserId(bucket);
					} catch (e) {
						e.message.should.match(/failed/i);
					}

				});

			});

    });

  });

});
