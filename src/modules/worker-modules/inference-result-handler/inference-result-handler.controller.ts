import { Controller } from '@nestjs/common';

import { InferenceResultHandlerService } from './inference-result-handler.service';

@Controller()
export class InferenceResultHandlerController {
  constructor(private readonly inferenceResultHandlerService: InferenceResultHandlerService) {}
}
