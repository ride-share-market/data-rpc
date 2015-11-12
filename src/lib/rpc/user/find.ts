'use strict';

import * as Q from 'q';
import {N1qlQuery} from 'couchbase';

import {config} from './../../../conf/config';

const bucketName: string = config.get('database').couchbase.bucket;

const query: any = N1qlQuery.fromString(`
select meta(${bucketName}).id as doc_id, meta(${bucketName}).cas, email, id from ${bucketName} WHERE type = "user"
`).consistency(N1qlQuery.Consistency.REQUEST_PLUS);

export function findUser(bucket: any): Q.Promise<any> {

  return Q.ninvoke(bucket, 'query', query).then(function(res: any): any {

    if (!Array.isArray(res)) {
      throw new Error('findUser() Failed: ' + JSON.stringify(res));
    }

    return res;

  });

}
