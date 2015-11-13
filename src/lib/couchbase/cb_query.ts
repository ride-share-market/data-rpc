'use strict';

import * as Q from 'q';

export function cbQuery(bucket: any, query: any): Q.Promise<any> {

  return Q.ninvoke(bucket, 'query', query).then(function(res: any): any {

    if (!Array.isArray(res)) {
      throw new Error('cbQuery() Failed: ' + JSON.stringify(res));
    }

    return res;

  });

}
