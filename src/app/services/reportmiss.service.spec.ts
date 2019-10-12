import { TestBed } from '@angular/core/testing';

import { ReportmissService } from './reportmiss.service';

describe('ReportmissService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportmissService = TestBed.get(ReportmissService);
    expect(service).toBeTruthy();
  });
});
