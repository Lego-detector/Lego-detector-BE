import { PartialType } from '@nestjs/mapped-types';
import { CreateInfernceResultHandlerDto } from './create-infernce-result-handler.dto';

export class UpdateInfernceResultHandlerDto extends PartialType(CreateInfernceResultHandlerDto) {
  id: number;
}
