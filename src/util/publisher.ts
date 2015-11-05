'use strict';

import * as amqpRpcFactory from 'amqp-rpc-factory';
import * as uuid from 'uuid';

import {config} from './../conf/config';

let rmq: any = config.get('messageQueue').rabbitmq;

let rmqConn: string = `amqp://${rmq.user}:${rmq.password}@${rmq.url}/${rmq.vhost}`;

let rpcPublisherFactory: PublisherFactory = amqpRpcFactory.publisher;

let publisher: Publisher = rpcPublisherFactory.create({
  standalone: true,
  url: rmqConn
});

let jsonRpcMessage: string = JSON.stringify({
  jsonrpc: '2.0',
  method: 'hello.world',
  params: {
    name: 'Alice'
  },
  id: uuid.v4()
});

publisher.publish(jsonRpcMessage).then(
  (res: any): any => {
    console.log('Success: ', res);
  }, (err: any) => {
    console.log('Error: ', err);
  });
