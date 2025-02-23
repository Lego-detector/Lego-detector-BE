import { Controller, Get, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { Types } from 'mongoose';

import { FileValidationPipe, JwtAccessGuard } from 'src/common';
import { CurrentUser } from 'src/common/decorators';

import { GetCompletedSessionDto } from '../dto';
import { HistoryDocument } from '../schemas';
import { DetectorService } from '../services';


@UseGuards(JwtAccessGuard)
@Controller('detector')
export class DetectorController {
  constructor(private readonly detectorService: DetectorService) {}
  
  @Get('results')
  async getCompletedSession(
    @Query() getCompletedSessionDto: GetCompletedSessionDto,
    @CurrentUser('_id') userId: Types.ObjectId,
  ): Promise<HistoryDocument> {
    return this.detectorService.getCompletedSession(
      getCompletedSessionDto.sessionId,
      userId.toString()
    );
  }

  @Post('predict')
  @UseInterceptors(FileInterceptor('image'))
  async createSession(
    @UploadedFile(new FileValidationPipe())
    image: Express.Multer.File,
    @CurrentUser('_id') userId: Types.ObjectId,
  ): Promise<HistoryDocument> {
    return this.detectorService.createSession(
      userId.toString(), 
      image
    );
  }
}
