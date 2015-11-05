'use strict';

import * as Q from 'q';

export function greeting(msg: any): Q.Promise<any> {

	let jsonRpc: any;

	try {
		let jsonRpcMessage: string;

		if (msg.content) {
			jsonRpcMessage = msg.content.toString();
		}
		else {
			jsonRpcMessage = msg;
		}

		jsonRpc = JSON.parse(jsonRpcMessage);

	} catch (e) {
		return Q.reject(Error(`JSON Parse Error: ${e}`));
	}

	return Q.resolve(`Hello ${jsonRpc.params.name}`);

};
