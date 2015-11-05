'use strict';

import * as amqpRpcFactory from 'amqp-rpc-factory';

import {config} from './conf/config';
import * as log from './conf/log';
import {processMessage} from './lib/rpc/process_message';

let logger: any = log.create('app');

let rpcConsumerFactory: ConsumerFactory = amqpRpcFactory.consumer;

let rmq: any = config.get('messageQueue').rabbitmq;

let rmqConn: string = `amqp://${rmq.user}:${rmq.password}@${rmq.url}/${rmq.vhost}`;

let consumer: Consumer = rpcConsumerFactory.create({

  url: rmqConn,

  logInfo: function(msg: any): void {
    logger.info(msg);
  },

  logError: function(msg: any): void {
    logger.error(msg);
  },

  processMessage: processMessage

});

consumer.run();
