'use strict';

import * as chai from 'chai';
let should: any = chai.should();

import * as coMocha from 'co-mocha';
coMocha();

import * as fs from 'fs';
import * as path from 'path';

import * as sinon from 'sinon';
import * as Q from 'q';

import {config} from './../../../conf/config';
import {bucket} from './../../../conf/couchbase';

import {userCreate} from './create';
import {updateUser} from './update';
import {findById} from './find_by_id';

const newUserFixture: any = JSON.parse(fs.readFileSync(path.join(
  config.get('root'),
  './../test/fixtures/new-user-google.json'
)).toString());

describe('lib', () => {

  describe('rpc', () => {

    describe('user', () => {

			describe('update', () => {

				let restoreStub: any = null;

				afterEach(() => {
          // the typescipt definition for Q has no sinon restore method
          // set a variable pointer to Q.ninvoke to work around compiler warnings
          const ninvoke: any = Q.ninvoke;
          if (ninvoke.restore) {
            ninvoke.restore();
          }
          if (restoreStub) {
            Q.ninvoke = restoreStub;
          }
        });

				it('should update an existing user', function* (): any {

					should.exist(updateUser);

					// stub out ninvoke completely as the provided couchbase test mock does not support N1QL queries.
					if (Number(process.env.COUCHBASE_MOCK)) {

						let stub: Sinon.SinonStub = sinon.stub();
						// create
						stub.onCall(0).returns(Q.resolve({ cas: 'cas', value: 'new_user_id' }));
						stub.onCall(1).returns(Q.resolve({ cas: 'cas', value: 'new_user_obj' }));
						// update
						stub.onCall(2).returns(Q.resolve({ cas: { '0': 3085434880, '1': 1662465098 } }));
						// find by ID (N1QL query)
						stub.onCall(3).returns(Q.resolve([
							[
								{providers: {
									google: {
										displayName: 'Web Citizen'
									}
								}}
							]
						]));
						restoreStub = Q.ninvoke;
						Q.ninvoke = stub;
					}

					// create a new user to work with
					let newUser: any = yield userCreate(bucket, newUserFixture);

					newUser.providers.google.displayName.should.equal('Net Citizen');

					// update user data
					newUser.providers.google.displayName = 'Web Citizen';

					// save updated user data to database
					yield updateUser(bucket, newUser.id, newUser);

					// find user by id and check database update operation
					let res: any = yield findById(bucket, newUser.id);

					res[0][0].providers.google.displayName.should.equal('Web Citizen');

				});

				it('should handle database errors', function* (): any {

					sinon.stub(Q, 'ninvoke', () => {
						return Q.resolve('Not a valid couchbase replace operation response object');
					});

					try {
						yield updateUser(bucket, 1001, {id: 1001});
          } catch (e) {
            e.message.should.match(/failed/i);
          }

        });

			});

		});

	});

});
