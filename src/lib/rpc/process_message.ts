'use strict';

import * as Q from 'q';
import * as co from 'co';

import {validateJsonRpc} from './../zschema/validate';
import {jsonRpcResponse} from './json_rpc_response';

import {greeting} from './hello/world';

const rpcMethodTable: any = {
	'hello.world': greeting
};

const ErrorRpcMethodNotFound: any = {
	error: {
		code: -32601,
		message: 'Method not found'
	}
};

export function processMessage(amqpMessage: any): Q.Promise<any> {

	return co(function* (): any {

		// validate the input amqp message content is a valid json rpc message format
		let jsonRpcMessage: string = yield validateJsonRpc(amqpMessage.content.toString());

		// parse the json string and build the jsonrpc response object to be used for success/failure next.
		let jsonRpc: any = JSON.parse(jsonRpcMessage);

		let jsonRpcResponseObj: any = jsonRpcResponse(jsonRpc.id);

		try {

			// check the RPC Method is available
			if (!rpcMethodTable[jsonRpc.method]) {
				throw ErrorRpcMethodNotFound;
			}

			// process rpc request
			let response: any = yield greeting(jsonRpcMessage);

			return jsonRpcResponseObj({ result: response });

		} catch (err) {
			return jsonRpcResponseObj({ error: err });
		}

	})
		.catch((err: any) => {
			return Q.reject(err);
		});

}
