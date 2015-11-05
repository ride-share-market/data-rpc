'use strict';

import * as chai from 'chai';
let should: any = chai.should();

import {userCreate} from './create';
import {flushBucket} from './flush';

import * as couchbase from 'couchbase';
let cluster: any = new couchbase.Cluster('couchbase://localhost');
let bucket: any = cluster.openBucket('rsm');

describe('lib', () => {

  describe('rpc', () => {

    describe('user', () => {

      // flush (empty) the couchbase bucket
      before((done: any) => {

        flushBucket().then((res: any) => {
          // console.log('Flush Couchbase Bucket');
        })
          .catch((err: any) => {
            console.log('Error Flushing Couchbase Bucket:', err);
          })
          .then(done, done);

      });


      it('should create a new user', (done: any) => {

        userCreate(bucket, 'document_name', { some: 'user1' })
          .then(function(res: any): any {
            should.exist(res.cas);
            // console.log('Create User:', res.cas);
          })
          .then(done, done);

      });

    });

  });

});
