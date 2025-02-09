import { Injectable } from '@nestjs/common';
import { CreateCdcListenerDto } from './dto/create-cdc-listener.dto';
import { UpdateCdcListenerDto } from './dto/update-cdc-listener.dto';

@Injectable()
export class CdcListenerService {
  create(createCdcListenerDto: CreateCdcListenerDto) {
    return 'This action adds a new cdcListener';
  }

  findAll() {
    return `This action returns all cdcListener`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cdcListener`;
  }

  update(id: number, updateCdcListenerDto: UpdateCdcListenerDto) {
    return `This action updates a #${id} cdcListener`;
  }

  remove(id: number) {
    return `This action removes a #${id} cdcListener`;
  }
}
