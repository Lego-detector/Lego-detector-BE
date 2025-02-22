import { Controller, Post } from '@nestjs/common';

import { DetectorService } from '../services';


@Controller('detector')
export class DetectorController {
  constructor(
    private readonly detectorService: DetectorService
  ) {}

  @Post('predict')
  async createInferenceSession() {
    return this.detectorService.createSession();
  }
}
