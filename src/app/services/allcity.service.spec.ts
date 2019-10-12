import { TestBed } from '@angular/core/testing';

import { AllcityService } from './allcity.service';

describe('AllcityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AllcityService = TestBed.get(AllcityService);
    expect(service).toBeTruthy();
  });
});
