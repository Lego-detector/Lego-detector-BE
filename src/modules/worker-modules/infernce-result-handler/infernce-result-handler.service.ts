import { Injectable } from '@nestjs/common';
import { CreateInfernceResultHandlerDto } from './dto/create-infernce-result-handler.dto';
import { UpdateInfernceResultHandlerDto } from './dto/update-infernce-result-handler.dto';

@Injectable()
export class InfernceResultHandlerService {
  create(createInfernceResultHandlerDto: CreateInfernceResultHandlerDto) {
    return 'This action adds a new infernceResultHandler';
  }

  findAll() {
    return `This action returns all infernceResultHandler`;
  }

  findOne(id: number) {
    return `This action returns a #${id} infernceResultHandler`;
  }

  update(id: number, updateInfernceResultHandlerDto: UpdateInfernceResultHandlerDto) {
    return `This action updates a #${id} infernceResultHandler`;
  }

  remove(id: number) {
    return `This action removes a #${id} infernceResultHandler`;
  }
}
