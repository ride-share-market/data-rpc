'use strict';

import * as Q from 'q';

const counterName: string = 'user_id_counter';

export function getNewUserId(bucket: any): Q.Promise<any> {

  return Q.ninvoke(bucket, 'counter', counterName, 1, {initial: 1000}).then(function(res: any): any {

    if (!res.cas) {
      throw new Error('getNewUserId() Failed: ' + JSON.stringify(res));
    }

    return res;

  });

}
