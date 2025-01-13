import { PartialType } from '@nestjs/mapped-types';
import { CreateLegoDetectorDto } from './create-lego-detector.dto';

export class UpdateLegoDetectorDto extends PartialType(CreateLegoDetectorDto) {}
