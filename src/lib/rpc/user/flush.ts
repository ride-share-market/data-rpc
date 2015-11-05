'use strict';

import * as http from 'q-io/http';
import * as co from 'co';

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
