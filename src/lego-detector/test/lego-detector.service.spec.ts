import { Test, TestingModule } from '@nestjs/testing';
import { LegoDetectorService } from '../lego-detector.service';

describe('LegoDetectorService', () => {
  let service: LegoDetectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LegoDetectorService],
    }).compile();

    service = module.get<LegoDetectorService>(LegoDetectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
