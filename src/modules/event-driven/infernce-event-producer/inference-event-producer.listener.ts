import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { EVENT, IJobEvent } from '../../../shared';
import { HistoryDocument } from '../../detector/schemas';
import { MinioClientService } from '../../minio-client';

import { InferenceEventProducerService } from './inference-event-producer.service';

@Injectable()
export class InferenceEventProducerListener {
  private readonly logger = new Logger(InferenceEventProducerListener.name);
  
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
