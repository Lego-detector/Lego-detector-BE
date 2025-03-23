import { Injectable, OnModuleInit } from '@nestjs/common';

import * as amqp from 'amqplib';

import { IJobEvent, QUEUE_NAME } from 'src/shared';

import { RabbitMqService } from '../rabbit-mq/rabbit-mq.service';

@Injectable()
export class InferenceEventProducerService implements OnModuleInit {
  private channel: amqp.Channel;

  constructor(private readonly rabbitMqService: RabbitMqService) {}

  async onModuleInit() {
    this.channel = this.rabbitMqService.getChannel();

    await this.channel.assertQueue(QUEUE_NAME.INFERENCE_SESSION, { durable: true });
  }

  async produce(job: IJobEvent) {
    const resource = Buffer.from(JSON.stringify(job));

    await this.channel.assertQueue(QUEUE_NAME.INFERENCE_SESSION, { durable: true });

    await this.channel.sendToQueue(QUEUE_NAME.INFERENCE_SESSION, resource, { persistent: true });
  }
}
