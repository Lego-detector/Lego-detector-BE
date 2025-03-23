import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import * as amqp from 'amqplib';

import { ErrorException } from 'src/common/exceptions';
import { CODES, EVENT, QUEUE_NAME } from 'src/shared';

import { RabbitMqService } from '../rabbit-mq/rabbit-mq.service';

@Injectable()
export class InferenceEventConsumerService implements OnModuleInit {
  private channel: amqp.Channel;

  constructor(
    private readonly rabbitMqService: RabbitMqService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async onModuleInit() {
    this.channel = this.rabbitMqService.getChannel();

    await this.channel.assertQueue(QUEUE_NAME.INFERENCE_RESPONSE, { durable: true });

    this.channel.consume(QUEUE_NAME.INFERENCE_RESPONSE, async msg => {
      if (msg) {
        this.eventEmitter.emit(EVENT.INFERENCE_SESSION.DONE, msg);
      }
    });
  }

  async ack(msg: amqp.ConsumeMessage) {
    if (this.channel) {
      await this.channel.ack(msg);
    } else {
      throw new ErrorException(CODES.MQ_UNAVAILABLE);
    }
  }
}
