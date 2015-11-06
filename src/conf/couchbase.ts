'use strict';

import * as couchbase from 'couchbase';

import {env} from './config';

// console.log(env);
// console.log(config);

let cluster: any;

let bucketName: string;

if (env === 'test') {
	cluster = new couchbase.Mock.Cluster();
	bucketName = 'rsm_test';
}
else {
	cluster = new couchbase.Cluster('couchbase://localhost');
	bucketName = 'rsm';
}

export const bucket: any = cluster.openBucket(bucketName);
