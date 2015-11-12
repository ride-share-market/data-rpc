'use strict';

import * as Q from 'q';
import * as co from 'co';

import {getNewUserId} from './counter';

function buildNewUser(newUserId: number, oauthProviderUserProfile: any): any {

  let o: any = oauthProviderUserProfile;

  let newUser: any = {
    type: 'user',
    id: newUserId,
    email: o.email,
    currentProvider: o.provider,
    providers: {}
  };

  newUser.providers[o.provider] = o.profile;

  return newUser;

}

function insertUser(bucket: any, documentName: string, documentValue: any): Q.Promise<any> {

  return Q.ninvoke(bucket, 'insert', documentName, documentValue).then(function(res: any): any {

    if (!res.cas) {
      throw new Error('insertUser() Failed: ' + JSON.stringify(res));
    }

    return res;

  });

}

export function userCreate(bucket: any, documentName: string, documentValue: any): Q.Promise<any> {

  return co(function* (): any {
    try {

      const newUserId: any = yield getNewUserId(bucket);

      const newUser: any = buildNewUser(newUserId.value, documentValue);

      const doc_id: string = `user_${newUserId.value}`;

      return yield insertUser(bucket, doc_id, newUser);

    } catch (e) {
      throw e;
    }
  });

}
