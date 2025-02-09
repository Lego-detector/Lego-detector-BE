import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { UpdateInfernceResultHandlerDto } from './dto/update-infernce-result-handler.dto';
import { InfernceResultHandlerService } from './infernce-result-handler.service';


@Controller()
export class InfernceResultHandlerController {
  constructor(private readonly infernceResultHandlerService: InfernceResultHandlerService) {}

  @MessagePattern('updateInfernceResultHandler')
  update(@Payload() updateInfernceResultHandlerDto: UpdateInfernceResultHandlerDto) {
    return this.infernceResultHandlerService.update(updateInfernceResultHandlerDto.id, updateInfernceResultHandlerDto);
  }
}
