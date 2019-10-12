import { TestBed } from '@angular/core/testing';

import { EditvenueService } from './editvenue.service';

describe('EditvenueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditvenueService = TestBed.get(EditvenueService);
    expect(service).toBeTruthy();
  });
});
