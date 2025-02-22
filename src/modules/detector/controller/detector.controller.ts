import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { FileValidationPipe } from 'src/common';

import { HistoryDocument } from '../schemas';
import { DetectorService } from '../services';

@Controller('detector')
export class DetectorController {
  constructor(private readonly detectorService: DetectorService) {}

  @Post('predict')
  @UseInterceptors(FileInterceptor('image'))
  async createInferenceSession(
    @UploadedFile(new FileValidationPipe())
    image: Express.Multer.File,
  ): Promise<HistoryDocument> {
    return this.detectorService.createSession(image);
  }
}
