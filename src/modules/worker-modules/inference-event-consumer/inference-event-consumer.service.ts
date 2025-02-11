import { Injectable, OnModuleInit } from '@nestjs/common';

import * as amqp from 'amqplib';

import { QUEUE_NAME } from 'src/shared';

import { RabbitMqService } from '../rabbit-mq/rabbit-mq.service';

@Injectable()
export class InferenceEventConsumerService implements OnModuleInit {
  constructor(private readonly rabbitMqService: RabbitMqService) {}

  async onModuleInit() {
    const channel: amqp.Channel = this.rabbitMqService.getChannel();

    await channel.assertQueue(QUEUE_NAME.INFERENCE_RESPONSE, { durable: true });

    channel.consume(QUEUE_NAME.INFERENCE_RESPONSE, async msg => {
      if (msg) {
        console.log(msg.content.toString());
        channel.ack(msg);
      }
    });
  }
}
