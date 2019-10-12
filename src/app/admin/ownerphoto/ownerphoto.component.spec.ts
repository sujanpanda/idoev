import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerphotoComponent } from './ownerphoto.component';

describe('OwnerphotoComponent', () => {
  let component: OwnerphotoComponent;
  let fixture: ComponentFixture<OwnerphotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerphotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerphotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
