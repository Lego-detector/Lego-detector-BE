import { Test, TestingModule } from '@nestjs/testing';
import { LegoDetectorController } from '../lego-detector.controller';
import { LegoDetectorService } from '../lego-detector.service';

describe('LegoDetectorController', () => {
  let controller: LegoDetectorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LegoDetectorController],
      providers: [LegoDetectorService],
    }).compile();

    controller = module.get<LegoDetectorController>(LegoDetectorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
