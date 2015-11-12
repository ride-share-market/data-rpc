'use strict';

import * as http from 'q-io/http';
import * as co from 'co';

/*
Usage:

flush (empty) the couchbase bucket
before((done: any) => {

	flushBucket().then((res: any) => {
		// console.log('Flush Couchbase Bucket');
	})
		.catch((err: any) => {
			console.log('Error Flushing Couchbase Bucket:', err);
		})
		.then(done, done);

});

*/

export function flushBucket(): Q.Promise<any> {

	const request: QioHTTP.Request = {
		url: 'http://localhost:8091/pools/default/buckets/rsm/controller/doFlush',
		method: 'POST'
	};

	return co(function* (): any {

		const resBodyStream: any = yield http.request(request);

		return yield resBodyStream.body.read();

	}).catch((e: any) => {
		throw e.message;
	});

}
