'use strict';

import * as nconf from 'nconf';
import * as path from 'path';

const env: string = process.env.NODE_ENV = process.env.NODE_ENV || 'loc';

nconf
	.argv()
	.env()
	.file({file: path.join(__dirname, 'env', `${env}.json`)});

nconf.defaults({
	root: path.normalize(path.join(__dirname, './..')),
	logDir: 'log'
});

export const config: any = nconf;
