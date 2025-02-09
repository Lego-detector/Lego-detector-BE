import { Test, TestingModule } from '@nestjs/testing';
import { InfernceResultHandlerService } from './infernce-result-handler.service';

describe('InfernceResultHandlerService', () => {
  let service: InfernceResultHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InfernceResultHandlerService],
    }).compile();

    service = module.get<InfernceResultHandlerService>(InfernceResultHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
