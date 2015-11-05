'use strict';

import * as bunyan from 'bunyan';
import * as path from 'path';

const env: string = process.env.NODE_ENV = process.env.NODE_ENV || 'loc';

import {config} from './config';

export let create: any = function (name: string): any {

  let logFileName: string = `${name}_${env}.log`;

  let logger: any = bunyan.createLogger({
    name: name,
    streams: [
      {
        path: path.join(config.get('root'), config.get('logDir'), logFileName)
      }
    ]
  });

  return logger;

};
