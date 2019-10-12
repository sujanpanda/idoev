import { TestBed } from '@angular/core/testing';

import { DetectmobileService } from './detectmobile.service';

describe('DetectmobileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetectmobileService = TestBed.get(DetectmobileService);
    expect(service).toBeTruthy();
  });
});
