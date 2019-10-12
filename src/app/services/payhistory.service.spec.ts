import { TestBed } from '@angular/core/testing';

import { PayhistoryService } from './payhistory.service';

describe('PayhistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PayhistoryService = TestBed.get(PayhistoryService);
    expect(service).toBeTruthy();
  });
});
