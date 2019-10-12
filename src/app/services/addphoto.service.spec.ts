import { TestBed } from '@angular/core/testing';

import { AddphotoService } from './addphoto.service';

describe('AddphotoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddphotoService = TestBed.get(AddphotoService);
    expect(service).toBeTruthy();
  });
});
