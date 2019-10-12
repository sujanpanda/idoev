import { TestBed } from '@angular/core/testing';

import { EvtypeService } from './evtype.service';

describe('EvtypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EvtypeService = TestBed.get(EvtypeService);
    expect(service).toBeTruthy();
  });
});
