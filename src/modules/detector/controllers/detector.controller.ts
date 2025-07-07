import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { Types } from 'mongoose';

import { FileValidationPipe, JwtAccessGuard, TransformFileInterceptor } from '../../../common';
import { CurrentUser } from '../../../common/decorators';
import { ISessionResultsReponse } from '../../../shared';
import { UserEntity } from '../../user/domain/entities';
import { GetCompletedSessionDto } from '../dto';
import { ClassNameDocument, HistoryDocument } from '../schemas';
import { DetectorService } from '../services';


@Controller('detector')
export class DetectorController {
  constructor(private readonly detectorService: DetectorService) {}

  @UseInterceptors(TransformFileInterceptor)
  @UseGuards(JwtAccessGuard)
  @Get('results')
  async getCompletedSession(
    @Query() getCompletedSessionDto: GetCompletedSessionDto,
    @CurrentUser('_id') userId: Types.ObjectId,
  ): Promise<ISessionResultsReponse> {
    return this.detectorService.getCompletedSession(
      getCompletedSessionDto.sessionId,
      userId.toString(),
    );
  }

  @Get('class-names')
  async getClassName(): Promise<ClassNameDocument[]> {
    return this.detectorService.getClassName();
  }

  @UseInterceptors(TransformFileInterceptor)
  @UseGuards(JwtAccessGuard)
  @Post('predict')
  @UseInterceptors(FileInterceptor('image'))
  async createSession(
    @UploadedFile(new FileValidationPipe())
    image: Express.Multer.File,
    @CurrentUser() user: UserEntity,
  ): Promise<HistoryDocument> {
    return this.detectorService.createSession(user._id.toString(), user.role, image);
  }
}
