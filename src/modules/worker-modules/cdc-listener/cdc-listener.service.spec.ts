import { Test, TestingModule } from '@nestjs/testing';
import { CdcListenerService } from './cdc-listener.service';

describe('CdcListenerService', () => {
  let service: CdcListenerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CdcListenerService],
    }).compile();

    service = module.get<CdcListenerService>(CdcListenerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
