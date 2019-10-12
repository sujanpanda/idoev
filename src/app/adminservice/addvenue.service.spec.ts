import { TestBed } from '@angular/core/testing';

import { AddvenueService } from './addvenue.service';

describe('AddvenueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddvenueService = TestBed.get(AddvenueService);
    expect(service).toBeTruthy();
  });
});
