import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookcalcComponent } from './bookcalc.component';

describe('BookcalcComponent', () => {
  let component: BookcalcComponent;
  let fixture: ComponentFixture<BookcalcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookcalcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookcalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
