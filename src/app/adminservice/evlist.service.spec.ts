import { TestBed } from '@angular/core/testing';

import { EvlistService } from './evlist.service';

describe('EvlistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EvlistService = TestBed.get(EvlistService);
    expect(service).toBeTruthy();
  });
});
