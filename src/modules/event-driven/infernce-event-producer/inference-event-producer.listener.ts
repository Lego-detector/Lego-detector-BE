import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { HistoryDocument } from 'src/modules/detector/schemas';
import { MinioClientService } from 'src/modules/minio-client';
import { EVENT, IJobEvent } from 'src/shared';

import { InferenceEventProducerService } from './inference-event-producer.service';

@Injectable()
export class InferenceEventProducerListener {
  constructor(
    private readonly inferenceEventProducerService: InferenceEventProducerService,
    private readonly minioClientService: MinioClientService,
  ) {}

  @OnEvent(EVENT.HISTORY.CREATE, { async: true })
  async pushInferenceSession(history: HistoryDocument) {
    const image = await this.minioClientService.getFileAsBuffer(history.imageUrl);
    const jobEvent: IJobEvent = {
      uid: history._id,
      image: image.toString('latin1'),
    };

    await this.inferenceEventProducerService.produce(jobEvent);
  }
}
