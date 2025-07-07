import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as amqp from 'amqplib';

import { ENV } from '../../../config';
import { QUEUE_NAME } from '../../../shared';


@Injectable()
export class RabbitMqService implements OnModuleInit, OnModuleDestroy {
  private readonly logger: Logger = new Logger(RabbitMqService.name);
  private channel: amqp.Channel;
  private connection: amqp.ChannelModel;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const connectionString = this.configService.get<string>(ENV.MQ_URI);

    this.connection = await amqp.connect(connectionString);

    await this.setupChannel();
  }

  private async setupChannel() {
    this.channel = await this.connection.createChannel();

    // this.channel.on('closed', () => {
    //   setTimeout(async () => {await this.setupChannel()}, 5000)
    // } );

    await Promise.all([
      this.channel.assertQueue(QUEUE_NAME.INFERENCE_RESPONSE, { durable: true }),
      this.channel.assertQueue(QUEUE_NAME.INFERENCE_SESSION, { durable: true }),
    ]);
  }

  getChannel(): amqp.Channel {
    return this.channel;
  }

  async sendMessage(queueName: string, msg: string) {
    this.channel.sendToQueue(queueName, Buffer.from(msg), { persistent: true });
  }

  async close(): Promise<void> {
    try {
      await this.channel.close();
    } finally {
      console.log('hi');
    }

    try {
      await this.connection.close();
    } finally {
      console.log('hi');
    }
  }

  async onModuleDestroy() {
    await this.close();
  }
}
