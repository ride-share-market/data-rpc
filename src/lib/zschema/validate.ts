'use strict';

import * as fs from 'fs';
import * as path from 'path';
import * as Q from 'q';
import * as ZSchema from 'z-schema';

export function validateJsonRpc(json: string): Q.Promise<any> {

	let jsonRpc: string;

	try {
		jsonRpc = JSON.parse(json);
	} catch (e) {
		return Q.reject(Error(`Unable to JSON.parse: ${json}`));
	}

	let jsonRpcSchema: any;

	try {
		jsonRpcSchema = JSON.parse(fs.readFileSync(path.join(__dirname, 'schemas', 'json_rpc.json')).toString());
	} catch (e) {
		return Q.reject(Error('Unable to read and/or parse JSON RPC zSchema'));
	}

	let validator: Validator = new ZSchema();

	try {
		if (!validator.validateSchema(jsonRpcSchema)) {
			throw 'Non valid JSON RPC zSchema';
		}
	} catch (e) {
		return Q.reject(Error(e));
	}

	validator.validate(jsonRpc, jsonRpcSchema[0]);

	let validatorErrors: any = validator.getLastErrors();

	if (!validator.getLastErrors()) {
		return Q.resolve(json);
	}
	else {
		let err: any = Error(JSON.stringify(validatorErrors));
		err.name = 'ZSchema Validation Error';
		return Q.reject(err);
	}

};
