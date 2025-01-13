import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LegoDetectorService } from './lego-detector.service';
import { CreateLegoDetectorDto } from './dto/create-lego-detector.dto';
import { UpdateLegoDetectorDto } from './dto/update-lego-detector.dto';

@Controller('lego-detector')
export class LegoDetectorController {
  constructor(private readonly legoDetectorService: LegoDetectorService) {}

  @Get()
  async inference(): Promise<boolean> {
    return false;
  }
}
