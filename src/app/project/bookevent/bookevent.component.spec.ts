import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookeventComponent } from './bookevent.component';

describe('BookeventComponent', () => {
  let component: BookeventComponent;
  let fixture: ComponentFixture<BookeventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookeventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
