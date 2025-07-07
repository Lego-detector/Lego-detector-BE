import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import * as amqp from 'amqplib';

import { EVENT, IInferenceResponseEvent } from '../../../shared';
import { DetectorService } from '../../detector/services';

import { InferenceEventConsumerService } from './inference-event-consumer.service';

@Injectable()
export class InferenceEventConsumerListener {
  constructor(
    private readonly inferenceEventConsumerService: InferenceEventConsumerService,
    private readonly detectorService: DetectorService,
  ) {}

  @OnEvent(EVENT.INFERENCE_SESSION.DONE, { async: true })
  async pushInferenceSession(msg: amqp.ConsumeMessage) {
    const content = msg.content.toString();
    const inferenceResults = JSON.parse(content) as IInferenceResponseEvent;

    // TODO: Temp code without transactioning mechanism
    await this.detectorService.markSessionAsCompleted(
      inferenceResults.uid,
      inferenceResults.results,
    );

    await this.inferenceEventConsumerService.ack(msg);
  }
}
