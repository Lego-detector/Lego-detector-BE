import { Controller, Post } from '@nestjs/common';

import { HistoryDocument } from '../schemas';
import { DetectorService } from '../services';

@Controller('detector')
export class DetectorController {
  constructor(private readonly detectorService: DetectorService) {}

  @Post('predict')
  async createInferenceSession(): Promise<HistoryDocument> {
    return this.detectorService.createSession();
  }
}
