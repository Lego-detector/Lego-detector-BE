import { Injectable } from '@nestjs/common';
import { CreateLegoDetectorDto } from './dto/create-lego-detector.dto';
import { UpdateLegoDetectorDto } from './dto/update-lego-detector.dto';

@Injectable()
export class LegoDetectorService {
  create(createLegoDetectorDto: CreateLegoDetectorDto) {
    return 'This action adds a new legoDetector';
  }

  findAll() {
    return `This action returns all legoDetector`;
  }

  findOne(id: number) {
    return `This action returns a #${id} legoDetector`;
  }

  update(id: number, updateLegoDetectorDto: UpdateLegoDetectorDto) {
    return `This action updates a #${id} legoDetector`;
  }

  remove(id: number) {
    return `This action removes a #${id} legoDetector`;
  }
}
