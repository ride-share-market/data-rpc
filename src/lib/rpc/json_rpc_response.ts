'use strict';

export function jsonRpcResponse(id: string): any {

	let jsonRpcResponse: any = {
    jsonrpc: '2.0',
    id: id
  };

	return function(result: any): string {

		if (!result.result && !result.error) {
			throw new Error('Missing required result property: \'result\' or \'error\'');
    }

		let res: any = Object.assign(jsonRpcResponse, result);

		return JSON.stringify(res);

	};

}
