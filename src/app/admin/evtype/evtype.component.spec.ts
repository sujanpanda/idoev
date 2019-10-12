import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvtypeComponent } from './evtype.component';

describe('EvtypeComponent', () => {
  let component: EvtypeComponent;
  let fixture: ComponentFixture<EvtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
