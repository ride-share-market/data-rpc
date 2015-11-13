'use strict';

import * as Q from 'q';

export function updateUser(bucket: any, userId: number, document: any): Q.Promise<any> {

  const documentId: string = `user_${userId}`;

  return Q.ninvoke(bucket, 'replace', documentId, document).then(function(res: any): any {

    if (!res.cas) {
      throw new Error('replace() Failed: ' + JSON.stringify(res));
    }

    return res;

  });

}
