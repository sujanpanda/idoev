import { TestBed } from '@angular/core/testing';

import { VenuedetailService } from './venuedetail.service';

describe('VenuedetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VenuedetailService = TestBed.get(VenuedetailService);
    expect(service).toBeTruthy();
  });
});
