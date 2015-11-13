'use strict';

// import * as Q from 'q';
import * as co from 'co';
import {N1qlQuery} from 'couchbase';

import {cbQuery} from './../../couchbase/cb_query';
import {config} from './../../../conf/config';
// import {bucket} from './../../../conf/couchbase';

const bucketName: string = config.get('database').couchbase.bucket;

const query: any = N1qlQuery.fromString(`
select meta(${bucketName}).id as doc_id, meta(${bucketName}).cas, email, id from ${bucketName} WHERE type = "user"
`).consistency(N1qlQuery.Consistency.REQUEST_PLUS);

export function findUser(bucket: any): Q.Promise<any> {

  // return Q.ninvoke(bucket, 'query', query).then(function(res: any): any {

  //   if (!Array.isArray(res)) {
  //     throw new Error('findUser() Failed: ' + JSON.stringify(res));
  //   }

  //   return res;



  // });
  return co(function* (): any {
    try {

      return yield cbQuery(bucket, query);

    } catch (e) {

      throw e;

    }
  });



}
