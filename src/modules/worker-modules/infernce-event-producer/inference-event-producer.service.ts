import { ChildProcess } from 'child_process';

import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as amqp from 'amqplib';

import { IJobEvent, QUEUE_NAME } from 'src/shared';

import { RabbitMqService } from '../rabbit-mq/rabbit-mq.service';

@Injectable()
export class InferenceEventProducerService implements OnModuleInit {
  private channel: amqp.Channel;
  private worker: ChildProcess;

  constructor(
    private readonly rabbitMqService: RabbitMqService,
    private readonly configServiec: ConfigService,
  ) {}

  async onModuleInit() {
    this.channel = this.rabbitMqService.getChannel();

    await this.channel.assertQueue(QUEUE_NAME.INFERENCE_SESSION, { durable: true });
  }

  async produce(job: IJobEvent) {
    const resource = Buffer.from(JSON.stringify(job));

    await this.channel.assertQueue(QUEUE_NAME.INFERENCE_SESSION, { durable: true });

    await this.channel.sendToQueue(QUEUE_NAME.INFERENCE_SESSION, resource, { persistent: true });
  }

  // private initWorker() {
  //   return fork(
  //     path.resolve(__dirname, './worker'),
  //     {
  //       env: {
  //         MQ_URI: this.configServiec.get<string>(ENV.MQ_URI),
  //         queueName: QUEUE_NAME.INFERENCE_SESSION
  //       }
  //     }
  //   );
  // }
}
