import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import * as amqp from 'amqplib';

import { HistoryRepository } from 'src/modules/detector/repositories';
import { EVENT, IInferenceResponseEvent } from 'src/shared';

import { InferenceEventConsumerService } from './inference-event-consumer.service';

@Injectable()
export class InferenceEventConsumerListener {
  constructor(
    private readonly inferenceEventConsumerService: InferenceEventConsumerService,
    private readonly historyRepository: HistoryRepository,
  ) {}

  @OnEvent(EVENT.INFERENCE_SESSION.DONE, { async: true })
  async pushInferenceSession(msg: amqp.ConsumeMessage) {
    const content = msg.content.toString();
    const inferenceResults = JSON.parse(content) as IInferenceResponseEvent;

    // REMIND: Temp code without transactioning mechanism
    await this.historyRepository.findByIdAndUpdate(inferenceResults.uid, {
      status: inferenceResults.status,
      results: inferenceResults.results,
    });

    await this.inferenceEventConsumerService.ack(msg);
  }
}
