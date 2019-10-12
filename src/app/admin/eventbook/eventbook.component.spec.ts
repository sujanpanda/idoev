import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventbookComponent } from './eventbook.component';

describe('EventbookComponent', () => {
  let component: EventbookComponent;
  let fixture: ComponentFixture<EventbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
