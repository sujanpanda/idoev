import { TestBed } from '@angular/core/testing';

import { GetformdetailsService } from './getformdetails.service';

describe('GetformdetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetformdetailsService = TestBed.get(GetformdetailsService);
    expect(service).toBeTruthy();
  });
});
