declare module "amqp-rpc-factory" {
	export var consumer: ConsumerFactory;
  export var publisher: PublisherFactory;
}

interface ConsumerFactory {
	create(options?: ConsumerFactoryOptions): Consumer;
}

interface ConsumerFactoryOptions {
		connectionRetryInterval?: number;
    url?: string;
    socketOptions?: any;
    queue?: string;
    queueOptions?: any;
    prefetch?: number;
    logInfo?: any;
    logError?: any;
    processMessage?: any;
}

interface Consumer {
	run(): void;
}

interface PublisherFactory {
  create(options?: PublisherFactoryOptions): Publisher;
}

interface PublisherFactoryOptions {
    replyTimeOutInterval?: number;
    url?: string;
    socketOptions?: any;
    queue?: string;
    queueOptions?: any;
    debugLevel?: number;
    standalone?: boolean;
    logInfo?: any;
    logError?: any;
}

interface Publisher {
  publish(text: string): any;
}
