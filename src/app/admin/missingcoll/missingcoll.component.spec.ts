import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingcollComponent } from './missingcoll.component';

describe('MissingcollComponent', () => {
  let component: MissingcollComponent;
  let fixture: ComponentFixture<MissingcollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissingcollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingcollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
