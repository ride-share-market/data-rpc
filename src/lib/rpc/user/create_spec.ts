'use strict';

import * as chai from 'chai';
let should: any = chai.should();

import * as fs from 'fs';
import * as path from 'path';

import * as sinon from 'sinon';
import * as Q from 'q';

import * as coMocha from 'co-mocha';
coMocha();

import {config} from './../../../conf/config';
import {bucket} from './../../../conf/couchbase';

import {userCreate} from './create';

const newUserFixture: any = JSON.parse(fs.readFileSync(path.join(
  config.get('root'),
  './../test/fixtures/new-user-google.json'
)).toString());

describe('lib', () => {

  describe('rpc', () => {

    describe('user', () => {

      describe('create', () => {

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

        it('should create a new user', function* (): any {

          let newUser: any = yield userCreate(bucket, 'document_name', newUserFixture);

          // console.log(newUser);
          should.exist(newUser.cas);

        });

        it('should handle database errors', function* (): any {

          // set Q.invoke to a sinon stub in a round about way so
          // that the typescript typings don't complain about
          // a sinon stub method on a Q promise
          let stub: Sinon.SinonStub = sinon.stub();
          stub.onCall(0).returns(Q.resolve({ cas: 'cas', value: 102 }));
          stub.onCall(1).returns(Q.resolve({ missing: 'cas' }));
          restoreStub = Q.ninvoke;
          Q.ninvoke = stub;

          try {
            yield userCreate(bucket, 'document_name', newUserFixture);
          } catch (e) {
            e.message.should.match(/failed/i);
          }

        });

      });

    });

  });

});
