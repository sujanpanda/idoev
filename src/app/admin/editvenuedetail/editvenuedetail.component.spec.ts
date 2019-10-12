import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditvenuedetailComponent } from './editvenuedetail.component';

describe('EditvenuedetailComponent', () => {
  let component: EditvenuedetailComponent;
  let fixture: ComponentFixture<EditvenuedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditvenuedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditvenuedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
