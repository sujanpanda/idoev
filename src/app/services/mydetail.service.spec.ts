import { TestBed } from '@angular/core/testing';

import { MydetailService } from './mydetail.service';

describe('MydetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MydetailService = TestBed.get(MydetailService);
    expect(service).toBeTruthy();
  });
});
