import { Test, TestingModule } from '@nestjs/testing';
import { HashingPasswordService } from './hashing-password.service';

describe('HashingPasswordService', () => {
  let service: HashingPasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HashingPasswordService],
    }).compile();

    service = module.get<HashingPasswordService>(HashingPasswordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
