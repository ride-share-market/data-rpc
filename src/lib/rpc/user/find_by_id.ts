'use strict';

import * as co from 'co';
import {N1qlQuery} from 'couchbase';

import {cbQuery} from './../../couchbase/cb_query';
import {config} from './../../../conf/config';

const bucketName: string = config.get('database').couchbase.bucket;

export function findById(bucket: any, userId: number): Q.Promise<any> {

  const query: any = N1qlQuery.fromString(`
	SELECT id, email, currentProvider, providers FROM ${bucketName} WHERE meta(${bucketName}).id = 'user_${userId}''
	`).consistency(N1qlQuery.Consistency.REQUEST_PLUS);

  return co(function* (): any {
    try {

      return yield cbQuery(bucket, query);

    } catch (e) {

      throw e;

    }
  });

}
