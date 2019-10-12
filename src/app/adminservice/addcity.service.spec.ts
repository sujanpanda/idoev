import { TestBed } from '@angular/core/testing';

import { AddcityService } from './addcity.service';

describe('AddcityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddcityService = TestBed.get(AddcityService);
    expect(service).toBeTruthy();
  });
});
