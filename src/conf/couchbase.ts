'use strict';

import * as couchbase from 'couchbase';

import {config} from './config';
import {env} from './config';

// console.log(env);
// console.log(config);

let cluster: any;

const bucketName: string = config.get('database').couchbase.bucket;

let localBucket: any;

if (env === 'test') {

	cluster = new couchbase.Mock.Cluster();
	localBucket = cluster.openBucket(bucketName);

	if (!Number(process.env.COUCHBASE_MOCK)) {
		cluster = new couchbase.Cluster('couchbase://127.0.0.1');
		localBucket = cluster.openBucket(bucketName);
		localBucket.enableN1ql(['http://127.0.0.1:8093/']);
	}

}
else {
	cluster = new couchbase.Cluster('couchbase://127.0.0.1');
	localBucket = cluster.openBucket(bucketName);
	localBucket.enableN1ql(['http://127.0.0.1:8093/']);
}

export const bucket: any = localBucket;
