'use strict';

import * as Q from 'q';

export function userCreate(bucket: any, documentName: string, documentValue: any): Q.Promise<any> {

  return Q.ninvoke(bucket, 'insert', documentName, documentValue).then(function(res: any): any {

    if (!res.cas) {
      throw new Error('Bucket Insert Failed.');
    }

    return res;

  });

}
