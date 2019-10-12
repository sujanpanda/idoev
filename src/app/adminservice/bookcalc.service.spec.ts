import { TestBed } from '@angular/core/testing';

import { BookcalcService } from './bookcalc.service';

describe('BookcalcService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookcalcService = TestBed.get(BookcalcService);
    expect(service).toBeTruthy();
  });
});
